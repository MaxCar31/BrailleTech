import annyang from 'annyang';

class VoiceInput {
  constructor(inputElementId, microphoneElementId) {
    this.inputElement = document.getElementById(inputElementId);
    this.microphoneElement = document.getElementById(microphoneElementId);
    this.commands = {
      '*text': (text) => {
        if (this.inputElement) {
          this.inputElement.value += ' ' + text;
        }
      }
    };

    if (annyang) {
      annyang.setLanguage('es-ES');  // Configurar el idioma a español
      annyang.addCommands(this.commands);
    } else {
      console.error("Este navegador no soporta reconocimiento de voz.");
    }
  }

  startListening() {
    if (annyang) {
      annyang.start({ autoRestart: true, continuous: true });
      if (this.microphoneElement) {
        this.microphoneElement.classList.add('recording');
      }
    }
  }

  stopListening() {
    if (annyang) {
      annyang.abort();
      if (this.microphoneElement) {
        this.microphoneElement.classList.remove('recording');
      }
    }
  }
}

export default VoiceInput;
