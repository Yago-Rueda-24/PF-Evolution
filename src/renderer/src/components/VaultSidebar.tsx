import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const VaultSidebar = (): React.JSX.Element => {
    const location = useLocation()

    const isActive = (path: string) => {
        return location.pathname === path ? { color: 'red', fontWeight: 'bold' } : { color: 'blue' }
    }

    return (
        <aside className="vault-aside">
            <nav>
                <ul>
                    <li>
                        <Link to="/vault" style={isActive('/vault')}>Vault</Link>
                    </li>
                    <li>
                        <Link to="/generator" style={isActive('/generator')}>Generator</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default VaultSidebar
