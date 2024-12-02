import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const token = this.authService.getToken
        if(token) {
            req = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            })
        }
        return next.handle(req)
    }
}