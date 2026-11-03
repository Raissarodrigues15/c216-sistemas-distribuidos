import { useState } from "react";
import { validateItem, NAME_MAX_LENGTH } from "../validation";

export default function ItemForm({ initialItem, onSave, onCancel }) {
	const [name, setName] = useState(initialItem?.name ?? "");
	const [description, setDescription] = useState(
		initialItem?.description ?? "",
	);
	const [errors, setErrors] = useState({});
	const [saving, setSaving] = useState(false);

	async function handleSubmit(event) {
		event.preventDefault();

		const result = validateItem({ name, description });
		setErrors(result.errors);

		if (!result.isValid) return;

		setSaving(true);

		try {
			const saved = await onSave(result.values);

			if (saved) {
				setName("");
				setDescription("");
				setErrors({});
			}
		} finally {
			setSaving(false);
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="space-y-4 rounded-xl bg-white p-6 shadow"
		>
			<h2 className="text-xl font-semibold text-slate-800">
				{initialItem ? "Editar item" : "Cadastrar item"}
			</h2>

			<div>
				<label htmlFor="name" className="mb-1 block font-medium text-slate-700">
					Nome
				</label>
				<input
					id="name"
					value={name}
					onChange={(event) => setName(event.target.value)}
					maxLength={NAME_MAX_LENGTH}
					className="w-full rounded-lg border border-slate-300 px-3 py-2"
					aria-invalid={Boolean(errors.name)}
					aria-describedby={errors.name ? "name-error" : undefined}
				/>
				{errors.name && (
					<p id="name-error" role="alert" className="mt-1 text-sm text-red-600">
						{errors.name}
					</p>
				)}
			</div>

			<div>
				<label
					htmlFor="description"
					className="mb-1 block font-medium text-slate-700"
				>
					Descrição
				</label>
				<textarea
					id="description"
					value={description}
					onChange={(event) => setDescription(event.target.value)}
					rows={3}
					className="w-full rounded-lg border border-slate-300 px-3 py-2"
					aria-invalid={Boolean(errors.description)}
				/>
				{errors.description && (
					<p role="alert" className="mt-1 text-sm text-red-600">
						{errors.description}
					</p>
				)}
			</div>

			<div className="flex gap-3">
				<button
					type="submit"
					disabled={saving}
					className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
				>
					{saving
						? "Salvando..."
						: initialItem
							? "Salvar alterações"
							: "Cadastrar"}
				</button>

				{initialItem && (
					<button
						type="button"
						onClick={onCancel}
						disabled={saving}
						className="rounded-lg bg-slate-200 px-4 py-2 font-medium text-slate-700"
					>
						Cancelar
					</button>
				)}
			</div>
		</form>
	);
}
