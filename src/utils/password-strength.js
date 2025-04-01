// has number
const hasNumber = (number) => new RegExp(/[0-9]/).test(number);

// has mix of small and capitals
const hasMixed = (number) => new RegExp(/[a-z]/).test(number) && new RegExp(/[A-Z]/).test(number);

// has special chars
const hasSpecial = (number) => new RegExp(/[!#@$%^&*)(+=._-]/).test(number);

// Definir colores según la fortaleza de la contraseña
export const strengthColor = (count) => {
  if (count < 2) return { label: 'No valida', color: 'error.main' };
  if (count < 3) return { label: 'Débil', color: 'warning.main' };
  if (count < 4) return { label: 'Aceptable', color: 'warning.dark' };
  if (count < 5) return { label: 'Buena', color: 'success.main' };
  if (count >= 5) return { label: 'Fuerte', color: 'success.dark' };
  return { label: 'No valida', color: 'error.main' };
};

// Función para evaluar la fortaleza de la contraseña
export const strengthIndicator = (password) => {
  let strengths = 0;
  if (password.length >= 8) strengths += 1;
  if (hasNumber(password)) strengths += 1;
  if (hasSpecial(password)) strengths += 1;
  if (hasMixed(password)) strengths += 1;

  return strengths;
};
