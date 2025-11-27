import { UserRepository } from "../repository/user_repo";

export class UserService {
    private userRepository: UserRepository

    constructor() {
        this.userRepository = new UserRepository()
    }

    async register(email: string, password: string, confirmPassword: string): Promise<void> {
        console.log('Register attempt:', { email, password })
        try {
            if (email === "" || password === "" || confirmPassword === "") {
                throw new Error('Email and password are required')
            }
            if (password !== confirmPassword) {
                throw new Error('Passwords do not match')
            }
            await this.userRepository.register(email, password)
        } catch (error) {
            console.error('Register failed:', error)
            throw error
        }
    }

    async login(email: string, password: string): Promise<void> {
        try {
            const user = await this.userRepository.find_user(email)
            console.log(user)
            if (!user) {
                throw new Error('User not found')
            }
            if (user.password == password) {
                console.log('Login successful:', { email })
            } else {
                throw new Error('Invalid password')
            }
        } catch (error) {
            console.error('Login failed:', error)
            throw error
        }
    }
}
