import { useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";

export default function App() {
	const [items, setItems] = useState([]);

	function addItem(item) {
		setItems((currentItems) => [
			...currentItems,
			{ ...item, id: crypto.randomUUID() },
		]);
	}

	return (
		<main className="mx-auto max-w-2xl space-y-8 px-4 py-10">
			<header>
				<h1 className="text-3xl font-bold">Gerenciador de Itens</h1>
				<p className="mt-2 text-gray-600">
					Cadastre itens com nome e descrição.
				</p>
			</header>

			<section aria-labelledby="form-title" className="space-y-4">
				<h2 id="form-title" className="text-xl font-semibold">
					Novo item
				</h2>
				<ItemForm onAdd={addItem} />
			</section>

			<section aria-labelledby="list-title" className="space-y-4">
				<h2 id="list-title" className="text-xl font-semibold">
					Itens cadastrados
				</h2>
				<ItemList items={items} />
			</section>
		</main>
	);
}
