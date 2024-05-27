// tests/braille.test.js
import Braille from '../src/braille';

//Pruebas de traducción de español a braille
describe('Braille Translator - Spanish to Braille', () => {
  test('should translate a letter correctly', () => {
    const input = 'z';
    const expectedOutput = '⠵';
    expect(Braille.toBraille(input)).toBe(expectedOutput);
  });

  test('should translate a word correctly', () => {
    const input = 'prueba';
    const expectedOutput = '⠏⠗⠥⠑⠃⠁';
    expect(Braille.toBraille(input)).toBe(expectedOutput);
  });

  test('should handle empty string correctly', () => {
    const input = '';
    const expectedOutput = '';
    expect(Braille.toBraille(input)).toBe(expectedOutput);
  });

  test('should translate a phrase correctly', () => {
    const input = 'esta es una prueba';
    const expectedOutput = '⠑⠎⠞⠁⠀⠑⠎⠀⠥⠝⠁⠀⠏⠗⠥⠑⠃⠁';
    expect(Braille.toBraille(input)).toBe(expectedOutput);
  });

  test('should handle numbers correctly', () => {
    const input = '1234567890';
    const expectedOutput = '⠼⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚';
    expect(Braille.toBraille(input)).toBe(expectedOutput);
  });
  
  test('Should translate a phrase containing numbers correctly', () => {
    const input = '2003 fue un bonito año';
    const expectedOutput = '⠼⠃⠚⠚⠉⠀⠋⠥⠑⠀⠥⠝⠀⠃⠕⠝⠊⠞⠕⠀⠁⠻⠕';
    expect(Braille.toBraille(input)).toBe(expectedOutput);
  });

  test('should handle uppercase characters correctly', () => {
    const input = 'Hola Juan';
    const expectedOutput = '⠨⠓⠕⠇⠁ ⠨⠚⠥⠁⠝';
    expect(Braille.toBraille(input)).toBe(expectedOutput);
  });

  test('should handle accented characters correctly', () => {
    const input = 'áéíóúüñ';
    const expectedOutput = '⠷⠮⠌⠬⠾⠳⠻';
    expect(Braille.toBraille(input)).toBe(expectedOutput);
  });

  test('Should translate a phrase containing accented letters correctly', () => {
    const input = 'El niño comió la torta con alegría';
    const expectedOutput = '⠼⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚';
    expect(Braille.toBraille(input)).toBe(expectedOutput);
  });

  test('Should translate characters correctly', () => {
    const input = '¿? ¡! . , +';
    const expectedOutput = '⠢⠢⠀⠖⠖ ⠄ ⠂ ⠲';
    expect(Braille.toBraille(input)).toBe(expectedOutput);
  });
});

//Pruebas de traducción de braille a español
describe('Braille Translator - Braille to Spanish', () => {

  test('should translate a letter correctly', () => {
    const expectedOutput = 'z';
    const input = '⠵';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('should translate a word correctly', () => {
    const expectedOutput = 'prueba';
    const input = '⠏⠗⠥⠑⠃⠁';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('should handle empty string correctly', () => {
    const expectedOutput = '';
    const input = '';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('should translate a phrase correctly', () => {
    const expectedOutput = 'esta es una prueba';
    const input = '⠑⠎⠞⠁⠀⠑⠎⠀⠥⠝⠁⠀⠏⠗⠥⠑⠃⠁';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('should handle numbers correctly', () => {
    const expectedOutput = '1234567890';
    const input = '⠼⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('Should translate a phrase containing numbers correctly', () => {
    const expectedOutput = '2003 fue un bonito año';
    const input = '⠼⠃⠚⠚⠉⠀⠋⠥⠑⠀⠥⠝⠀⠃⠕⠝⠊⠞⠕⠀⠁⠻⠕';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('should handle uppercase characters correctly', () => {
    const expectedOutput = 'Hola Juan';
    const input = '⠨⠓⠕⠇⠁ ⠨⠚⠥⠁⠝';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('should handle accented characters correctly', () => {
    const expectedOutput = 'áéíóúüñ';
    const input = '⠷⠮⠌⠬⠾⠳⠻';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('Should translate a phrase containing accented letters correctly', () => {
    const expectedOutput = 'El niño comió la torta con alegría';
    const input = '⠼⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('Should translate characters correctly', () => {
    const expectedOutput = '¿? ¡! . , +';
    const input = '⠢⠢⠀⠖⠖ ⠄ ⠂ ⠲';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });  
});
