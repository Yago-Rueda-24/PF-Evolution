import React from 'react'

interface VaultItemProps {
    name: string
    username: string
    password?: string
}

const VaultItem = ({ name, username }: VaultItemProps): React.JSX.Element => {
    return (
        <div className="vault-item">
            <div className="vault-item-field name">{name}</div>
            <div className="vault-item-field username">
                <span>{username}</span>
                <button className="copy-btn">Copy</button>
            </div>
            <div className="vault-item-field password">
                <span>{'•'.repeat(8)}</span>
                <button className="copy-btn">Copy</button>
            </div>
        </div>
    )
}

export default VaultItem
