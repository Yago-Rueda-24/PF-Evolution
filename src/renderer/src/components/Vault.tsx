import React from 'react'
import '../assets/vault.css'
import VaultEntryForm from './VaultEntryForm'
import VaultItem from './VaultItem'
import { useState, useEffect } from 'react'
import { EntradaService } from '../../../service/entrada_service'

const Vault = (): React.JSX.Element => {
    const [entries, setEntries] = useState([])
    const entradaService = new EntradaService()

    useEffect(() => {
        const userid = sessionStorage.getItem('id')
        if (!userid) {
            return
        }
        console.log(userid)
        entradaService.get_all(userid).then((data) => {
            setEntries(data)
        })
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
                    <h2>Welcome to your Vault</h2>
                    <p>Select an item from the sidebar to get started.</p>
                    <VaultEntryForm />
                    <div className="vault-list">
                        {entries.map((entry: any) => (
                            <VaultItem key={entry.id} name={entry.nombre} username={entry.usuario} password={entry.password} />
                        ))}
                    </div>

                </main>
            </div>
        </div>
    )
}

export default Vault
