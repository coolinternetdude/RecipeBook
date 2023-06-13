import { Component, OnDestroy, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponse, AuthStorageService } from './auth-storage.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnDestroy {
  @ViewChild(PlaceholderDirective) placeholderHost: PlaceholderDirective;
  constructor(
    private authenticationService: AuthStorageService,
    private router: Router
  ) {}
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild('userForm') userForm: NgForm;
  private subscription: Subscription;

  switchModes() {
    this.isLoginMode = !this.isLoginMode;
  }

  onCloseModal() {
    this.error = null;
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
        this.showError(error);
        this.isLoading = false;
      },
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  private showError(errorMessage: string) {
    const viewContainerRef = this.placeholderHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(AlertComponent);
    componentRef.instance.message = errorMessage;
    this.subscription = componentRef.instance.close.subscribe(() => {
      this.subscription.unsubscribe();
      componentRef.destroy();
    });
  }
}
