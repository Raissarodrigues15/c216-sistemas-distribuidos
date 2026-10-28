import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import App from "../../src/App";

describe("integração do formulário com a lista", () => {
	it("adiciona um item e apresenta seus dados na lista", async () => {
		const user = userEvent.setup();

		render(<App />);

		expect(screen.getByText("Nenhum item cadastrado.")).toBeInTheDocument();

		await user.type(screen.getByLabelText("Nome"), "Notebook");
		await user.type(screen.getByLabelText("Descrição"), "14 polegadas");
		await user.click(screen.getByRole("button", { name: "Adicionar item" }));

		expect(
			screen.getByRole("heading", { name: "Notebook" }),
		).toBeInTheDocument();
		expect(screen.getByText("14 polegadas")).toBeInTheDocument();
		expect(
			screen.queryByText("Nenhum item cadastrado."),
		).not.toBeInTheDocument();
	});
});
