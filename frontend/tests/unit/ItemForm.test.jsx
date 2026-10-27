import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import ItemForm from "../../src/components/ItemForm";

describe("ItemForm", () => {
	it("envia os dados válidos e limpa os campos", async () => {
		const user = userEvent.setup();
		const onAdd = vi.fn();

		render(<ItemForm onAdd={onAdd} />);

		await user.type(screen.getByLabelText("Nome"), "Notebook");
		await user.type(screen.getByLabelText("Descrição"), "14 polegadas");
		await user.click(screen.getByRole("button", { name: "Adicionar item" }));

		expect(onAdd).toHaveBeenCalledWith({
			name: "Notebook",
			description: "14 polegadas",
		});
		expect(screen.getByLabelText("Nome")).toHaveValue("");
		expect(screen.getByLabelText("Descrição")).toHaveValue("");
	});

	it("mostra erro e não envia quando o nome está vazio", async () => {
		const user = userEvent.setup();
		const onAdd = vi.fn();

		render(<ItemForm onAdd={onAdd} />);
		await user.click(screen.getByRole("button", { name: "Adicionar item" }));

		expect(screen.getByRole("alert")).toHaveTextContent(
			"O nome é obrigatório.",
		);
		expect(onAdd).not.toHaveBeenCalled();
	});
});
