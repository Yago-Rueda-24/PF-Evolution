import { EntradaRepository } from "../repository/entrada_repo";

export class EntradaService {
    private entradaRepository: EntradaRepository

    constructor() {
        this.entradaRepository = new EntradaRepository()
    }

    async get_all(userid: string) {
        try {
            let data = await this.entradaRepository.get_all(userid)
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
            let data = await this.entradaRepository.create(userid, nombre, usuario, password)
            return data
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}