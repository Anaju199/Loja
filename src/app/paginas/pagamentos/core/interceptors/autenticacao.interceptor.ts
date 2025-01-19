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

// @Injectable()
// export class AutenticacaoInterceptor implements HttpInterceptor {

//   constructor(private tokenService: TokenService) {}
//   private readonly API = environment.apiUrlPagSeguro;

//   intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
//     const isLoginRequest = request.url.includes('/login/');
//     const isApiRequest = request.url.includes(this.API);

//     if (isLoginRequest && this.tokenService.possuiToken()) {
//       const token = this.tokenService.retornarToken();
//       request = request.clone({
//         setHeaders: {
//           'accept': 'application/json',
//           'Authorization': `Bearer ${token}`,
//           'content-type': 'application/json'
//         }
//       });
//     }

//     if (isApiRequest && this.tokenService.possuiToken()) {
//       const token = this.tokenService.retornarTokenApi();
//       request = request.clone({
//         setHeaders: {
//           'accept': 'application/json',
//           'Authorization': `Bearer ${token}`,
//           'content-type': 'application/json'
//         }
//       });
//     }

//     console.log(request)

//     return next.handle(request);
//   }
// }

@Injectable()
export class AutenticacaoInterceptor implements HttpInterceptor {

  constructor(private tokenService: TokenService) {}


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const isNotPublicEndpoint = request.url.includes('/login/');

    if(this.tokenService.possuiToken() && isNotPublicEndpoint) {
      const token = this.tokenService.retornarToken();
      request = request.clone({
        setHeaders: {
          'Authorization': `Bearer ${token}`
        }
      })
    }
    return next.handle(request);
  }
}