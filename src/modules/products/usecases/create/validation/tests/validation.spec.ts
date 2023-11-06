import { validateDTO } from '../index';
import { IsNotEmpty } from 'class-validator';

// Crie uma classe de teste para validação
class TestDTO {
  @IsNotEmpty()
  field: string;
}

describe('validateDTO', () => {
  it('should validate without errors for correct data', async () => {
    const input = { field: 'test' };

    await expect(validateDTO(TestDTO, input)).resolves.toBeUndefined();
  });

  it('should throw an error for incorrect data', async () => {
    const input = { field: '' }; // Empty string should trigger @IsNotEmpty

    await expect(validateDTO(TestDTO, input)).rejects.toStrictEqual({
      field: ['field should not be empty'],
    });
  });

  it('should skip missing properties if skipMissingProperties is true', async () => {
    const input = {}; // Missing 'field' property

    // The validation should pass because we're skipping missing properties
    await expect(validateDTO(TestDTO, input, true)).resolves.toBeUndefined();
  });

  it('should not skip missing properties if skipMissingProperties is false', async () => {
    const input = {}; // Missing 'field' property

    await expect(validateDTO(TestDTO, input, false)).rejects.toStrictEqual({
      field: ['field should not be empty'],
    });
  });
});
