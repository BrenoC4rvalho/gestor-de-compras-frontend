import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private  apiUrl = 'http://localhost:8080'
  private currentUserSubject = new BehaviorSubject<any>(null)
  public currentUser$ = this.currentUserSubject.asObservable() 

  constructor(private http: HttpClient, private router: Router) { }
  
  login(credentials: { name: string; password: string}) {
    return this.http.post(`http://127.0.0.1:8080/signin`, credentials).pipe(
      map((response: any) => {
        console.log(response)
        if(response && response.Token) {
          localStorage.setItem('jwtToken', response.Token)
          this.currentUserSubject.next(response.user)
        }
        return response
      })
    )
  }

  logout() {
    localStorage.removeItem('jwtToken')
    this.currentUserSubject.next(null)
    this.router.navigate(['/'])
  }

  getToken() {
    return localStorage.getItem('jwtToken')
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

}
