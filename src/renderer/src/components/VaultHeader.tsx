import React from 'react'
import { useNavigate } from 'react-router-dom'

const VaultHeader = (): React.JSX.Element => {
    const navigate = useNavigate()

    const logout = () => {
        sessionStorage.clear()
        navigate('/')
    }

    const exit = () => {
        sessionStorage.clear()
        // @ts-ignore
        window.electronAPI.exit()
    }

    return (
        <header className="vault-header">
            <h1>My Vault</h1>
            <button onClick={logout}>Logout</button>
            <button onClick={exit}>Exit</button>
        </header>
    )
}

export default VaultHeader
