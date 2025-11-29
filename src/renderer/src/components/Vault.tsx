import React from 'react'
import '../assets/vault.css'
import VaultItem from './VaultItem'
import { useState, useEffect } from 'react'
import { EntradaService } from '../../../service/entrada_service'
import InfoDialog from './InfoDialog'

const Vault = (): React.JSX.Element => {
    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')

    const [entries, setEntries] = useState([])

    const entradaService = new EntradaService()


    const get_entries = () => {
        entradaService.get_all(sessionStorage.getItem('id')!).then((data) => {
            setEntries(data)
        })
    }

    const handleCreate = () => {
        console.log(sessionStorage.getItem('id'))
        entradaService.create(sessionStorage.getItem('id')!, name, username, password).then((data) => {
            console.log(data)
            get_entries()
        }).catch((error) => {
            console.log(error)
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

    useEffect(() => {
        get_entries()
    }, [])

    return (
        <div className="vault-container">
            <header className="vault-header">
                <h1>My Vault</h1>
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
                        <h3>Add New Entry</h3>
                        <div className="vault-inputs-row">
                            <div className="form-group">
                                <label htmlFor="name">Name</label>
                                <input type="text" id="name" placeholder="Entry Name" onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="username">User</label>
                                <input type="text" id="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <input type="password" id="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                            </div>
                        </div>
                        <button className="add-btn" onClick={handleCreate}>Add Entry</button>
                    </div>
                    <div className="vault-list">
                        {entries.map((entry: any) => (
                            <VaultItem key={entry.id} name={entry.nombre} username={entry.usuario} password={entry.password} />
                        ))}
                    </div>

                </main>
            </div>
            <InfoDialog open={open} onClose={handleClose} title={title} message={errorMessage} />
        </div>
    )
}

export default Vault
