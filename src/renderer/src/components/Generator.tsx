import React from 'react'
import VaultHeader from './VaultHeader'
import VaultSidebar from './VaultSidebar'
import '../assets/vault.css'

const Generator = (): React.JSX.Element => {
    return (
        <div className="vault-container">
            <VaultHeader />
            <div className="vault-main">
                <VaultSidebar />
                <main className="vault-content">
                    <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', border: '1px dashed #ccc', justifyContent: 'center', alignItems: 'center' }}>
                        <p>Form Container</p>
                    </div>
                </main>
            </div>
        </div>
    )
}

export default Generator
