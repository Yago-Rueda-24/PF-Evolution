import { supabase } from "../infrastructure/supabase"

export class UserRepository {
    private supabase: any

    constructor() {
        this.supabase = supabase
    }

    async register(email: string, password: string, key: string) {

        const { data, error } = await this.supabase
            .from('users')
            .insert([
                { email: email, password: password, aes_key: key },
            ])
            .select()

        if (error) {
            throw new Error(error.message)
        }

        return data
    }

    async find_user(email: string) {
        let { data: users, error } = await this.supabase
            .from('users')
            .select("*")
            .eq('email', email)

        if (error) {
            throw new Error(error.message)
        }

        console.log(users)
        return users && users.length > 0 ? users[0] : null
    }
}

