import { Injectable } from '@angular/core';
import { ReplaySubject, Subject } from 'rxjs';
import { IDataLoginModal } from '../models/userData.model';

@Injectable({
  providedIn: 'root',
})
export class ShowModalService {
  constructor() {}

  public showModalLogin = new ReplaySubject<IDataLoginModal>();
}
