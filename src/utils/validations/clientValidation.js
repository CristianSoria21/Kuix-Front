// src/validations/clientValidation.js
import * as Yup from 'yup';
import { validateRfc, validatePostalCode, validateEmail, validatePhoneNumber } from './commonValidations';

export const clientValidationSchema = Yup.object({
  legal_name: Yup.string().required('Requerido'),
  tax_id: Yup.string()
    .required('Requerido')
    .test('valid-rfc', 'RFC inválido', (value) => validateRfc(value || '')),
  tax_system: Yup.string().required('Requerido'),
  zip: Yup.string()
    .required('Requerido')
    .test('valid-zip', 'Código postal inválido', (value) => validatePostalCode(value || '')),
  street: Yup.string().required('Requerido'),
  exterior: Yup.string().required('Requerido'),
  email: Yup.string()
    .required('Requerido')
    .email('Email inválido')
    .test('valid-email', 'Email inválido', (value) => validateEmail(value || '')),
  phone: Yup.string()
    .required('Requerido')
    .test('valid-phone', 'Teléfono inválido', (value) => validatePhoneNumber(value || ''))
});
