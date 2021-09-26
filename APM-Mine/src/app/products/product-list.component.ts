import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit, AfterViewInit {
    pageTitle: string = 'Product List';
    showImage: boolean;
    listFilter: string;

    imageWidth: number = 50;
    imageMargin: number = 2;
    errorMessage: string;

    @ViewChild('filterElement') filterElementRef: ElementRef;
    private _filterInput: NgModel;
    private _sub: Subscription;

    get filterInput(): NgModel{
      return this._filterInput;
    }
    @ViewChild(NgModel)
    set filterInput(value: NgModel){
      this._filterInput = value;
      if(this.filterInput && !this._sub){
        this._sub = this.filterInput.valueChanges.subscribe(
          () => this.performFilter(this.listFilter)
        );
      }
      if(this.filterElementRef){
        this.filterElementRef.nativeElement.focus();
      }
    }

    filteredProducts: IProduct[];
    products: IProduct[];

    constructor(private productService: ProductService) {
    }

    ngAfterViewInit(): void {
      // this.filterInput.valueChanges.subscribe(
      //   () => this.performFilter(this.listFilter)
      // );
      // if(this.filterElementRef.nativeElement){
      //   this.filterElementRef.nativeElement.focus();
      // }
    }

    ngOnInit(): void {
        this.productService.getProducts().subscribe(
            (products: IProduct[]) => {
                this.products = products;
                this.performFilter(this.listFilter);
            },
            (error: any) => this.errorMessage = <any>error
        );
    }

    toggleImage(): void {
        this.showImage = !this.showImage;
    }

    performFilter(filterBy?: string): void {
        if (filterBy) {
            this.filteredProducts = this.products.filter((product: IProduct) =>
                product.productName.toLocaleLowerCase().indexOf(filterBy.toLocaleLowerCase()) !== -1);
        } else {
            this.filteredProducts = this.products;
        }
    }
}
