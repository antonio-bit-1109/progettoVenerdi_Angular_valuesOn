import { Component } from '@angular/core';
import { IDataLoginModal, IDataUser } from '../../models/userData.model';
import { Router } from '@angular/router';
import { ShowModalService } from '../../services/show-modal.service';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  public notUserRegistered: boolean = false;
  public wrongCredentials: boolean = false;

  constructor(private router: Router, private modalService: ShowModalService) {}

  public onSubmit(form: any) {
    const emailLogin = form.email;
    const passwordLogin = form.password;

    // al momento del login
    // se esiste un oggetto in local storage con chiave 'dataLogin'
    // e corrisponde ai dati inseriti dall utente faccio fare login
    if (localStorage.getItem('dataLogin')) {
      const data: IDataUser = JSON.parse(localStorage.getItem('dataLogin'));

      if (data.email === emailLogin && data.password === passwordLogin) {
        this.router.navigateByUrl('home');
        this.FillReplaySubjectModal(true, data.nome);
        return;
      } else {
        this.wrongCredentials = true;
        this.resetBoolProp();
        return;
      }
    }

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
    if (dataUser.email !== emailLogin || dataUser.password !== passwordLogin) {
      this.wrongCredentials = true;
      this.resetBoolProp();
      return;
    }

    // altrimenti corrispondono, posso redirect alla home
    this.router.navigateByUrl('home');
    this.FillReplaySubjectModal(true, dataUser.nome);
  }

  private resetBoolProp() {
    setTimeout(() => {
      this.notUserRegistered = false;
      this.wrongCredentials = false;
    }, 3000);
  }

  // metodo per chiamare al servizio e immettere un booleano nel subject
  //  predisposto alla visualizzazione
  // del modale in home, una volta fatto redirect
  private FillReplaySubjectModal(value: boolean, nome: string) {
    const data: IDataLoginModal = {
      isVisible: value,
      name: nome,
    };

    this.modalService.showModalLogin.next(data);
  }
}
