import { supabase } from "../infrastructure/supabase"

export class ProfileRepository {
    private supabase

    constructor() {
        this.supabase = supabase
    }

    async createProfile(uuid: string) {

        const { data, error } = await this.supabase
            .from('profiles')
            .insert([
                { id: uuid },
            ])
            .select()

        if (error) {
            throw new Error(error.message)
        }

        return data
    }
}

