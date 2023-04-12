import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  defaultFeature: string = 'recipe';
  onNavigate(feature: string) {
    this.defaultFeature = feature;
  }
}
