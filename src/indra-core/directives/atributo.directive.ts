import { Directive, Input, Output, HostListener, EventEmitter, HostBinding, OnInit } from '@angular/core';

// tslint:disable-next-line:directive-selector
@Directive({  selector: '[indraWinConfirm]' })
export class WindowConfirmDirective implements OnInit {
  // tslint:disable-next-line:no-input-rename
  @Input('indraWinConfirmMessage') winConfirmMessage = '¿Seguro?';
  // tslint:disable-next-line:no-output-rename
  @Output('indraWinConfirm') winConfirm: EventEmitter<any> = new EventEmitter();
  @HostBinding('class.pressed') isPressed: boolean = false;

  @HostListener('click', ['$event'])
  confirmFirst() {
    if (window.confirm(this.winConfirmMessage)) {
      this.winConfirm.emit(null);
    }
  }
  @HostListener('mousedown') hasPressed() {
    this.isPressed = true;
  }
  @HostListener('mouseup') hasReleased() {
    this.isPressed = false;
  }
  ngOnInit(): void {
   console.log('indraWinConfirm');
  }

}
// tslint:disable-next-line:directive-selector
@Directive({  selector: '[indraShow]' })
export class ShowDirective {
  @HostBinding('hidden') hidden: boolean = false;
  @Input('indraShow') set show(value: boolean) { this.hidden = !value; }
}
