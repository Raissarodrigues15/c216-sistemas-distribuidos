import { useState } from "react";
import { validateItem, NAME_MAX_LENGTH } from "../validation";

export default function ItemForm({ onAdd }) {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [errors, setErrors] = useState({});

	function handleSubmit(event) {
		event.preventDefault();
		const result = validateItem({ name, description });
		setErrors(result.errors);

		if (Object.keys(result.errors).length > 0) {
			return;
		}

		onAdd(result.values);
		setName("");
		setDescription("");
	}

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<div>
				<label htmlFor="item-name" className="mb-1 block font-medium">
					Nome
				</label>
				<input
					id="item-name"
					name="name"
					value={name}
					onChange={(event) => setName(event.target.value)}
					maxLength={NAME_MAX_LENGTH}
					aria-invalid={Boolean(errors.name)}
					aria-describedby={errors.name ? "name-error" : undefined}
					className="w-full rounded border border-gray-300 px-3 py-2"
				/>
				{errors.name && (
					<p id="name-error" role="alert" className="mt-1 text-sm text-red-700">
						{errors.name}
					</p>
				)}
			</div>

			<div>
				<label htmlFor="item-description" className="mb-1 block font-medium">
					Descrição
				</label>
				<textarea
					id="item-description"
					name="description"
					value={description}
					onChange={(event) => setDescription(event.target.value)}
					className="w-full rounded border border-gray-300 px-3 py-2"
					rows={3}
				/>
			</div>

			<button
				type="submit"
				className="rounded bg-blue-700 px-4 py-2 font-medium text-white hover:bg-blue-800"
			>
				Adicionar item
			</button>
		</form>
	);
}
