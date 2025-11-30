import crypto from 'crypto';

export class CryptoService {

    generateKey(): string {
        return crypto.randomBytes(32).toString('hex')
    }

    encrypt(text: string, key: string) {
        const iv = crypto.randomBytes(16)
        const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
        let encrypted = cipher.update(text)
        encrypted = Buffer.concat([encrypted, cipher.final()])
        return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') }
    }

    decrypt(encryptedData: { iv: string, encryptedData: string }, key: string) {
        const iv = Buffer.from(encryptedData.iv, 'hex')
        const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
        let decrypted = decipher.update(encryptedData.encryptedData, 'hex', 'utf-8')
        decrypted += decipher.final('utf-8')
        return decrypted
    }
}