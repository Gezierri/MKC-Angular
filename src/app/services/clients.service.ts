import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable, catchError, of} from 'rxjs';
import {Client} from '../model/client';
import {environment} from 'src/environments/environment';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private endpoint = 'clients';

  constructor(private http: HttpClient) {
  }

  public listAll(name?: string): Observable<Client[]> {
    let filterName: string = '';
    if (name) {
      filterName = `?name=${encodeURIComponent(name)}`
    }
    return this.http
      .get<Client[]>(`${BASE_URL}/${this.endpoint}${filterName}`)
      .pipe(catchError(this.handleError<Client>('listAll')));
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
