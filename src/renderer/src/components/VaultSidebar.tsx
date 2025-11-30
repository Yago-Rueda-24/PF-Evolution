import React from 'react'

const VaultSidebar = (): React.JSX.Element => {
    return (
        <aside className="vault-aside">
            <nav>
                <ul>
                    <li style={{ color: 'blue' }}>Dashboard</li>
                    <li style={{ color: 'blue' }}>Settings</li>
                </ul>
            </nav>
        </aside>
    )
}

export default VaultSidebar
