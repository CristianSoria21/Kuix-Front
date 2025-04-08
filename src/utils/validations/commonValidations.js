// src/validations/commonValidations.js

// Validación de RFC (México)
export const validateRfc = (rfc) => /^[A-ZÑ&]{3,4}\d{6}[A-Z0-9]{3}$/.test(rfc);

// Validación de código postal (5 dígitos)
export const validatePostalCode = (zip) => /^\d{5}$/.test(zip);

// Validación de email simple
export const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

// Validación de teléfono (10 dígitos)
export const validatePhoneNumber = (phone) => /^\d{10}$/.test(phone);
