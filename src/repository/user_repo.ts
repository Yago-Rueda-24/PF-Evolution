import { createClient } from '@supabase/supabase-js'

export class UserRepository {
    private supabase: any

    constructor() {
        this.supabase = createClient("https://kwgeyggoqmlqdprnjceo.supabase.co", "token")
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

