import { MailTrapMailProvider } from "../../providers/implementations/MailTrapMailProvider";
import { DevInMemoryRepository } from "../../repositories/implementations/DevInMemoryRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailTrapProvider = new MailTrapMailProvider();

const devInMemoryRepository = new DevInMemoryRepository();

const createUserUseCase = new CreateUserUseCase(
    devInMemoryRepository,
    mailTrapProvider
);

const createUserController = new CreateUserController(
    createUserUseCase
);

export { createUserUseCase, createUserController }
