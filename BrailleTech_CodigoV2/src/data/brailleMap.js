/**
 * @fileoverview Este módulo proporciona un mapa de caracteres a su representación en Braille.
 */

/**
 * Objeto que mapea caracteres a su representación en Braille.
 * @type {Object.<string, string>}
 */
const brailleMap = {
    'a': '⠁', 'b': '⠃', 'c': '⠉', 'd': '⠙', 'e': '⠑',
    'f': '⠋', 'g': '⠛', 'h': '⠓', 'i': '⠊', 'j': '⠚',
    'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'ñ': '⠻',
    'o': '⠕', 'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 
    't': '⠞', 'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭',
    'y': '⠽', 'z': '⠵',
    'á': '⠷', 'é': '⠮', 'í': '⠌', 'ó': '⠬', 'ú': '⠾', 'ü': '⠳',

    'A': '⠨⠁', 'B': '⠨⠃', 'C': '⠨⠉', 'D': '⠨⠙', 'E': '⠨⠑',
    'F': '⠨⠋', 'G': '⠨⠛', 'H': '⠨⠓', 'I': '⠨⠊', 'J': '⠨⠚',
    'K': '⠨⠅', 'L': '⠨⠇', 'M': '⠨⠍', 'N': '⠨⠝', 'Ñ': '⠨⠻',
    'O': '⠨⠕', 'P': '⠨⠏', 'Q': '⠨⠟', 'R': '⠨⠗', 'S': '⠨⠎', 
    'T': '⠨⠞', 'U': '⠨⠥', 'V': '⠨⠧', 'W': '⠨⠺', 'X': '⠨⠭', 
    'Y': '⠨⠽', 'Z': '⠨⠵',
    'Á': '⠨⠷', 'É': '⠨⠮', 'Í': '⠨⠌', 'Ó': '⠨⠬', 'Ú': '⠨⠾', 'Ü': '⠨⠳',

    ' ': '⠀', '.': '⠄', ',': '⠂', ';': '⠆', ':': '⠒', '...': '⠄⠄⠄',
    '¿': '⠢', '?': '⠢', '¡': '⠖', '!': '⠖', '"': '⠦', '(': '⠣', ')': '⠜','#': '⠼',
   
    '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑',
    '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '0': '⠚',
    
    //more symbols specials-signos auxiliares
    '*': '⠔','-': '⠤','×': '⠦', '=': '⠶','©': '⠣⠨⠉⠜', '@': '⠐', 
    '§': '⠬', 'Bs': '⠸⠃⠎',

};
/*

    '[': '⠷', ']': '⠾', '{': '⠐⠇', '}': '⠸⠂', '-': '⠤', '—': '⠤⠤',
    '*': '⠔', '\'': '⠄', '/': '⠠⠂', '//': '⠠⠢⠂', '\\': '⠐⠄', '\\\\': '⠐⠔⠄',
    '<': '⠐⠅', '>': '⠨⠂', '|': '⠸ ', '||': '⠸⠇', '‒': '⠒⠒',


    '+': '⠖', '-': '⠤', '±': '⠖⠒⠤', '×': '⠦', '÷': '⠐⠂', '=': '⠶',
    '%': '⠸⠴', '‰': '⠸⠴⠴', '©': '⠣⠨⠉⠜', '&': '⠠⠯', '@': '⠐',
    
    '§': '⠬', 

    '€': '⠸⠑', '$': '⠸⠎', 'Bs': '⠸⠃⠎', '₡': '⠸⠉', 'R$': '⠸⠗', 
    'DM': '⠸⠍', '¥': '⠸⠽', '₿': '⠸⠃', '¢': '⠘⠉', '£': '⠐⠮',
*/

/*por implementar:
    1. abrir y cerrar comillas interiores ‘’ <>: 6-236
    2. no están en el pdf: '`': '⠘⠔', '~': '⠰⠴', '^': '⠈⠮',
    3. asterisco con significado de incorrecto, supuesto o reconstruido: 256
    4. lógica para apóstrofe ' y lógica de número con mas de 3 cifras con espaciado
    5. signo de multiplicar (punto): 6-0d
    6. lógica de párrafos?
    6. los demás símbolos de operaciones aritméticas (uso frecuente) y la moneda: peso
 por corregir:
    1. no reconoce //, \\, ||
    2. barra vertical simple: 456-0d
*/


export default brailleMap;

