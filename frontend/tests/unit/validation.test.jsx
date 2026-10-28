import { describe, expect, it } from "vitest";
import { validateItem, NAME_MAX_LENGTH } from "../../src/validation";

describe("validateItem", () => {
	it("aceita um nome válido e remove espaços extras", () => {
		const result = validateItem({
			name: "  Notebook  ",
			description: "  14 polegadas  ",
		});

		expect(result.errors).toEqual({});
		expect(result.values).toEqual({
			name: "Notebook",
			description: "14 polegadas",
		});
	});

	it("rejeita nome vazio", () => {
		const result = validateItem({ name: "   ", description: "" });

		expect(result.errors.name).toBe("O nome é obrigatório.");
	});

	it("rejeita nome com mais de 100 caracteres", () => {
		const result = validateItem({
			name: "a".repeat(NAME_MAX_LENGTH + 1),
			description: "",
		});

		expect(result.errors.name).toBe(
			"O nome deve ter no máximo 100 caracteres.",
		);
	});

	it("aceita descrição vazia", () => {
		const result = validateItem({ name: "Mouse", description: "" });

		expect(result.errors).toEqual({});
		expect(result.values.description).toBe("");
	});
});
