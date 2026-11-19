import company from '../content/company.json' with { type: 'json' };

export function whatsappUrl(message = 'Hola, quisiera conversar sobre un proyecto con CONSUC SAC.') {
  const number = company.whatsappNumber?.replace(/\D/g, '');
  if (!number || !/^51\d{9}$/.test(number)) throw new Error('Se requiere un WhatsApp peruano confirmado.');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function formatPhone(phone) {
  return phone.replace(/^\+51(\d{3})(\d{3})(\d{3})$/, '$1 $2 $3');
}
