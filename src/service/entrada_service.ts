import { EntradaRepository } from "../repository/entrada_repo";
import { UserRepository } from "../repository/user_repo";

export class EntradaService {
    private entradaRepository: EntradaRepository
    private userRepository: UserRepository

    constructor() {
        this.entradaRepository = new EntradaRepository()
        this.userRepository = new UserRepository()
    }

    async get_all(userid: string) {
        try {
            let user = await this.userRepository.find_user_by_id(userid)
            if (!user) {
                throw new Error('User not found')
            }
            let key = user.aes_key

            let data = await this.entradaRepository.get_all(userid)

            if (data) {
                data = data.map((entry: any) => {
                    // @ts-ignore
                    entry.usuario = window.cryptoApi.decrypt(entry.IV, entry.usuario, key)
                    // @ts-ignore
                    entry.password = window.cryptoApi.decrypt(entry.IV, entry.password, key)
                    return entry
                })
            }

            return data
        } catch (error) {
            console.log(error)
        }
    }

    async create(userid: string, nombre: string, usuario: string, password: string) {
        try {
            if (!userid || !nombre || !usuario || !password) {
                throw new Error('All fields are required')
            }

            let user = await this.userRepository.find_user_by_id(userid)
            if (!user) {
                throw new Error('User not found')
            }

            let key: string = user.aes_key
            // @ts-ignore
            let iv = window.cryptoApi.generateIV()
            // @ts-ignore
            let encryptedPassword = window.cryptoApi.encrypt(password, key, iv)
            // @ts-ignore
            let encryptedUser = window.cryptoApi.encrypt(usuario, key, iv)

            let data = await this.entradaRepository.create(userid, nombre, encryptedUser, encryptedPassword, iv)
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
    async delete(id: string) {
        try {
            await this.entradaRepository.delete(id)
        } catch (error) {
            console.log(error)
            throw error
        }
    }

    async update(id: string, name: string, username: string, password: string, userid: string) {
        try {
            if (!id || !name || !username || !password) {
                throw new Error('All fields are required')
            }

            let user = await this.userRepository.find_user_by_id(userid)
            if (!user) {
                throw new Error('User not found')
            }

            let key = user.aes_key
            // @ts-ignore
            let iv = window.cryptoApi.generateIV()
            // @ts-ignore
            let encryptedPassword = window.cryptoApi.encrypt(password, key, iv)
            // @ts-ignore
            let encryptedUser = window.cryptoApi.encrypt(username, key, iv)

            let data = await this.entradaRepository.update(id, name, encryptedUser, encryptedPassword, iv)
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}