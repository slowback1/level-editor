export default abstract class DataFetcher {
	private static BaseUrl: string;

	private async Request<T>(url: string, options: RequestInit): Promise<T> {
		if (!DataFetcher.BaseUrl) await this.GetBaseUrl();

		let combined = `${DataFetcher.BaseUrl}/${url}`;

		return fetch(url, options).then((res) => res.json());
	}
	private async GetBaseUrl() {
		let json = await fetch('api.json').then((res) => res.json());

		if (json) DataFetcher.BaseUrl = json.baseUrl;

		return Promise.resolve();
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
