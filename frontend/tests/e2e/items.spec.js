import { expect, test } from "@playwright/test";

test("adiciona um item e apresenta seus dados na lista", async ({ page }) => {
	await page.goto("/");

	await page.getByLabel("Nome").fill("Teclado");
	await page.getByLabel("Descrição").fill("Teclado mecânico");
	await page.getByRole("button", { name: "Adicionar item" }).click();

	await expect(page.getByRole("heading", { name: "Teclado" })).toBeVisible();
	await expect(page.getByText("Teclado mecânico")).toBeVisible();
	await expect(page.getByText("Nenhum item cadastrado.")).not.toBeVisible();
});

test("exibe validação quando o nome está vazio", async ({ page }) => {
	await page.goto("/");

	await page.getByLabel("Nome").fill("   ");
	await page.getByRole("button", { name: "Adicionar item" }).click();

	await expect(page.getByRole("alert")).toContainText("O nome é obrigatório.");
	await expect(page.getByText("Nenhum item cadastrado.")).toBeVisible();
});
