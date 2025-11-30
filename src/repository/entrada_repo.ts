import { supabase } from "../infrastructure/supabase"

export class EntradaRepository {
    private supabase: any

    constructor() {
        this.supabase = supabase
    }


    async get_all(userid: string) {
        let { data: entries, error } = await this.supabase
            .from('entradas')
            .select("*")
            .eq('user_id', userid)

        if (error) {
            throw new Error(error.message)
        }

        console.log(entries)
        return entries && entries.length > 0 ? entries : null
    }


    async create(userid: string, name: string, username: string, password: string, iv: string) {
        let { data: entry, error } = await this.supabase
            .from('entradas')
            .insert({
                nombre: name,
                usuario: username,
                password: password,
                IV: iv,
                user_id: userid
            })

        if (error) {
            throw new Error(error.message)
        }

        console.log(entry)
        return entry
    }




    async delete(id: string) {
        const { error } = await this.supabase
            .from('entradas')
            .delete()
            .eq('id', id)

        if (error) {
            throw new Error(error.message)
        }
    }

    async update(id: string, name: string, username: string, password: string, iv: string) {
        const { data, error } = await this.supabase
            .from('entradas')
            .update({ nombre: name, usuario: username, password: password, IV: iv })
            .eq('id', id)
            .select()

        if (error) {
            throw new Error(error.message)
        }
        return data
    }
}

