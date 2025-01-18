import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDataUser } from '../../models/userData.model';
import { SfondoFetchService } from '../../services/sfondo-fetch.service';

@Component({
  selector: 'app-registrazione',
  standalone: false,

  templateUrl: './registrazione.component.html',
  styleUrl: './registrazione.component.scss',
})
export class RegistrazioneComponent implements OnInit {
  @ViewChild('radioUomo') radioUomo!: ElementRef;
  @ViewChild('radioDonna') radioDonna!: ElementRef;

  public photos: string | undefined = '';

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
  constructor(
    private router: Router,
    private sfondoFetchService: SfondoFetchService
  ) {}

  // lancio la fetch a pexels al montaggio del componente
  ngOnInit(): void {
    let word = this.getRandomWord();
    console.log(word);
    this.fetchImage(word);
  }

  // se la fetch non da un risultato 'photos' è un array vuoto ,
  //  rifaccio la fetch finchè non trovo un risultato valido
  private fetchImage(word: string) {
    this.sfondoFetchService.getSfondoFromPexels(word).subscribe({
      next: (val) => {
        console.log(val);
        let random = Math.floor(Math.random() * val.photos.length);
        const objSources = val.photos;
        if (objSources.length === 0) {
          let word = this.getRandomWord();
          this.fetchImage(word);
        } else {
          this.photos = val.photos[random].src.landscape;
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

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
