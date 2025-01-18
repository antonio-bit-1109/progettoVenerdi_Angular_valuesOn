import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IPhotoJSON } from '../models/PhotoModel.model';
@Injectable({
  providedIn: 'root',
})
export class SfondoFetchService {
  private URL = 'https://api.pexels.com/v1/search?query=';
  private KEYPEXELS =
    '7Ye7PHnNDdVmd43T5cthTwaF0I2AipmjtizxjFtVcXnzQIgCqJYlTLXP';

  constructor(private http: HttpClient) {}

  // fa la fetch a pexels
  public getSfondoFromPexels(queryparam: string): Observable<IPhotoJSON> {
    const headers = new HttpHeaders({
      Authorization: `${this.KEYPEXELS}`,
    });

    return this.http.get<IPhotoJSON>(this.URL + queryparam, { headers });
  }
}
