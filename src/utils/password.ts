export const calculatePasswordStrength = (value: string) => {
	let strength = 0;
	if (value.match(/\p{Ll}+/u)) {
		strength += 1;
	}
	if (value.match(/\p{Lu}+/u)) {
		strength += 1;
	}
	if (value.match(/[0-9]+/)) {
		strength += 1;
	}
	if (value.match(/[`~!@#$%^&*()\-_=+{}[\]\\|;:'",<.>/?]+/)) {
		strength += 1;
	}
	return strength;
};
