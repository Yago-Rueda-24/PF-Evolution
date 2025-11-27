import { supabase } from "../infrastructure/supabase"

export class UserRepository {
    private supabase: any

    constructor() {
        this.supabase = supabase
    }

    async register(email: string, password: string) {
        const { data, error } = await this.supabase.auth.signUp({
            email,
            password,
        })

        if (error) {
            throw new Error(error.message)
        }

        return data
    }

    async login(email: string, password: string) {
        const { data, error } = await this.supabase.auth.signInWithPassword({
            email,
            password,
        })

        if (error) {
            throw new Error(error.message)
        }

        return data
    }
}

