import { NgModule } from '@angular/core';
import { Dropdown } from './dropdown.directive';
import { LoadingSpinner } from './loading-spinner/loading.component';
import { PlaceholderDirective } from './placeholder/placeholder.directive';
import { AlertComponent } from './alert/alert.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    Dropdown,
    LoadingSpinner,
    PlaceholderDirective,
    AlertComponent,
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    Dropdown,
    LoadingSpinner,
    AlertComponent,
    PlaceholderDirective,
  ],
  entryComponents: [AlertComponent],
})
export class SharedModule {}
