import { UserRepository } from "../repository/user_repo";
import { ProfileRepository } from "../repository/profile_repo";

export class UserService {
    private userRepository: UserRepository
    private profileRepository: ProfileRepository

    constructor() {
        this.userRepository = new UserRepository()
        this.profileRepository = new ProfileRepository()
    }

    async register(email: string, password: string): Promise<void> {
        console.log('Register attempt:', { email, password })
        try {
            const data = await this.userRepository.register(email, password)
            await this.profileRepository.createProfile(data.user?.id)
        } catch (error) {
            console.error('Register failed:', error)
            throw error
        }
    }

    login(email: string, password: string): void {
    }
}
