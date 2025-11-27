import React from 'react'
import '../assets/vault.css'

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
                            <li>Dashboard</li>
                            <li>Settings</li>
                        </ul>
                    </nav>
                </aside>
                <main className="vault-content">
                    <h2>Welcome to your Vault</h2>
                    <p>Select an item from the sidebar to get started.</p>
                </main>
            </div>
        </div>
    )
}

export default Vault
