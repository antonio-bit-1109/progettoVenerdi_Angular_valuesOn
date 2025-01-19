import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

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

// validatore personalizzato per controllare che campo password uguale campo ripeti password

export function IsRipetiPswEqualPsw(): ValidatorFn {
  // psw: string,
  // ripetipsw: string
  return (control: AbstractControl): ValidationErrors | null => {
    // specifico da quale form group sto prendendo i dati
    const formGroup = control as FormGroup;
    const password = formGroup.controls['password'];
    const ripetiPassword = formGroup.controls['ripetiPassword'];

    if (!password || !ripetiPassword) {
      return null;
    }

    // se i valori di password e ripeti password sono uguali, non ci sono errori
    if (password.value === ripetiPassword.value) {
      ripetiPassword.setErrors(null);
    } else {
      // se i valori non sono uguali imposto errore.
      ripetiPassword.setErrors({ passwordDiverse: true });
    }
    return null;
  };
}
