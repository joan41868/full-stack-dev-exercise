export class CreateUserDTO {
	public email: string;
	public isAccountActivated: boolean;
	public confirmationCode: string;
	public username: string;
}

export class UserCreatedDTO extends CreateUserDTO {
	public accountConfirmationLink: string;
	constructor() {
		super();
	}
}
