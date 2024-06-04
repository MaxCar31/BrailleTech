// tests/braille.test.js
import Braille from '../src/utils/braille';

//Pruebas de traducción de español a braille
describe('Braille Translator - Spanish to Braille', () => {  //cdp9
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

  test('should handle empty string correctly', () => { //cdp10
    const input = 'a b';
    const expectedOutput = '⠁ ⠃';
    expect(Braille.toBraille(input)).toBe(expectedOutput);
  });

  test('should translate a phrase correctly', () => {
    const input = 'esta es una prueba';
    const expectedOutput = '⠑⠎⠞⠁⠀⠑⠎⠀⠥⠝⠁⠀⠏⠗⠥⠑⠃⠁';
    expect(Braille.toBraille(input)).toBe(expectedOutput);
  });

  test('should handle numbers correctly', () => { //cdp11
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

  test('Should translate a phrase containing accented letters correctly', () => { //cdp12
    const input = 'El niño comió la torta con alegría';
    const expectedOutput = '⠨⠑⠇⠀⠝⠊⠻⠕⠀⠉⠕⠍⠊⠬⠀⠇⠁⠀⠞⠕⠗⠞⠁⠀⠉⠕⠝⠀⠁⠇⠑⠛⠗⠌⠁';
    expect(Braille.toBraille(input)).toBe(expectedOutput);
  });

  test('translating a question', () => { //cdp13
    const input = '¿A que hora nos vamos de aquí?';
    const expectedOutput = '⠢⠠⠁⠀⠟⠥⠑⠀⠓⠕⠗⠁⠀⠝⠕⠎⠀⠧⠁⠍⠕⠎⠀⠙⠑⠀⠁⠟⠥⠌⠢';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });

  test('translating an exclamatory sentence ', () => {
    const input = '¡No me grites!';
    const expectedOutput = '⠖⠠⠝⠕⠀⠍⠑⠀⠛⠗⠊⠞⠑⠎⠖';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
});

//Pruebas de traducción de braille a español
describe('Braille Translator - Braille to Spanish', () => {

  test('should translate a letter correctly', () => {
    const expectedOutput = 'z';
    const input = '⠵';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('should translate a word correctly', () => { //cdp15
    const expectedOutput = 'prueba';
    const input = '⠏⠗⠥⠑⠃⠁';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('should handle empty string correctly', () => {
    const expectedOutput = 'a b';
    const input = '⠁ ⠃';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });

  
  test('should translate a phrase correctly', () => { //cdp16
    const expectedOutput = 'esta es una prueba';
    const input = '⠑⠎⠞⠁⠀⠑⠎⠀⠥⠝⠁⠀⠏⠗⠥⠑⠃⠁';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('should handle numbers correctly', () => {
    const expectedOutput = '1234567890';
    const input = '⠼⠁⠃⠉⠙⠑⠋⠛⠓⠊⠚';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('Should translate a phrase containing numbers correctly', () => { //cdp17
    const expectedOutput = '2003 fue un bonito año';
    const input = '⠼⠃⠚⠚⠉⠀⠋⠥⠑⠀⠥⠝⠀⠃⠕⠝⠊⠞⠕⠀⠁⠻⠕';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('should handle uppercase characters correctly', () => {
    const expectedOutput = 'Hola Juan';
    const input = '⠨⠓⠕⠇⠁ ⠨⠚⠥⠁⠝';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('should handle accented characters correctly', () => { //cdp18
    const expectedOutput = 'áéíóúüñ';
    const input = '⠷⠮⠌⠬⠾⠳⠻';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('Should translate a phrase containing accented letters correctly', () => {
    const expectedOutput = 'El niño comió la torta con alegría';
    const input = '⠨⠑⠇⠀⠝⠊⠻⠕⠀⠉⠕⠍⠊⠬⠀⠇⠁⠀⠞⠕⠗⠞⠁⠀⠉⠕⠝⠀⠁⠇⠑⠛⠗⠌⠁';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
  
  test('translating a question', () => {
    const expectedOutput = '¿A que hora nos vamos de aquí?';
    const input = '⠢⠠⠁⠀⠟⠥⠑⠀⠓⠕⠗⠁⠀⠝⠕⠎⠀⠧⠁⠍⠕⠎⠀⠙⠑⠀⠁⠟⠥⠌⠢';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });

  test('translating an exclamatory sentence', () => { //cdp19
    const expectedOutput = '¡No me grites!';
    const input = '⠖⠠⠝⠕⠀⠍⠑⠀⠛⠗⠊⠞⠑⠎⠖';
    expect(Braille.toText(input)).toBe(expectedOutput);
  });
});
