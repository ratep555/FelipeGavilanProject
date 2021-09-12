import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationResponse, UserCredentials, UserDTO } from './security.models';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) { }

  private apiURL = environment.apiURL + '/accounts';
  private readonly tokenKey: string = 'token';
  private readonly expirationTokenKey: string = 'token-expiration';
  private readonly roleField = 'role';

  isAuthenticated(): boolean{
    const token = localStorage.getItem(this.tokenKey);
    if (!token){
      // if there is no token, the user is not loggedin
      return false;
    }
    const expiration = localStorage.getItem(this.expirationTokenKey);
    const expirationDate = new Date(expiration);
    // if the token has expired, if it is less then today
    if (expirationDate <= new Date()){
      // then we want to remove token
      this.logout();
      return false;
    }
    return true;
  }
  // we are returning observable of any because we need to paginate
  getUsers(page: number, recordsPerPage: number): Observable<any>{
    let params = new HttpParams();
    params = params.append('page', page.toString());
    params = params.append('recordsPerPage', recordsPerPage.toString());
    return this.http.get<UserDTO[]>(`${this.apiURL}/listusers`, {observe: 'response', params});
  }

  makeAdmin(userId: string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(`${this.apiURL}/makeadmin`, JSON.stringify(userId), {headers});
  }

  removeAdmin(userId: string){
    const headers = new HttpHeaders('Content-Type: application/json');
    return this.http.post(`${this.apiURL}/removeadmin`, JSON.stringify(userId), {headers});
  }

  // sa ovim izvlačiš podatke iz tokena, recimo u menu prikazuješ mail koji dolazi iz API (BuildToken metoda)
  getFieldFromJWT(field: string): string {
    const token = localStorage.getItem(this.tokenKey);
    if (!token){return ''; }
    // we are parsing the data of the token
    // we are getting the second part of the token, [1], token ima tri dijela sjeti se!
    // the second part of the token is payload where the claims are
    // atob is decoding string
    const dataToken = JSON.parse(atob(token.split('.')[1]));
    return dataToken[field];
  }


  logout(){
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.expirationTokenKey);
  }


  getRole(): string {
    return this.getFieldFromJWT(this.roleField);
  }

  register(userCredentials: UserCredentials): Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(this.apiURL + '/create', userCredentials);
  }

  saveToken(authenticationResponse: AuthenticationResponse){
    localStorage.setItem(this.tokenKey, authenticationResponse.token);
    localStorage.setItem(this.expirationTokenKey, authenticationResponse.expiration.toString());
  }

  login(userCredentials: UserCredentials): Observable<AuthenticationResponse>{
    return this.http.post<AuthenticationResponse>(this.apiURL + '/login', userCredentials);
  }

  getToken(){
    return localStorage.getItem(this.tokenKey);
  }
}
