// tests/braille.test.js
import Braille from '../src/braille';

describe('Braille Translator', () => {
  test('should translate Spanish to Braille correctly', () => {
    const input = '¡Hola!, ¿Cómo estás?';
    const expectedOutput = '⠠⠓⠕⠇⠁⠖⠂⠀⠢⠉⠿⠍⠕⠀⠑⠎⠞⠁⠎⠹';
    expect(Braille.toBraille(input)).toBe(expectedOutput);
  });

  test('should translate Braille to Spanish correctly', () => {
    const input = '⠠⠓⠕⠇⠁⠖⠂⠀⠢⠉⠿⠍⠕⠀⠑⠎⠞⠁⠎⠹';
    const expectedOutput = '¡Hola!, ¿Cómo estás?';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });

  // Puedes agregar más pruebas para otros casos
  describe('Additional Braille Translator Tests', () => {
    test('should handle accented characters correctly', () => {
      const input = 'áéíóúüñ';
      const expectedOutput = '⠷⠿⠮⠬⠾⠳⠻';
      expect(Braille.toBraille(input)).toBe(expectedOutput);
    });
  
    test('should handle uppercase characters correctly', () => {
      const input = '¡Hola Mundo!';
      const expectedOutput = '⠠⠓⠕⠇⠁⠀⠠⠍⠥⠝⠙⠕⠖';
      expect(Braille.toBraille(input)).toBe(expectedOutput);
    });
  
    test('should handle numbers correctly', () => {
      const input = '1234567890';
      const expectedOutput = '⠼⠁⠼⠃⠼⠉⠼⠙⠼⠑⠼⠋⠼⠛⠼⠓⠼⠊⠼⠚';
      expect(Braille.toBraille(input)).toBe(expectedOutput);
    });
  
    test('should handle empty string correctly', () => {
      const input = '';
      const expectedOutput = '';
      expect(Braille.toBraille(input)).toBe(expectedOutput);
    });
  });
  

});
