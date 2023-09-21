import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {Client} from '../../../model/client/client';
import {environment} from 'src/environments/environment';
import {ClientPage} from '../../../model/client/clientPage';
import {NGXLogger} from 'ngx-logger';
import {Schedule} from "../../../app.component";

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root',
})
export class ClientsService {
  private endpoint = 'clients';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  constructor(private http: HttpClient, private logger: NGXLogger) {
  }

  public listAll(page: number, listPerPage: number, direction: string, orderBy: string): Observable<ClientPage> {
    let params = new HttpParams();

    params = params.append('page', String(page))
    params = params.append('listPerPage', String(listPerPage))
    params = params.append('direction', String(direction))
    params = params.append('orderBy', String(orderBy))

    const url = `${BASE_URL}/${this.endpoint}/page?${params}`;

    return this.http
      .get<Client[]>(url)
      .pipe(
        tap(value => console.log(value)),
        tap(value => console.log(`${BASE_URL}/${this.endpoint}/page?${params}`)),
        catchError(this.handleError<ClientPage>('listAll'))
      );
  }

  public findClientByName(name: string): Observable<Client[]> {
    let params = new HttpParams();

    params = params.append('name', String(name));

    const url = `${BASE_URL}/${this.endpoint}?${params}`;

    return this.http.get<Client[]>(url)
      .pipe(
        tap(value => console.log(value)),
        tap(value => console.log(`${BASE_URL}/${this.endpoint}?${params}`)),
        catchError(
          this.handleError<Client>('findClientByName'),
        )
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

  public update(client: Client): Observable<Client> {
    const url = `${BASE_URL}/${this.endpoint}/${client.id}`;
    return this.http.put<Client>(url, client, this.httpOptions)
      .pipe(
        catchError(this.handleError<Client>('update')
        )
      );
  }

  public findById(id: number): Observable<Client> {
    const url = `${BASE_URL}/${this.endpoint}/${id}`;
    return this.http.get<Client>(url)
      .pipe(
        catchError(this.handleError<Client>('findById')
        )
      );
  }

  public delete(id: number): Observable<Client> {
    const url = `${BASE_URL}/${this.endpoint}/${id}`;

    return this.http.delete<Client>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Client>('delete')
        )
      );
  }

  public saveSchedule(schedule: Schedule): Observable<Schedule> {
    console.log(schedule);
    console.log("http://localhost:9000/schedules");
    return this.http.post<Schedule>("http://localhost:9000/schedules", schedule, this.httpOptions).pipe(
      tap(
        () => console.log(schedule),
      ),
      catchError(
        this.handleError<Schedule>('save', schedule)
      )
    );
  }

  private handleError<T>(operation: string, result?: T): any {
    console.log('ERROR' + operation, result)
    return (error: any): Observable<T> => {
      console.log('ERROR' + error)
      this.logger.log("ERROR " + error);
      return of(result as T);
    };
  }
}
