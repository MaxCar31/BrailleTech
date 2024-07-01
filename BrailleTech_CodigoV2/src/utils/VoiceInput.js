import annyang from 'annyang';

class VoiceInput {
  constructor(inputElementId, microphoneElementId) {
    this.inputElement = document.getElementById(inputElementId);
    this.microphoneElement = document.getElementById(microphoneElementId);
    this.commands = {
      '*text': (text) => {
        console.log('Texto reconocido:', text);  
        if (this.inputElement) {
          this.inputElement.value += ' ' + text;
        }
      }
    };

    if (annyang) {
      annyang.setLanguage('es-ES');
      annyang.addCommands(this.commands);
    } else {
      console.error("Este navegador no soporta reconocimiento de voz.");
    }
  }

  startListening() {
    if (annyang) {
      annyang.start({ autoRestart: true, continuous: true });
      console.log('Annyang listening started');  
      if (this.microphoneElement) {
        this.microphoneElement.classList.add('recording');
      }
    }
  }

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
