import { Component, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse, AuthStorageService } from './auth-storage.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  constructor(
    private authenticationService: AuthStorageService,
    private router: Router
  ) {}
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild('userForm') userForm: NgForm;

  switchModes() {
    this.isLoginMode = !this.isLoginMode;
  }

  authenticate(userForm: NgForm) {
    this.isLoading = true;

    // Creating an observable variable to hold our observables and we subscribe once instead of 2 times
    let observableAuth: Observable<AuthResponse>;

    if (this.isLoginMode) {
      observableAuth = this.authenticationService.logIn({
        ...userForm.value,
        returnSecureToken: true,
      });
    } else {
      observableAuth = this.authenticationService.signUp({
        ...userForm.value,
        returnSecureToken: true,
      });
      userForm.reset();
    }

    // adding basic logic to subscribe only once instead of twice since we can only login or signup
    observableAuth.subscribe({
      next: (userData) => {
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      error: (error) => {
        this.error = error;
        this.isLoading = false;
      },
    });
  }
}
