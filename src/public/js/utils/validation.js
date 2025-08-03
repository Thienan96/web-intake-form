export const PHONE_PATTERN = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
export const POSTAL_PATTERN = /[A-Z]{1}[0-9]{1}[A-Z]{1}[ ]{0,1}[0-9]{1}[A-Z]{1}[0-9]{1}$/;
export const MEDAVIE_BLUECROSS_PATTERN = /^K[0-9]{7}$/;
export const validatePhone = (phone) => {
  return PHONE_PATTERN.test(phone);
};

export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, '');
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    return '(' + match[1] + ') ' + match[2] + '-' + match[3];
  }
  return phone;
}; 
export const formatPostCode = (code) => {
  const match = code.match(/^([A-Z][0-9][A-Z])([0-9][A-Z][0-9])$/);
  if (match) {
    return match[1] + ' ' + match[2];
  }
  return code.toUpperCase();
}; 

export const validatePostal = (postal) => {
  return POSTAL_PATTERN.test(postal);
};

export const validateMedavieBluecross = (number) => {
  return MEDAVIE_BLUECROSS_PATTERN.test(number);
};

export const formatMedavieBluecross = (number) => {
  // Remove any non-alphanumeric characters
  const cleaned = number.replace(/[^A-Z0-9]/g, '');
  
  // Ensure K is uppercase
  if (cleaned.length > 0) {
    return 'K' + cleaned.substring(1);
  }
  return cleaned;
};