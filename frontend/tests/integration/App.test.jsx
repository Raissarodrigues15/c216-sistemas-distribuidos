import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../../src/App";
import { itemsApi } from "../../src/api";

vi.mock("../../src/api", () => ({
	itemsApi: {
		list: vi.fn(),
		create: vi.fn(),
		update: vi.fn(),
		delete: vi.fn(),
	},
}));

describe("integração do formulário com a lista", () => {
	it("adiciona um item e apresenta seus dados na lista", async () => {
		const user = userEvent.setup();

		itemsApi.list.mockResolvedValueOnce([]).mockResolvedValueOnce([
			{
				id: 1,
				name: "Notebook",
				description: "14 polegadas",
			},
		]);

		itemsApi.create.mockResolvedValue({
			id: 1,
			name: "Notebook",
			description: "14 polegadas",
		});

		render(<App />);

		expect(
			await screen.findByText("Nenhum item cadastrado."),
		).toBeInTheDocument();

		await user.type(screen.getByLabelText("Nome"), "Notebook");
		await user.type(screen.getByLabelText("Descrição"), "14 polegadas");

		await user.click(screen.getByRole("button", { name: "Cadastrar" }));

		await waitFor(() => {
			expect(itemsApi.create).toHaveBeenCalledWith({
				name: "Notebook",
				description: "14 polegadas",
			});
		});

		expect(await screen.findByText("Notebook")).toBeInTheDocument();
		expect(screen.getByText("14 polegadas")).toBeInTheDocument();
	});
});
