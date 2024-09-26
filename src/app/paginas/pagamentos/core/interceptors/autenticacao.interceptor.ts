import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenService } from '../../services/token.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}
  private readonly API = environment.apiUrlPagSeguro;

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isLoginRequest = request.url.includes('/login/');
    const isApiRequest = request.url.includes(this.API);

    if (isLoginRequest && this.tokenService.possuiToken()) {
      const token = this.tokenService.retornarToken();
      request = request.clone({
        setHeaders: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'content-type': 'application/json'
        }
      });
    }

    if (isApiRequest && this.tokenService.possuiToken()) {
      const token = this.tokenService.retornarTokenApi();
      request = request.clone({
        setHeaders: {
          'accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'content-type': 'application/json'
        }
      });
    }

    return next.handle(request);
  }
}
