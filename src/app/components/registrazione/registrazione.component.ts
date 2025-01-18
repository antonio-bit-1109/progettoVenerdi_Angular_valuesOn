import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDataUser } from '../../models/userData.model';

@Component({
  selector: 'app-registrazione',
  standalone: false,

  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.scss',
})
export class RegistrazioneComponent {
  @ViewChild('radioUomo') radioUomo!: ElementRef;
  @ViewChild('radioDonna') radioDonna!: ElementRef;

  public form = new FormGroup({
    nome: new FormControl('', [Validators.required]),
    cognome: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
    ripetiPassword: new FormControl('', [Validators.required]),
    IsUomoRadio: new FormControl(null, [Validators.required]),
    accetto: new FormControl(false, [Validators.required]),
  });

  //costrutt
  constructor(private router: Router) {}

  // metodi
  public onSubmit() {
    // console.log(this.form.value);

    if (this.getIfFormIsValid()) {
      const dataUser: IDataUser = {
        nome: this.form.controls.nome.value,
        cognome: this.form.controls.cognome.value,
        password: this.form.controls.password.value,
        email: this.form.controls.email.value,
        isUomo: this.form.controls.IsUomoRadio.value,
      };

      // se form valido salvo i dati utente in local storage e redirect alla login
      localStorage.setItem('dataRegistration', JSON.stringify(dataUser));
      this.router.navigateByUrl('login');
    } else {
      console.error('form non valido. impossibile inviare dati.');
    }
  }

  public getIfFormIsValid() {
    return this.form.valid;
  }

  public setSesso(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    console.log('Sesso selezionato:', inputElement.value);

    if (inputElement.name === 'radioUomo') {
      this.radioUomo.nativeElement.checked = true;
      this.radioDonna.nativeElement.checked = false;
      this.form.controls.IsUomoRadio.setValue(true);
    } else if (inputElement.name === 'radioDonna') {
      this.radioDonna.nativeElement.checked = true;
      this.radioUomo.nativeElement.checked = false;
      this.form.controls.IsUomoRadio.setValue(false);
    }
  }
}
