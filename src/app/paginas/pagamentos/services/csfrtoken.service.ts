import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CSRFTokenService {
  private CSRF_URL = 'http://localhost:8000/get_csrf_token/';

  constructor(private http: HttpClient) {}

  getCSRFToken(): Observable<any> {
    return this.http.get(this.CSRF_URL, { withCredentials: true });
  }

  getCSRFTokenFromCookies(): string | null {
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i].trim();
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  }
}
