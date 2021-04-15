import { CreateUserDTO } from './Dto/User.dto';
import { UserSchema } from './Schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import {
	closeInMongodConnection,
	rootMongooseTestModule,
} from '../helper/MongoTestUtil';
import { UserService } from './user.service';


async function sleep(time){
	return new Promise((resolve, reject)=>{
		setTimeout(resolve, time);
	});
}

describe('UserService', () => {
	let service: UserService;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				rootMongooseTestModule(),
				MongooseModule.forFeature([
					{ name: 'User', schema: UserSchema },
				]),
			],
			providers: [UserService],
		}).compile();

		service = module.get<UserService>(UserService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	it('shouldCreateUser', async () => {
		const user: CreateUserDTO = {
			email: 'somemail@mail.com',
			confirmationCode: '',
			isAccountActivated: false,
			username: 'somename',
		};
		const result = await service.createUser(user);
		expect(result).toBeDefined();
	});

	it('shouldNotCreateDuplicateUsers', async () => {
		const user: CreateUserDTO = {
			email: 'somemail@mail.com',
			confirmationCode: '',
			isAccountActivated: false,
			username: 'somename',
		};
		const result = await service.createUser(user);
		expect(result).toBeDefined();

		await sleep(3000);

		const result2 = await service.createUser(user);
		expect(result2.message).toBe('FAILED');
	});

	afterAll(async () => {
		await closeInMongodConnection();
	});
});
