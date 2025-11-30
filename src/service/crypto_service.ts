import crypto from 'crypto';

export class CryptoService {

    generateKey(): string {
        return crypto.randomBytes(32).toString('hex')
    }

    generateIV(): string {
        return crypto.randomBytes(16).toString('hex')
    }

    encrypt(text: string, key: string, iv: string) {
        let buufiv = Buffer.from(iv, 'hex')
        let bufKey = Buffer.from(key, 'hex')
        const cipher = crypto.createCipheriv('aes-256-cbc', bufKey, buufiv)
        let encrypted = cipher.update(text)
        encrypted = Buffer.concat([encrypted, cipher.final()])
        return encrypted.toString('hex')
    }

    decrypt(iv: string, encryptedData: string, key: string) {
        let buufiv = Buffer.from(iv, 'hex')
        let bufKey = Buffer.from(key, 'hex')
        const decipher = crypto.createDecipheriv('aes-256-cbc', bufKey, buufiv)
        let decrypted = decipher.update(encryptedData, 'hex', 'utf-8')
        decrypted += decipher.final('utf-8')
        return decrypted
    }
}