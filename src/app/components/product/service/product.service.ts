import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {catchError, Observable, of, tap} from "rxjs";
import {Product} from "../../../model/product/product";
import {environment} from "../../../../environments/environment";
import {ProductPage} from "../../../model/product/productPage";

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  private endpoint = 'products';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'}),
  };

  public listAll(page: number, listPerPage: number, direction: string, orderBy: string): Observable<ProductPage> {
    let params = new HttpParams();

    params = params.append('page', String(page))
    params = params.append('listPerPage', String(listPerPage))
    params = params.append('direction', String(direction))
    params = params.append('orderBy', String(orderBy))

    const url = `${BASE_URL}/${this.endpoint}/page?${params}`;

    return this.http
      .get<Product[]>(url)
      .pipe(
        tap(value => console.log(value)),
        tap(value => console.log(`${BASE_URL}/${this.endpoint}/page?${params}`)),
        catchError(this.handleError<ProductPage>('listAll'))
      );
  }

  public save(Product: Product): Observable<Product> {
    return this.http
      .post<Product>(`${BASE_URL}/${this.endpoint}`, Product, this.httpOptions)
      .pipe(
        catchError(
          this.handleError<Product>('save')
        )
      );
  }

  public findProductByName(name: string): Observable<Product[]> {
    let params = new HttpParams();

    params = params.append('name', String(name));

    const url = `${BASE_URL}/${this.endpoint}?${params}`;

    return this.http.get<Product[]>(url)
      .pipe(
        tap(value => console.log(value)),
        tap(value => console.log(`${BASE_URL}/${this.endpoint}?${params}`)),
        catchError(
          this.handleError<Product>('findProductByName')
        )
      );
  }

  public update(Product: Product): Observable<Product> {
    const url = `${BASE_URL}/${this.endpoint}/${Product.id}`;
    return this.http.put<Product>(url, Product, this.httpOptions)
      .pipe(
        catchError(this.handleError<Product>('update')
        )
      );
  }

  public findById(id: number): Observable<Product> {
    const url = `${BASE_URL}/${this.endpoint}/${id}`;
    return this.http.get<Product>(url)
      .pipe(
        catchError(this.handleError<Product>('findById')
        )
      );
  }

  public delete(id: number): Observable<Product> {
    const url = `${BASE_URL}/${this.endpoint}/${id}`;

    return this.http.delete<Product>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<Product>('delete')
        )
      );
  }

  private handleError<T>(operation: string, result?: T): any {
    return (error: any): Observable<T> => {
      return of(result as T);
    };
  }
}
