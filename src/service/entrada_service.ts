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


}