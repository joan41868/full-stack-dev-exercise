import {
	Body,
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { CreateUserDTO, UserCreatedDTO } from './Dto/User.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
	constructor(private readonly service: UserService) {}

	@Post('/sign-up')
	async signUp(@Body() body: CreateUserDTO) {
		const result = await this.service.createUser(body);
		const savedUser = result.user;
		if (savedUser) {
			const userCreatedDTO = new UserCreatedDTO();
			userCreatedDTO.email = savedUser.email;
			userCreatedDTO.accountConfirmationLink = `http://localhost:80/users/activate/${savedUser.confirmationCode}`;
			userCreatedDTO.isAccountActivated = false;
			userCreatedDTO.confirmationCode = savedUser.confirmationCode;
			userCreatedDTO.username = savedUser.username;

			return { message: 'OK', ...userCreatedDTO };
		} else {
			// TODO status code
			throw new HttpException(
				{ message: 'FAILED', reason: result.reason },
				HttpStatus.BAD_REQUEST,
			);
		}
	}

	@Get('/activate/:code')
	async activate(@Param('code') code: string) {
		const activatedUser = await this.service.activateAccount(code);
		if (activatedUser) {
			return activatedUser;
		} else {
			return {
				message: 'No such code',
			};
		}
	}
}
