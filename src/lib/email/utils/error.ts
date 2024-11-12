export function emailError(code: string, message: string, details?: any) {
  const error = new Error(message);
  error.name = 'EmailError';
  (error as any).code = code;
  (error as any).details = details;
  
  // Custom toJSON method to maintain the original structure
  (error as any).toJSON = function () {
    return {
      name: error.name,
      code: (error as any).code,
      message: error.message,
      details: (error as any).details,
      stack: error.stack,
    };
  };

  return error;
}
