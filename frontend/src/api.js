const API_URL = import.meta.env.VITE_API_URL || "/api";

async function request(path, options = {}) {
	const response = await fetch(`${API_URL}${path}`, {
		headers: {
			"Content-Type": "application/json",
			...options.headers,
		},
		...options,
	});

	if (!response.ok) {
		let message = `Erro na API: ${response.status}`;

		try {
			const data = await response.json();
			message = data.detail || message;
		} catch {
			// Mantém a mensagem padrão.
		}

		throw new Error(message);
	}

	if (response.status === 204) {
		return null;
	}

	return response.json();
}

export const itemsApi = {
	list: () => request("/items/"),

	create: (item) =>
		request("/items/", {
			method: "POST",
			body: JSON.stringify(item),
		}),

	update: (id, item) =>
		request(`/items/${id}`, {
			method: "PUT",
			body: JSON.stringify(item),
		}),

	delete: (id) =>
		request(`/items/${id}`, {
			method: "DELETE",
		}),
};
