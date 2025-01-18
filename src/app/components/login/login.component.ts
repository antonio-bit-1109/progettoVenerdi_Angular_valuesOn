import { Component, OnInit } from '@angular/core';
import { IDataLoginModal, IDataUser } from '../../models/userData.model';
import { Router } from '@angular/router';
import { ShowModalService } from '../../services/show-modal.service';
import { SfondoFetchService } from '../../services/sfondo-fetch.service';
import { ISource } from '../../models/PhotoModel.model';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  public notUserRegistered: boolean = false;
  public wrongCredentials: boolean = false;
  public photos: string | undefined = '';

  constructor(
    private router: Router,
    private modalService: ShowModalService,
    private sfondoFetchService: SfondoFetchService
  ) {}

  ngOnInit(): void {
    let word = this.getRandomWord();
    console.log(word);
    this.sfondoFetchService.getSfondoFromPexels(word).subscribe({
      next: (val) => {
        console.log(val);
        let random = Math.floor(Math.random() * val.photos.length);
        const objSources = val.photos;
        if (objSources.length === 0) {
          this.photos = '/assets/images/trasp-good.png';
        } else {
          this.photos = val.photos[random].src.landscape;
        }

        // this.photos = this.DefaultPhoto;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

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

  private getRandomWord() {
    let getFromVocali = true;
    let lengthWord = Math.floor(Math.random() * 6);
    const vocali: string[] = ['a', 'e', 'i', 'o', 'u'];

    let queryParam = '';

    //prettier-ignore
    const consonanti: string[] = [
      'b', 'c', 'd', 'f', 'g',  'l', 'm', 
      'n', 'p', 'q', 'r', 's', 't', 'v', 'z'
    ];

    for (let i = 0; i < lengthWord; i++) {
      if (getFromVocali) {
        queryParam += this.cicleIt(vocali);
        getFromVocali = false;
      } else {
        queryParam += this.cicleIt(consonanti);
        getFromVocali = true;
      }
    }

    return queryParam;
  }

  private cicleIt(arr: string[]) {
    const n = Math.floor(Math.random() * arr.length);

    for (let i = 0; i < arr.length; i++) {
      return arr[n];
    }

    return null;
  }
}
