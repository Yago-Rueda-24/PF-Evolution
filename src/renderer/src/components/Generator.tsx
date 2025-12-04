import React, { useState } from 'react'
import VaultHeader from './VaultHeader'
import VaultSidebar from './VaultSidebar'
import '../assets/vault.css'
import { GeneratorService } from '../../../service/generator_service'
import InfoDialog from './InfoDialog'
const Generator = (): React.JSX.Element => {
    const [length, setLength] = useState<number>(12)
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: true
    })
    const [generatedPassword, setGeneratedPassword] = useState('')
    const [open, setOpen] = useState(false)
    const [title, setTitle] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const handleClose = () => {
        setOpen(false)
    }
    const handleOptionChange = (option: keyof typeof options) => {
        setOptions(prev => ({ ...prev, [option]: !prev[option] }))
    }

    const generatePassword = () => {
        try {
            const password = GeneratorService.generatePassword(length, options)
            setGeneratedPassword(password)
        } catch (error: any) {
            const message = error?.message || (typeof error === 'string' ? error : JSON.stringify(error))
            setOpen(true)
            setTitle('Error')
            setErrorMessage(message)
        }

    }



    return (
        <div className="vault-container">
            <VaultHeader />
            <div className="vault-main">
                <VaultSidebar />
                <main className="vault-content">
                    <div className="vault-generator-container">
                        <div className="vault-entry-form" style={{ maxWidth: '500px' }}>
                            <h3>Generador de Contraseñas</h3>

                            <div className="form-group">
                                <label>Longitud (10-25)</label>
                                <input
                                    type="number"
                                    min="10"
                                    max="25"
                                    value={length}
                                    onChange={(e) => setLength(Math.max(10, Math.min(25, Number(e.target.value))))}
                                />
                            </div>

                            <div className="form-group">
                                <label>Opciones</label>
                                <div className="checkbox-group">
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={options.uppercase}
                                            onChange={() => handleOptionChange('uppercase')}
                                        /> Mayúsculas
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={options.lowercase}
                                            onChange={() => handleOptionChange('lowercase')}
                                        /> Minúsculas
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={options.numbers}
                                            onChange={() => handleOptionChange('numbers')}
                                        /> Números
                                    </label>
                                    <label>
                                        <input
                                            type="checkbox"
                                            checked={options.symbols}
                                            onChange={() => handleOptionChange('symbols')}
                                        /> Símbolos
                                    </label>
                                </div>
                            </div>

                            <button className="add-btn" onClick={generatePassword}>Generar</button>

                            <div className="form-group">
                                <input
                                    type="text"
                                    value={generatedPassword}
                                    readOnly
                                    placeholder="Contraseña generada"
                                />
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <InfoDialog open={open} onClose={handleClose} title={title} message={errorMessage} />
        </div>
    )
}

export default Generator
