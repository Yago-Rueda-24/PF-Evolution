import { createClient } from '@supabase/supabase-js'

export class UserRepository {
    private supabase: any

    constructor() {
        this.supabase = createClient("https://kwgeyggoqmlqdprnjceo.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt3Z2V5Z2dvcW1scWRwcm5qY2VvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQxMzkyNTIsImV4cCI6MjA3OTcxNTI1Mn0.XC9KSKzIe3DO7X_x3YrzqgsEscfjq_R2TqGvK2NtACI")
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
}

