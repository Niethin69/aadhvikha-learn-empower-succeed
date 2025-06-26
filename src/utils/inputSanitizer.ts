
// Input sanitization utilities
export const sanitizeText = (input: string): string => {
  if (!input) return '';
  
  // Remove potential XSS characters and trim whitespace
  return input
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim()
    .substring(0, 1000); // Limit length
};

export const sanitizeEmail = (email: string): string => {
  if (!email) return '';
  
  // Basic email sanitization
  const sanitized = email.toLowerCase().trim();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  return emailRegex.test(sanitized) ? sanitized : '';
};

export const sanitizePhone = (phone: string): string => {
  if (!phone) return '';
  
  // Remove all non-digit and non-plus characters, then limit length
  return phone.replace(/[^\d+\-\s()]/g, '').trim().substring(0, 20);
};

export const sanitizePassportIC = (passportIC: string): string => {
  if (!passportIC) return '';
  
  // Allow alphanumeric characters, spaces, and hyphens only
  return passportIC.replace(/[^a-zA-Z0-9\s\-]/g, '').trim().substring(0, 50);
};

export const validateFileType = (file: File): boolean => {
  const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png'];
  return allowedTypes.includes(file.type);
};

export const validateFileSize = (file: File): boolean => {
  const maxSize = 10 * 1024 * 1024; // 10MB
  return file.size <= maxSize;
};
