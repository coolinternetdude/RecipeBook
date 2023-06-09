import { Component, OnInit } from '@angular/core';
import { AuthStorageService } from './auth/auth-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthStorageService) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
