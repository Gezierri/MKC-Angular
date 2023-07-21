import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {Client} from '../../../model/client';
import {environment} from 'src/environments/environment';
import {Root} from '../../../model/root';
import { NGXLogger } from 'ngx-logger';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private endpoint = 'clients';
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  constructor(private http: HttpClient, private looger: NGXLogger) {
  }

  public listAll(page: number, listPerPage: number, direction: string, orderBy: string): Observable<Root> {
    let params = new HttpParams();

    params = params.append('page', String(page))
    params = params.append('listPerPage', String(listPerPage))
    params = params.append('direction', String(direction))
    params = params.append('orderBy', String(orderBy))

    return this.http
      .get<Client[]>(`${BASE_URL}/${this.endpoint}/page?${params}`)
      .pipe(
        tap(value => console.log(value)),
        tap(value => console.log(`${BASE_URL}/${this.endpoint}/page?${params}`)),
        catchError(this.handleError<Root>('listAll'))
      );
  }

  public save(client: Client): Observable<Client> {
    return this.http
      .post<Client>(`${BASE_URL}/${this.endpoint}`, client, this.httpOptions)
      .pipe(
        catchError(
          this.handleError<Client>('save')
        )
      );
  }

  public findClientByName(name: string): Observable<Client[]> {
    let params = new HttpParams();

    params = params.append('name', String(name));

    return this.http.get<Client[]>(`${BASE_URL}/${this.endpoint}?${params}`)
      .pipe(
        tap(value => console.log(value)),
        tap(value => console.log(`${BASE_URL}/${this.endpoint}?${params}`)),
        catchError(
          this.handleError<Client>('findClientByName')
        )
      );
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    console.log(result);
    //this.looger.log("deded")
    return (error: any): Observable<T> => {
      //this.looger.log("AASAS"  + error);
      console.log("AQUI");
      console.log(error);
      return of(result as T);
    };
  }
}
