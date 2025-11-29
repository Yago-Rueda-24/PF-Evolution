import React from 'react'

interface VaultItemProps {
    id: string
    name: string
    username: string
    password?: string
    onEdit: (id: string, name: string, username: string, password: string) => void
    onDelete: (id: string) => void
}

const VaultItem = ({ id, name, username, password, onEdit, onDelete }: VaultItemProps): React.JSX.Element => {

    const [showPassword, setShowPassword] = React.useState(false)

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
    }

    const handleShowPassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <div className="vault-item">
            <div className="vault-item-field name">{name}</div>
            <div className="vault-item-field username">
                <span>{username}</span>
                <button className="copy-btn" onClick={() => copyToClipboard(username)}>Copy</button>
            </div>
            <div className="vault-item-field password">
                <span>{showPassword ? password : '•'.repeat(password!.length)}</span>
                <button className="copy-btn" onClick={() => copyToClipboard(password!)}>Copy</button>
                <button className="copy-btn" onClick={handleShowPassword}>{showPassword ? 'Hide' : 'Show'}</button>
            </div>
            <div className="vault-item-actions">
                <button className="edit-btn" onClick={() => onEdit(id, name, username, password!)}>Edit</button>
                <button className="delete-btn" onClick={() => onDelete(id)}>Delete</button>
            </div>
        </div>
    )
}

export default VaultItem
