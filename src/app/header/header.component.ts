import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthStorageService } from '../auth/auth-storage.service';
import { User } from '../auth/user.model';
import { Store } from '@ngrx/store';
import { map } from 'rxjs';
import * as appStore from '../store/app.reducer';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(
    private dataStorageService: DataStorageService,
    private authStorageService: AuthStorageService,
    private store: Store<appStore.AppState>
  ) {}

  ngOnInit(): void {
    this.store
      .select('auth')
      .pipe(
        map((authState) => {
          return authState.user;
        })
      )
      .subscribe((user) => {
        if (user) this.currentUser = user;
        console.log(this.currentUser);
      });
  }

  saveData() {
    this.dataStorageService.storeRecipes();
  }

  loggingOut() {
    this.currentUser = null;
    this.authStorageService.logOut();
  }

  fetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
