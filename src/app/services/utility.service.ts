import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  // metodo che genera una parola casuale formata da vocale + consonante, di lunghezza 'lengthWord'
  public getRandomWord() {
    let getFromVocali = true;
    let lengthWord = Math.floor(Math.random() * 6) + 1;
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
