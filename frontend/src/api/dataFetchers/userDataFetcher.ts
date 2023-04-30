import DataFetcher from './dataFetcher';

export interface LoginResponse {
	Authorization: string;
	data: {
		id: number;
		email: string;
		name: string;
	};
}

export interface RegisterRequest {
	name: string;
	email: string;
	password: string;
}

export interface RegisterResponse {
	success: boolean;
	message: string;
	data: {
		id: number;
		email: string;
		name: string;
	};
}

export default class UserDataFetcher extends DataFetcher {
	Login(username: string, password: string): Promise<LoginResponse> {
		return this.Post('user/login', { user: { name: username, password: password } });
	}
	Register(request: RegisterRequest): Promise<RegisterResponse> {
		return this.Post('user/register', { user: request });
	}
	GetSession(): Promise<{ id: number; name: string }> {
		return this.Get("user/session");
	}
}
