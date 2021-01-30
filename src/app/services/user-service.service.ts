import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  // END POINT
  private API_END_POINT: string = 'http://64.227.81.127:8000/api';
  
  // CRUD URLS
  private getAllUsersUrl: string;
  private getUserURL: string;
  private createUserUrl: string;
  private deleteUserUrl: string;
  private editUserUrl: string;

  constructor(private httpClient: HttpClient) { 

      this.getAllUsersUrl = this.API_END_POINT + '/all'
      this.getUserURL = this.API_END_POINT + '/get';
      this.createUserUrl = this.API_END_POINT + '/create';
      this.deleteUserUrl = this.API_END_POINT + '/delete';
      this.editUserUrl = this.API_END_POINT + '/edit';

  
  }

  getAllUsersService(): Observable<Object> {
      return this.httpClient.get(this.getAllUsersUrl, {responseType: 'json'})
  }

  getUserService(formData: FormData): Observable<Object> {
      return this.httpClient.post(this.getUserURL, formData, {responseType: 'json'}); 
  }

  createUserService(formData: FormData): Observable<Object> {
      return this.httpClient.post(this.createUserUrl, formData, {responseType: 'json'});
  }

  deleteUserService(formData: FormData): Observable<Object> {
      return this.httpClient.post(this.deleteUserUrl, formData, {responseType: 'json'});
  }
  
  editUserService(formData: FormData): Observable<Object> {
      return this.httpClient.post(this.editUserUrl, formData, {responseType: 'json'});
  }


  // Ejemplo metodo post para registro

  registro(e): void {

    let email = 'testuser@gmail.com';
    let password = "test1235pass";
    
    let formData: FormData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    this.httpClient.post('http://localhost/api/login', formData, {responseType: 'json'})
    .subscribe(
        response => {
          alert('Usuario registrado con exito');
          window.location.href = '/home';
        },
        error => {
          alert('Ha ocurrido un error');
        }
    )
  }
  
}
