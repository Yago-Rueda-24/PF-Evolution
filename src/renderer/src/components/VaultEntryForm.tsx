import React from 'react'

const VaultEntryForm = (): React.JSX.Element => {

    const handleCreate = () => {
        console.log(sessionStorage.getItem('id'))
    }

    return (
        <div className="vault-entry-form">
            <h3>Add New Entry</h3>
            <div className="vault-inputs-row">
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder="Entry Name" />
                </div>
                <div className="form-group">
                    <label htmlFor="username">User</label>
                    <input type="text" id="username" placeholder="Username" />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder="Password" />
                </div>
            </div>
            <button className="add-btn" onClick={handleCreate}>Add Entry</button>
        </div>
    )
}

export default VaultEntryForm
