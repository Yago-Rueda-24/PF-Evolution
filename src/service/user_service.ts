export class UserService {


    register(email: string, password: string): void {
        console.log('Register attempt:', { email, password })
    }

    login(email: string, password: string): void {
    }
}
