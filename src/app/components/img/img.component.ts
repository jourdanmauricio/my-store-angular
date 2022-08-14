import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss'],
})
export class ImgComponent {
  @Input() img: string = '';
  @Output() loaded = new EventEmitter<string>();

  imgDefault: string = './assets/images/default.png';

  constructor() {}

  // ngOnInit(): void {}

  // imgError() {
  //   this.img = this.imgDefault
  // }

  // imgLoaded() {
  //   console.log("LOG EN Hijo")
  //   this.loaded.emit(this.img);
  // }
}
