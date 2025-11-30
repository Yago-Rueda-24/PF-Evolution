import React from 'react'
import '../assets/vault.css'
import VaultItem from './VaultItem'
import { useState, useEffect } from 'react'
import { EntradaService } from '../../../service/entrada_service'
import InfoDialog from './InfoDialog'
import { useNavigate } from 'react-router-dom'

const Vault = (): React.JSX.Element => {
    const navigate = useNavigate()
    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [editingId, setEditingId] = useState<string | null>(null)
    const [showPassword, setShowPassword] = useState(false)

    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [entries, setEntries] = useState([])

    const entradaService = new EntradaService()


    const get_entries = () => {
        entradaService.get_all(sessionStorage.getItem('id')!).then((data) => {
            setEntries(data || [])
        })
    }

    const handleCreate = () => {
        if (editingId) {
            entradaService.update(editingId, name, username, password, sessionStorage.getItem('id')!).then(() => {
                get_entries()
                setEditingId(null)
                setName('')
                setUsername('')
                setPassword('')
            }).catch((error) => {
                console.log(error)
                handleOpen('Error', error.message)
            })
        } else {
            entradaService.create(sessionStorage.getItem('id')!, name, username, password).then((data) => {
                console.log(data)
                get_entries()
                setName('')
                setUsername('')
                setPassword('')
            }).catch((error) => {
                console.log(error)
                handleOpen('Error', error.message)
            })
        }
    }

    const handleEdit = (id: string, name: string, username: string, password: string) => {
        setEditingId(id)
        setName(name)
        setUsername(username)
        setPassword(password)
    }

    const handleDelete = (id: string) => {
        entradaService.delete(id).then(() => {
            get_entries()
        }).catch((error) => {
            handleOpen('Error', error.message)
        })
    }

    const handleClose = () => {
        setOpen(false)
    }

    const handleOpen = (title: string, message: string) => {
        setTitle(title)
        setErrorMessage(message)
        setOpen(true)
    }

    const logout = () => {
        sessionStorage.clear()
        navigate('/')
    }

    const exit = () => {
        sessionStorage.clear()
        // @ts-ignore
        window.electronAPI.exit()

    }
    useEffect(() => {
        get_entries()
    }, [])

    return (
        <div className="vault-container">
            <header className="vault-header">
                <h1>My Vault</h1>
                <button onClick={logout}>Logout</button>
                <button onClick={exit}>Exit</button>
            </header>
            <div className="vault-main">
                <aside className="vault-aside">
                    <nav>
                        <ul>
                            <li style={{ color: 'blue' }}>Dashboard</li>
                            <li style={{ color: 'blue' }}>Settings</li>
                        </ul>
                    </nav>
                </aside>
                <main className="vault-content">
                    <div className="vault-entry-form">
                        <h3>{editingId ? 'Edit Entry' : 'Add New Entry'}</h3>
                        <div className="vault-inputs-row">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" placeholder="Entry Name" value={name} onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">User</label>
                                <input type="text" id="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div style={{ display: 'flex', gap: '5px' }}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        style={{ flex: 1 }}
                                    />
                                    <button
                                        onClick={() => setShowPassword(!showPassword)}
                                        style={{ padding: '0 10px', cursor: 'pointer' }}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button className="add-btn" onClick={handleCreate}>{editingId ? 'Update Entry' : 'Add Entry'}</button>
                        {editingId && <button className="cancel-btn" onClick={() => {
                            setEditingId(null)
                            setName('')
                            setUsername('')
                            setPassword('')
                        }}>Cancel</button>}
                    </div>
                    <div className="vault-list">
                        {entries.length > 0 ? entries.map((entry: any) => (
                            <VaultItem
                                key={entry.id}
                                id={entry.id}
                                name={entry.nombre}
                                username={entry.usuario}
                                password={entry.password}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        )) : <p>No entries found</p>}
                    </div>

                </main>
            </div>
            <InfoDialog open={open} onClose={handleClose} title={title} message={errorMessage} />
        </div>
    )
}

export default Vault
