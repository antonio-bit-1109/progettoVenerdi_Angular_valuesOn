import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// validatore personalizzato per il campo accetto del form
// questa funzione implementa interfaccia validatorFn e restituire un errore se
// la validazione fallisce , mentre null se la validazione ha successo.

export function campoAccettoMustBeTrue(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    // scrivo quale sia la logica di validazione.
    // se il valore è vuoto non applico la validazione
    if (value === '') {
      return null;
    }
    // se la validazione va a buon fine torno null
    // altrimenti ritorno un ValidationError
    if (value === true) {
      return null;
    }

    return { CampoAccettoNotChecked: true };
  };
}
