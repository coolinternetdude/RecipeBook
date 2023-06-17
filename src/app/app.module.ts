import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { Dropdown } from './shared/dropdown.directive';
import { AppRoutingModule } from './app-routing-module';
import { AuthComponent } from './auth/auth.component';
import { LoadingSpinner } from './shared/loading-spinner/loading.component';
import { AuthInterceptor } from './auth/auth-interceptor.service';
import { AlertComponent } from './shared/alert/alert.component';
import { PlaceholderDirective } from './shared/placeholder/placeholder.directive';
import { RecipesModule } from './recipes/recipes.module';
import { ShoppingModule } from './shopping-list/shopping.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    Dropdown,
    PlaceholderDirective,
    AlertComponent,
    AuthComponent,
    LoadingSpinner,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RecipesModule,
    ShoppingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
