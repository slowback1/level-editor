import { MockRoute } from '../test/apiTestUtils';
import UserDataFetcher from './userDataFetcher';

describe('UserDataFetcher', () => {
	let dataFetcher: UserDataFetcher = new UserDataFetcher();

	it('calls the correct url to log a user in', async () => {
		MockRoute('user/login', { Authorization: 'xyz' });

		let result = await dataFetcher.Login('user', 'pass');
		expect(result.Authorization).toEqual('xyz');
	});
	it('calls the correct url to create a user', async () => {
		MockRoute('user/register', { success: true });

		let result = await dataFetcher.Register({
			name: 'test',
			email: 'test@example.com',
			password: '1234'
		});

		expect(result.success).toEqual(true);
	});
	it("calls the correct url to get the user session", async () => {
		MockRoute("user/session", { name: "bob", id: 1 });

		let result = await dataFetcher.GetSession();

		expect(result.name).toEqual("bob");
		expect(result.id).toEqual(1);
	})
});
