import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthStorageService } from '../auth/auth-storage.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(
    private dataStorageService: DataStorageService,
    private authStorageService: AuthStorageService
  ) {}

  ngOnInit(): void {
    this.authStorageService.user.subscribe((user) => {
      if (user) this.currentUser = user;
      console.log(this.currentUser);
    });
  }

  saveData() {
    this.dataStorageService.storeRecipes();
  }

  fetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
