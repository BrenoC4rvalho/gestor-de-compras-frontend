import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateRequest } from '../types/CreateRequest';
import { Observable } from 'rxjs';
import { CreateUser } from '../types/CreateUser';
import { User } from '../types/User';
import { Request } from '../types/Request';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'http://localhost:8080'

  constructor(private http: HttpClient) { }

  createUser(user: CreateUser, token: String): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<void>(
      `${this.apiUrl}/admin/user`,
      user,
      { headers }
    )
  }

  getAllUsers(token: String): Observable<User[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User[]>(
      `${this.apiUrl}/admin/user`,
      { headers }
    )
  }

  recoveryUser(token: String): Observable<User> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(
      `${this.apiUrl}/recoveryUser`,
      { headers }
    )
  }

  createRequest(createRequest: CreateRequest, token: string): Observable<Request> {
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      return this.http.post<Request>(
        `${this.apiUrl}/request`, 
        createRequest, 
        { headers }
      )
  }

  getRequestById(id: number, token: string): Observable<Request> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Request>(
      `${this.apiUrl}/request/${id}`,
      { headers }
    )
  }

  updateRequest(id: number, requestUpdate: Request, token: string): Observable<Request> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<Request>(
      `${this.apiUrl}/request/${id}`,
      requestUpdate,
      { headers }
    )
  }

  deleteRequest(id: number, token: string): Observable<void> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.delete<void>(
      `${this.apiUrl}/request/${id}`,
      { headers }
    )
  }

  getAllRequests(token: string): Observable<Request[]> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Request[]>(
      `${this.apiUrl}/request`,
      { headers }
    )
  }


}
