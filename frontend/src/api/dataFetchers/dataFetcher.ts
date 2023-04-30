import { get } from "svelte/store";
import { userDataStore } from "../../stores/userDataStore";

export default abstract class DataFetcher {
	private static BaseUrl: string;

	private async Request<T>(url: string, options: RequestInit): Promise<T> {
		return this.GetBaseUrl().then(baseUrl => {
			let combined = `${baseUrl}/${url}`;
			options = this.appendAuthorizationHeader(options);

			return fetch(combined, options).then((res) => res.json());
		})
	}
	private async GetBaseUrl() {
		if (!DataFetcher.BaseUrl) {
			let json = await fetch('api.json').then((res) => res.json());

			if (json) DataFetcher.BaseUrl = json.baseUrl;
		}

		return Promise.resolve(DataFetcher.BaseUrl);
	}

	private appendAuthorizationHeader(header: RequestInit) {
		let userData = get(userDataStore);

		if (userData) {
			if (!header.headers) header.headers = {};

			header.headers["Authorization"] = `Bearer ${userData.token}`;
		}

		return header;
	}

	protected Get<T>(url: string): Promise<T> {
		return this.Request(url, {});
	}

	protected async Post<T>(url: string, body: any): Promise<T> {
		let options: RequestInit = {
			body: JSON.stringify(body),
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST'
		};

		return this.Request(url, options);
	}
}
