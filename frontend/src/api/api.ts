import UserDataFetcher from './dataFetchers/userDataFetcher';

class Api {
	User: UserDataFetcher;

	constructor() {
		this.User = new UserDataFetcher();
	}
}

export default new Api();
