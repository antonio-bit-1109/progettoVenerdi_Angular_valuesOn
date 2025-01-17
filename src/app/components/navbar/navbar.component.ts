import { Component, OnInit } from '@angular/core';
import { IDataUser } from '../../models/userData.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,

  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  public dataUser: IDataUser | undefined;

  constructor(private router: Router) {}

  ngOnInit(): void {
    // se nel local storage non sono presenti i dati dell utente redirect al login.
    if (
      !localStorage.getItem('dataRegistration') &&
      !localStorage.getItem('dataLogin')
    ) {
      console.error('il localstorage è vuoto!!!!');
      console.log('redirect alla login');
      this.router.navigateByUrl('login');
      return;
    }

    if (localStorage.getItem('dataRegistration')) {
      this.dataUser = JSON.parse(localStorage.getItem('dataRegistration'));
      // console.log('dati quando arrivo in home', this.dataUser);
    }

    if (localStorage.getItem('dataLogin')) {
      this.dataUser = JSON.parse(localStorage.getItem('dataLogin'));
    }
  }

  // quando faccio logout cancello dati dal localstorage
  // ma creo un altro oggetto nel local storage dal quale posso attingere per fare login e non per forza registrazione
  public logout() {
    // creo oggetto localstorage per login
    if (!localStorage.getItem('dataLogin')) {
      localStorage.setItem('dataLogin', JSON.stringify(this.dataUser));
    }

    // cancello data local storage per registrazione
    if (localStorage.getItem('dataRegistration')) {
      localStorage.removeItem('dataRegistration');
    }
    this.router.navigateByUrl('login');
  }
}
