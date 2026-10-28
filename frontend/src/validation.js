export const NAME_MAX_LENGTH = 100;

export function validateItem({ name, description }) {
	const values = {
		name: name.trim(),
		description: description.trim(),
	};
	const errors = {};

	if (!values.name) {
		errors.name = "O nome é obrigatório.";
	} else if (values.name.length > NAME_MAX_LENGTH) {
		errors.name = `O nome deve ter no máximo ${NAME_MAX_LENGTH} caracteres.`;
	}

	return { errors, values };
}
