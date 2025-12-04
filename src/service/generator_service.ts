

export class GeneratorService {

    constructor() { }

    static generatePassword(length: number, options: { uppercase: boolean, lowercase: boolean, numbers: boolean, symbols: boolean }): string {
        const charset = {
            uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
            lowercase: 'abcdefghijklmnopqrstuvwxyz',
            numbers: '0123456789',
            symbols: '!@#$%^&*()[]{}<>?'
        }

        if (!options.uppercase && !options.lowercase && !options.numbers && !options.symbols) {
            throw new Error('At least one option must be selected')
        }
        let password = ''
        for (let i = 0; i < length; i++) {
            let random = Math.floor(Math.random() * 4)
            if (random === 0 && options.uppercase) {
                password += charset.uppercase.charAt(Math.floor(Math.random() * charset.uppercase.length))
            } else if (random === 1 && options.lowercase) {
                password += charset.lowercase.charAt(Math.floor(Math.random() * charset.lowercase.length))
            } else if (random === 2 && options.numbers) {
                password += charset.numbers.charAt(Math.floor(Math.random() * charset.numbers.length))
            } else if (random === 3 && options.symbols) {
                password += charset.symbols.charAt(Math.floor(Math.random() * charset.symbols.length))
            }
        }
        return password
    }

}