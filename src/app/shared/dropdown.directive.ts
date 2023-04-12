import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Renderer2,
} from '@angular/core';
@Directive({
  selector: '[appDropdown]',
})
export class Dropdown {
  @HostBinding('class.open') toggle: boolean = false;
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.toggle = this.element.nativeElement.contains(event.target)
      ? !this.toggle
      : false;
    // if (!this.toggle) {
    //   this.render.addClass(this.element.nativeElement, 'open');
    //   this.toggle = true;
    // } else {
    //   this.render.removeClass(this.element.nativeElement, 'open');
    //   this.toggle = false;
    // }
  }
  constructor(private element: ElementRef) {}
}
