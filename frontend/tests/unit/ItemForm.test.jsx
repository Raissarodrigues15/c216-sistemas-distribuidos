import { describe, it, expect, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ItemForm from "../../src/components/ItemForm";

describe("ItemForm", () => {
	it("envia os dados válidos e limpa os campos", async () => {
		const user = userEvent.setup();
		const onSave = vi.fn().mockResolvedValue(true);

		render(<ItemForm onSave={onSave} />);

		await user.type(screen.getByLabelText("Nome"), "Notebook");
		await user.type(screen.getByLabelText("Descrição"), "14 polegadas");
		await user.click(screen.getByRole("button", { name: "Cadastrar" }));

		await waitFor(() => {
			expect(onSave).toHaveBeenCalledWith({
				name: "Notebook",
				description: "14 polegadas",
			});
		});

		expect(screen.getByLabelText("Nome")).toHaveValue("");
		expect(screen.getByLabelText("Descrição")).toHaveValue("");
	});

	it("mostra erro e não envia quando o nome está vazio", async () => {
		const user = userEvent.setup();
		const onSave = vi.fn().mockResolvedValue(true);

		render(<ItemForm onSave={onSave} />);

		await user.click(screen.getByRole("button", { name: "Cadastrar" }));

		expect(screen.getByRole("alert")).toBeInTheDocument();
		expect(onSave).not.toHaveBeenCalled();
	});
});
