import { plainToInstance } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

export async function validateDTO<T extends object>(
  type: new () => T,
  input: object,
  skipMissingProperties = false,
): Promise<void> {
  const dtoInstance = plainToInstance(type, input);
  const errors = await validate(dtoInstance, { skipMissingProperties });

  if (errors.length > 0) {
    const formattedErrors = formatErrors(errors);
    throw formattedErrors;
  }
}

function formatErrors(errors: ValidationError[]): Record<string, string[]> {
  const formatted: Record<string, string[]> = {};
  errors.forEach((error) => {
    if (error.constraints) {
      formatted[error.property] = Object.values(error.constraints);
    }
  });
  return formatted;
}
