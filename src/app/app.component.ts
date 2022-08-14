import { Component } from '@angular/core';
import { Product } from './models/product.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  name = 'Tigui';
  age = 18;
  person = {
    name: 'Tigui',
    age: 18,
  };

  imgParent = 'https://picsum.photos/200';

  onLoaded(imgUrl: string) {
    console.log('LOG EN PADRE', imgUrl);
  }
}
