/*import { Service } from "./Service";
import crypto from 'crypto';

interface User {
    id: number,
    email: string,
    password: crypto.Hash
}

export class UserService implements Service {
    users: User[];

    gravatarUrl = 'https://s.gravatar.com/avatar'
    
    query = 's=60';
    path = "/users"

    async create(data: Record<string, any>) {
        const user: User = {
            id: data.id,
            email: data.email,
            password: crypto.createHash('md5').update(data.password)
        }

        this.users.push(user)
        return user
    }

    async find() {

    }
    
    getGravatar(email: string) {
        const hash = crypto.createHash('md5').update(email.toLocaleLowerCase()).digest('hex')
        return `${this.gravatarUrl}/${hash}?${this.query}`
    }
}*/