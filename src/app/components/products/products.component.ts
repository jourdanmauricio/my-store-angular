import { Component, Input, EventEmitter, Output } from '@angular/core';
import {
  Product,
  createProductDto,
  updateProductDto,
} from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  @Input() products: Product[] = [];

  @Output() loadMore: EventEmitter<string> = new EventEmitter<string>();

  myShoppingCart: Product[] = [];
  total = 0;
  showProductDetail = false;
  productChosen!: Product;
  statusDetail: 'loading' | 'success' | 'error' | 'init' = 'init';

  constructor(
    private storeService: StoreService,
    private productsService: ProductsService
  ) {
    this.myShoppingCart = this.storeService.getMyShoppingCart();
  }

  onLoadMore() {
    this.loadMore.emit();
  }

  onAddToShoppingCart(product: Product) {
    this.storeService.addProduct(product);
    this.total = this.storeService.getTotal();
  }

  toggleProductDetail() {
    this.showProductDetail = !this.showProductDetail;
  }

  onShowDetail(id: string) {
    this.statusDetail = 'loading';
    this.toggleProductDetail();
    // this.productsService.getProduct(id).subscribe(
    //   (data) => {
    //     this.productChosen = data;
    //     this.statusDetail = 'success';
    //   },
    //   (errorMsg) => {
    //     window.alert(errorMsg);
    //     console.error(errorMsg);
    //     this.statusDetail = 'error';
    //   }
    // );
    this.productsService.getProduct(id).subscribe({
      next: (data) => {
        this.productChosen = data;
        this.statusDetail = 'success';
      },
      error: (errorMsg) => {
        window.alert(errorMsg);
        console.error(errorMsg);
        this.statusDetail = 'error';
      },
    });
  }

  createNewProduct() {
    const product: createProductDto = {
      title: 'Nuevo producto',
      description: 'Descripción bla bla bla',
      images: [`https://placeimg.com/640/480/any?random=${Math.random()}`],
      price: 100,
      categoryId: 1,
    };
    this.productsService.create(product).subscribe((data) => {
      this.products.unshift(data);
    });
  }

  updateProduct() {
    const changes: updateProductDto = {
      title: 'Título editado',
    };
    const id = this.productChosen.id;
    this.productsService.update(id, changes).subscribe((data) => {
      const productIndex = this.products.findIndex((item) => item.id === id);
      this.products[productIndex] = data;
      this.toggleProductDetail();
    });
  }

  deleteProduct() {
    const id = this.productChosen.id;
    this.productsService.delete(id).subscribe(() => {
      const productIndex = this.products.findIndex((item) => item.id === id);
      this.products.splice(productIndex, 1);
      this.toggleProductDetail();
    });
  }

  readAndUpdate(id: string) {
    // Callback Hell
    // this.productsService.getProduct(id).subscribe((data) => {
    //   const product = data;
    //   this.productsService
    //     .update(product.id, { title: 'New title' })
    //     .subscribe((rtaUpdate) => {
    //       console.log('rtaUpdate', rtaUpdate);
    //     });
    // });

    // La lógica debería estar en el servicio
    // Dependencia del result anterior
    // this.productsService
    //   .getProduct(id)
    //   .pipe(
    //     switchMap((product) =>
    //       this.productsService.update(product.id, { title: 'New title' })
    //     ),
    //     switchMap((product) =>
    //       this.productsService.update(product.id, { price: 0 })
    //     )
    //   )
    //   .subscribe((data) => {
    //     console.log('data', data);
    //   });

    // // En paralelo
    // zip(
    //   this.productsService.getProduct(id),
    //   this.productsService.update(id, { title: 'New title' }),
    //   this.productsService.update(id, { price: 0 })
    // ).subscribe((response) => {
    //   const product = response[0];
    //   const productTitle = response[1];
    //   const productPrice = response[2];
    // });

    this.productsService
      .fetchReadAndUpdate(id, { title: 'New title' })
      .subscribe((response) => {
        const product = response[0];
        const productTitle = response[1];
      });
  }
}
