// JSON validation utility (MANDATORY in + out)
export function validateJSON(payload: any, context: string): void {
  if (!payload) {
    throw new Error(`${context}: Payload is null or undefined`);
  }

  if (typeof payload !== 'object') {
    throw new Error(`${context}: Payload must be an object`);
  }

  // Check for circular references
  try {
    JSON.stringify(payload);
  } catch (error) {
    throw new Error(`${context}: Payload contains circular references or is not serializable`);
  }

  // Basic structure validation
  if (Array.isArray(payload)) {
    throw new Error(`${context}: Payload cannot be an array at root level`);
  }

  // Validate that required fields exist (adjust based on your needs)
  const requiredFields = ['title', 'sector', 'donorChoice'];
  for (const field of requiredFields) {
    if (!(field in payload)) {
      console.warn(`${context}: Missing recommended field '${field}'`);
    }
  }

  console.log(`✅ ${context}: JSON validation passed`);
}