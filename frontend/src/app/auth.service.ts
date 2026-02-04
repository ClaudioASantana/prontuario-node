import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { LoginDto, AuthResponseDto } from './models/auth.models';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/v1/auth'; // Adjust if environment config exists
  private tokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';

  private currentUserRoleSubject = new BehaviorSubject<string | null>(null);
  public currentUserRole$ = this.currentUserRoleSubject.asObservable();

  constructor(private http: HttpClient) {
    this.loadUserRoleFromToken();
  }

  login(credentials: LoginDto): Observable<AuthResponseDto> {
    return this.http.post<AuthResponseDto>(`${this.apiUrl}/login`, credentials).pipe(
      tap((response) => {
        this.saveTokens(response);
        this.decodeAndNotify(response.accessToken);
      }),
    );
  }

  register(user: any): Observable<any> {
    // apiUrl is .../auth, but registration is at .../users
    // We can assume apiUrl is 'http://localhost:3000/api/v1/auth'
    // So we need 'http://localhost:3000/api/v1/users'
    const usersUrl = this.apiUrl.replace('/auth', '/users');
    return this.http.post(usersUrl, user);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    this.currentUserRoleSubject.next(null);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private saveTokens(response: AuthResponseDto): void {
    localStorage.setItem(this.tokenKey, response.accessToken);
    localStorage.setItem(this.refreshTokenKey, response.refreshToken);
  }

  private loadUserRoleFromToken(): void {
    const token = this.getToken();
    if (token) {
      this.decodeAndNotify(token);
    }
  }

  private decodeAndNotify(token: string): void {
    try {
      const decoded: any = jwtDecode(token);
      // Backend TokenPayload: roles: string[]
      const role = decoded.roles && decoded.roles.length > 0 ? decoded.roles[0] : null;
      this.currentUserRoleSubject.next(role);
    } catch (error) {
      console.error('Error decoding token', error);
      this.currentUserRoleSubject.next(null);
    }
  }
}
