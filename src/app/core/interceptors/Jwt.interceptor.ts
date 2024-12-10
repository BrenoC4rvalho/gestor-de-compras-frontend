import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { catchError, Observable, throwError } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        console.log('intercept')
        const token = this.authService.getToken()
        if(token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
        }

        

        return next.handle(req).pipe(
            catchError((error) => {
                console.log('entro aqui')
                if(error.status === 401 || error.status === 403) {
                    this.authService.logout()
                }
                return throwError(() => new Error(error))
            })
        )
    }
}


