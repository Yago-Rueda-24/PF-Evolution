import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const VaultSidebar = (): React.JSX.Element => {
    const location = useLocation()



    return (
        <aside className="vault-aside">
            <nav>
                <ul>
                    <li>
                        <Link to="/vault" className={location.pathname === '/vault' ? 'sidebar-link active' : 'sidebar-link'}>Vault</Link>
                    </li>
                    <li>
                        <Link to="/generator" className={location.pathname === '/generator' ? 'sidebar-link active' : 'sidebar-link'}>Generator</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    )
}

export default VaultSidebar
