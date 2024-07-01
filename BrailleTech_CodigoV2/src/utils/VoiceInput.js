import annyang from 'annyang';

/**
 * Clase que maneja el reconocimiento de voz utilizando Annyang.
 */
class VoiceInput {
  /**
   * Crea una nueva instancia de VoiceInput.
   * @param {string} inputElementId - El ID del elemento de entrada de texto.
   * @param {string} microphoneElementId - El ID del elemento del micrófono.
   */
  constructor(inputElementId, microphoneElementId) {
    /**
     * Elemento de entrada de texto donde se insertará el texto reconocido.
     * @type {HTMLElement}
     */
    this.inputElement = document.getElementById(inputElementId);

    /**
     * Elemento del micrófono que activa el reconocimiento de voz.
     * @type {HTMLElement}
     */
    this.microphoneElement = document.getElementById(microphoneElementId);

    /**
     * Comandos de voz que serán reconocidos por Annyang.
     * @type {Object}
     */
    this.commands = {
      '*text': (text) => {
        console.log('Texto reconocido:', text);  
        if (this.inputElement) {
          this.inputElement.value += ' ' + text;
        }
      }
    };

    // Inicializar Annyang si está disponible
    if (annyang) {
      annyang.setLanguage('es-ES');
      annyang.addCommands(this.commands);
    } else {
      console.error("Este navegador no soporta reconocimiento de voz.");
    }
  }

  /**
   * Inicia el reconocimiento de voz.
   */
  startListening() {
    if (annyang) {
      annyang.start({ autoRestart: true, continuous: true });
      console.log('Annyang listening started');  
      if (this.microphoneElement) {
        this.microphoneElement.classList.add('recording');
      }
    }
  }

  /**
   * Detiene el reconocimiento de voz.
   */
  stopListening() {
    if (annyang) {
      annyang.abort();
      console.log('Annyang listening stopped'); 
      if (this.microphoneElement) {
        this.microphoneElement.classList.remove('recording');
      }
    }
  }
}

export { VoiceInput, annyang };
