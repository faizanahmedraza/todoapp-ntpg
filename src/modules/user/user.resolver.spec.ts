import { Test, TestingModule } from "@nestjs/testing";
import { UserResolver } from "./user.resolver"
import { AppModule } from '../../app.module';
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

describe('UserResolver', () => {
    let resolver: UserResolver;
    let createDto = new CreateUserInput();
    (createDto.name = "Faizan Ahmed Raza"), (createDto.email = "faizan.raza@cooperativecomputing.com"), (createDto.phone = "923325774617"), (createDto.address = "Tariq Road");
    let updateDto = new UpdateUserInput();

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
                AppModule,
            ]
        }).compile();
        resolver = module.get<UserResolver>(UserResolver)
    });

    it('should be defined', () => {
        expect(resolver).toBeDefined();
    });

    test('adds 2+2 to equal 4', () => {
        expect(2 + 2).toBe(4);
    });

    it('find all users / users array should be empty', async () => {
        expect(await resolver.findAll()).toStrictEqual([]);
    });

    test('should create a new user', async () => {
        expect(await resolver.createUser(createDto)).toBe("user has been created");
        createDto.email = "faizanahmedraza35@gmail.com";
        expect(await resolver.createUser(createDto)).toBe("user has been created");
    });

    test('create user by same email (for already exist checking)', async () => {
        // expect.assertions is important when testing the error scenarios of asynchronous code, and is not redundant.
        expect.assertions(1);
        return await resolver.createUser(createDto).catch(e =>
            expect(e.message).toEqual('SQLITE_CONSTRAINT: UNIQUE constraint failed: users.email')
        );
    });

    test('find user by id', async () => {
        const users = await resolver.findAll();
        const user = await resolver.findOne(users[0].id);
        expect(user).toEqual(users[0]);
    });

    it('find user by invalid id', async () => {
        expect.assertions(1);
        return await resolver.findOne(111).catch(e =>
            expect(e.message).toEqual('User #111 not found'),
        );
    });

    test('update user by id', async () => {
        const users = await resolver.findAll();
        updateDto.id = users[0].id;
        updateDto.name = "fazy";
        updateDto.address = "gulshan";
        expect(await resolver.updateUser(updateDto)).toEqual("user has been updated");
    });

    test('delete user by id', async () => {
        const [{ id }] = await resolver.findAll();
        expect(await resolver.removeUser(id)).toEqual("user has been deleted");
    });
})