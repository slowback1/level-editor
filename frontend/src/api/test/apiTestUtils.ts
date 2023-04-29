export function MockRoute(route: string, response: any) {
	window.fetch = jest.fn((request, options) => {
		let url = request as string;
		if (url.toLowerCase() !== 'api.json' && !url.toLowerCase().includes(route))
			throw new Error('Invalid Route ' + url);

		return Promise.resolve({ json: () => Promise.resolve(response) });
	}) as any;
}

export function MockFetch(response: any) {
	window.fetch = jest.fn(() => Promise.resolve({ json: () => Promise.resolve(response) })) as any;
}
