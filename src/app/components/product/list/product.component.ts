import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import * as moment from "moment";
import {Product} from "../../../model/product/product";
import {ProductService} from "../service/product.service";
import {ProductPage} from "../../../model/product/productPage";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  root: ProductPage = new ProductPage();
  products: Product[] = [];
  page: number = 0;
  listPerPage: number = 20;
  totalProducts: number = 0;
  searchName: string = ''
  itemPerPage: number = 0;
  loading = true;

  constructor(private productService: ProductService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const name = params.get('name');
      if (name) {
        this.searchName = name;
        this.findProductByName();
      } else {
        this.listAll();
      }
    });
  }

  public listAll(): void {
    this.productService.listAll(this.page, this.listPerPage, 'ASC', 'name').subscribe((response) => {
      this.loading = true;
      this.root = response;
      this.totalProducts = response.totalElements;
      this.itemPerPage = response.size;
      this.page = response.number;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
    });
  }

  public findProductByName(): void {
    this.loading = true;
    this.productService.findProductByName(this.searchName).subscribe((res) => {
      this.products = res;
    });
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  public editProduct(ProductId: number): void {
    this.router.navigate(['/Product-product-form', ProductId]);
  }

  public deleteProduct(id: number, name: string) {
    Swal.fire({
      title: `Deseja excluir o Producte ${name}?`,
      showCancelButton: true,
      confirmButtonText: 'Deletar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.productService.delete(id).subscribe((resp) => {
          Swal.fire('Deletado!', 'Producte deletado com sucesso.', 'success')
          this.listAll()
        })
      }
    })
  }

  public ageFromDateOfBirthday(dateOfBirth: any): number {
    return moment().diff(dateOfBirth, 'years');
  }

  public onPageChange(pageNumber: number): void {
    this.page = (pageNumber - 1);
    this.listAll();
  }

}
