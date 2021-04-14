import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDTO, UserCreatedDTO } from './Dto/User.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly service: UserService) {}

  @Post('/sign-up')
  async signUp(@Res() resp: Response, @Body() body: CreateUserDTO) {
    const savedUser = await this.service.createUser(body);
    if (savedUser) {
      const userCreatedDTO = new UserCreatedDTO();
      userCreatedDTO.email = savedUser.email;
      userCreatedDTO.accountConfirmationLink = `http://localhost:80/users/activate/${savedUser.confirmationCode}`;
      userCreatedDTO.isAccountActivated = false;
      userCreatedDTO.confirmationCode = savedUser.confirmationCode;
      userCreatedDTO.username = savedUser.username;

      resp.status(HttpStatus.OK).json({ message: 'OK', ...userCreatedDTO });
    } else {
      // TODO status code
      resp
        .status(HttpStatus.BAD_REQUEST)
        .json({ message: 'FAILED', reason: 'Email already in use' });
    }
  }

  @Get('/activate/:code')
  async activate(@Res() resp: Response, @Param('code') code: string) {
    const activatedUser = await this.service.activateAccount(code);
    if (activatedUser) {
      resp.status(HttpStatus.OK).redirect('/');
    } else {
      resp.status(HttpStatus.NOT_FOUND).json({
        message: 'No such code',
      });
    }
  }
}
