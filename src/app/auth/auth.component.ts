import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoginMode = true;
  @ViewChild('userForm') userForm: NgForm;
  switchModes() {
    this.isLoginMode = !this.isLoginMode;
  }
}
