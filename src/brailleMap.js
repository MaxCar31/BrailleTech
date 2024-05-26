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
    'k': '⠅', 'l': '⠇', 'm': '⠍', 'n': '⠝', 'o': '⠕',
    'p': '⠏', 'q': '⠟', 'r': '⠗', 's': '⠎', 't': '⠞',
    'u': '⠥', 'v': '⠧', 'w': '⠺', 'x': '⠭', 'y': '⠽', 'z': '⠵',
    'á': '⠷', 'é': '⠿', 'í': '⠮', 'ó': '⠬', 'ú': '⠾', 'ü': '⠳', 'ñ': '⠻',
    'A': '⠠⠁', 'B': '⠠⠃', 'C': '⠠⠉', 'D': '⠠⠙', 'E': '⠠⠑',
    'F': '⠠⠋', 'G': '⠠⠛', 'H': '⠠⠓', 'I': '⠠⠊', 'J': '⠠⠚',
    'K': '⠠⠅', 'L': '⠠⠇', 'M': '⠠⠍', 'N': '⠠⠝', 'O': '⠠⠕',
    'P': '⠠⠏', 'Q': '⠠⠟', 'R': '⠠⠗', 'S': '⠠⠎', 'T': '⠠⠞',
    'U': '⠠⠥', 'V': '⠠⠧', 'W': '⠠⠺', 'X': '⠠⠭', 'Y': '⠠⠽', 'Z': '⠠⠵',
    'Á': '⠠⠷', 'É': '⠠⠿', 'Í': '⠠⠮', 'Ó': '⠠⠬', 'Ú': '⠠⠾',
    'Ü': '⠠⠳', 'Ñ': '⠠⠻',
    ' ': '⠀', '!': '⠖', '¡': '⠮', '?': '⠹', '¿': '⠢',
    ',': '⠂', ';': '⠆', ':': '⠒', '.': '⠲', '-': '⠤', '—': '⠤',
    '(': '⠶', ')': '⠶', '"': '⠦', '\'': '⠴', '/': '⠌', '@': '⠈',
    '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑',
    '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '0': '⠚',
    '%': '⠸⠢', 
    '$': '⠸⠂',
    '€': '⠈⠑', '¢': '⠈⠙', '£': '⠈⠃', '¥': '⠈⠋',
    '§': '⠰⠂', '&': '⠈⠅', '*': '⠔', '^': '⠈⠮', '+': '⠤⠤', '=': '⠶',
    '<': '⠜', '>': '⠘', '[': '⠦', ']': '⠴', '{': '⠐⠦', '}': '⠐⠴',
    '`': '⠘⠔', '~': '⠰⠴', '\\': '⠸⠌⠂', '|': '⠸⠌⠶',
};

export default brailleMap;

