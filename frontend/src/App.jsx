import { useCallback, useEffect, useState } from "react";
import ItemForm from "./components/ItemForm";
import ItemList from "./components/ItemList";
import { itemsApi } from "./api";

export default function App() {
	const [items, setItems] = useState([]);
	const [editingItem, setEditingItem] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	const loadItems = useCallback(async () => {
		try {
			setError("");
			const data = await itemsApi.list();
			setItems(data);
		} catch (err) {
			setError(err.message || "Não foi possível carregar os itens.");
		} finally {
			setLoading(false);
		}
	}, []);

	useEffect(() => {
		loadItems();
	}, [loadItems]);

	async function saveItem(item) {
		try {
			setError("");

			if (editingItem) {
				await itemsApi.update(editingItem.id, item);
			} else {
				await itemsApi.create(item);
			}

			setEditingItem(null);
			await loadItems();
			return true;
		} catch (err) {
			setError(err.message || "Não foi possível salvar o item.");
			return false;
		}
	}

	async function deleteItem(id) {
		const confirmed = window.confirm("Deseja realmente excluir este item?");

		if (!confirmed) return;

		try {
			setError("");
			await itemsApi.delete(id);

			if (editingItem?.id === id) {
				setEditingItem(null);
			}

			await loadItems();
		} catch (err) {
			setError(err.message || "Não foi possível excluir o item.");
		}
	}

	return (
		<main className="min-h-screen bg-slate-100 px-4 py-10">
			<div className="mx-auto max-w-2xl space-y-8">
				<header>
					<h1 className="text-3xl font-bold text-slate-800">
						Gerenciador de Itens
					</h1>
					<p className="mt-2 text-slate-600">
						Cadastro de itens integrado à API.
					</p>
				</header>

				{error && (
					<p role="alert" className="rounded-lg bg-red-100 p-3 text-red-700">
						{error}
					</p>
				)}

				<ItemForm
					key={editingItem?.id ?? "new"}
					initialItem={editingItem}
					onSave={saveItem}
					onCancel={() => setEditingItem(null)}
				/>

				<section>
					<h2 className="mb-4 text-xl font-semibold text-slate-800">
						Itens cadastrados
					</h2>

					{loading ? (
						<p className="text-slate-600">Carregando itens...</p>
					) : (
						<ItemList
							items={items}
							onEdit={setEditingItem}
							onDelete={deleteItem}
						/>
					)}
				</section>
			</div>
		</main>
	);
}
