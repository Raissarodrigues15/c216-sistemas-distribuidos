export default function ItemList({ items, onEdit, onDelete }) {
	if (items.length === 0) {
		return (
			<p className="rounded-lg bg-white p-4 text-slate-600 shadow">
				Nenhum item cadastrado.
			</p>
		);
	}

	return (
		<ul className="space-y-3">
			{items.map((item) => (
				<li
					key={item.id}
					className="flex flex-col justify-between gap-3 rounded-xl bg-white p-4 shadow sm:flex-row sm:items-center"
				>
					<div>
						<h3 className="font-semibold text-slate-800">{item.name}</h3>
						{item.description && (
							<p className="mt-1 text-sm text-slate-600">{item.description}</p>
						)}
					</div>

					<div className="flex gap-2">
						<button
							type="button"
							onClick={() => onEdit(item)}
							className="rounded-lg bg-amber-500 px-3 py-2 text-sm font-medium text-white hover:bg-amber-600"
						>
							Editar
						</button>

						<button
							type="button"
							onClick={() => onDelete(item.id)}
							className="rounded-lg bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
						>
							Excluir
						</button>
					</div>
				</li>
			))}
		</ul>
	);
}
