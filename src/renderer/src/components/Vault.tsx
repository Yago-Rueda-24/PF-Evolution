import React from 'react'
import '../assets/vault.css'
import VaultEntryForm from './VaultEntryForm'
import VaultItem from './VaultItem'

const Vault = (): React.JSX.Element => {
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
                        <VaultItem name="Netflix" username="user@example.com" password="password123" />
                        <VaultItem name="Spotify" username="music_lover" password="securepass" />
                        <VaultItem name="Google" username="yago@gmail.com" password="mysecretpassword" />
                    </div>

                </main>
            </div>
        </div>
    )
}

export default Vault
