import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

const END_POINT = 'http://localhost:8080/cancion/';

@Injectable()
export class CancionesService {

  constructor(private http: HttpClient) {
    console.log('CancionesService constructor');
   }



  getAll(): Observable<any>{
    let url = END_POINT;
    console.log(`CancionesService getAll ${url}`);    
    return this.http.get(url);
  } 

  delete(id: number): Observable<any>{
    let url = END_POINT + id;
    console.log(`CancionesService delete ${url}`);    
    return this.http.delete(url);
  } 

}