import { Directive, OnInit, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]',
})
export class PlaceholderDirective implements OnInit {
  constructor(public viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    console.log(this.viewContainerRef);
  }
}
