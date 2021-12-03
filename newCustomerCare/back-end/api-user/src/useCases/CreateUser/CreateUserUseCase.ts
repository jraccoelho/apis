import { User } from '../../entities/User';
import { IUsersRepository } from '../../repositories/IUsersRepository';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { IMailProvider } from '../../providers/IMailProvider';

export class CreateUserUseCase {
    constructor(
        private usersRepository: IUsersRepository,
        private mailProvider: IMailProvider
    ) {}

    async execute(data: ICreateUserRequestDTO) {
        const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

        if(userAlreadyExists)
        throw new Error('This e-mail is already being used.')

        const user = new User(data);

        await this.usersRepository.save(user);

        await this.mailProvider.send({
            to: {
                name: data.name,
                email: data.email,
            },
            from: {
                name: 'MyApp',
                email: 'myapp@app.com',
            },
            subject: 'Login successfully created',
            body: '<p>Your account has been created and you can now start using our app.</p>'
        });
    }
}