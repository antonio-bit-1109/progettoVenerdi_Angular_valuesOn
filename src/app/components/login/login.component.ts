import { Component } from '@angular/core';
import { IDataUser } from '../../models/userData.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public notUserRegistered: boolean = false;
  public wrongCredentials: boolean = false;

  constructor(private router: Router) {}

  public onSubmit(form: any) {
    const nomeLogin = form.email;
    const passwordLogin = form.password;

    // se non esiste local storage, utente non si è registrato.
    // ERRORE: NON SEI REGISTRATO
    if (!localStorage.getItem('dataRegistration')) {
      this.notUserRegistered = true;
      this.resetBoolProp();
      return;
    }

    const dataUser: IDataUser = JSON.parse(
      localStorage.getItem('dataRegistration')
    );
    console.log(dataUser, 'data user');

    // se localstorage esiste ma i valori non corrispondono a quelli inseriti dall utente
    // ERRORE: CREDENZIALI SBAGLIATE.
    if (dataUser.nome !== nomeLogin || dataUser.password !== passwordLogin) {
      this.wrongCredentials = true;
      this.resetBoolProp();
      return;
    }

    // altrimenti corrispondono, posso redirect alla home
    this.router.navigateByUrl('home');
  }

  private resetBoolProp() {
    setTimeout(() => {
      this.notUserRegistered = false;
      this.wrongCredentials = false;
    }, 3000);
  }
}
