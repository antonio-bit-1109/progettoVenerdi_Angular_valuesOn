import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public userRegistered: boolean = false;
  public wrongCredentials: boolean = false;

  public onSubmit(form: any) {
    const nomeLogin = form.email;
    const passwordLogin = form.password;

    if (!localStorage.getItem('dataRegistration')) {
      this.userRegistered = false;
    }
    // localStorage.getItem()
  }
}
