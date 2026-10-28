export default function ItemList({ items }) {
	if (items.length === 0) {
		return <p>Nenhum item cadastrado.</p>;
	}

	return (
		<ul className="space-y-3">
			{items.map((item) => (
				<li key={item.id} className="rounded border border-gray-200 p-3">
					<h3 className="font-semibold">{item.name}</h3>
					{item.description && <p>{item.description}</p>}
				</li>
			))}
		</ul>
	);
}
