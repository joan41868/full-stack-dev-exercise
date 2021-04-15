import { CreateUserDTO } from './Dto/User.dto';
import { closeInMongodConnection } from '../helper/MongoTestUtil';
import { UserService } from './user.service';
import { UserSchema } from './Schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { rootMongooseTestModule } from '../helper/MongoTestUtil';
import { UserController } from './user.controller';

describe('UserController', () => {
	let controller: UserController;

	beforeEach(async () => {
		const module: TestingModule = await Test.createTestingModule({
			imports: [
				rootMongooseTestModule(),
				MongooseModule.forFeature([
					{ name: 'User', schema: UserSchema },
				]),
			],
			providers: [UserService],
			controllers: [UserController],
		}).compile();

		const svc = module.get<UserService>(UserService);
		controller = new UserController(svc);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	it('shouldSignUpProperly', async () => {
		const newUser = new CreateUserDTO();
		newUser.email = 'test@mail.com';
		newUser.username = 'testusername';
		newUser.isAccountActivated = false;
		const resp = await controller.signUp(newUser);
		expect(resp).toBeDefined();
		expect(resp.message).toBe('OK');
	});

	afterAll(async () => {
		await closeInMongodConnection();
	});
});
