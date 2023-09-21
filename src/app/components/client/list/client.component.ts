import {Component, OnInit, ViewChild} from '@angular/core';
import {Client} from 'src/app/model/client/client';
import {ClientPage} from 'src/app/model/client/clientPage';
import {ClientsService} from 'src/app/components/client/service/clients.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import Swal from "sweetalert2";
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  root: ClientPage = new ClientPage();
  clients: Client[] = [];
  page: number = 0;
  listPerPage: number = 20;
  totalClients: number = 0;
  searchName: string = ''
  itemPerPage: number = 0;
  loading = true;
  public errorMessage: string = '';

  displayedColumns: string[] = ['Nome', 'Idade', 'Aniversario', 'Telefone', 'E-mail', 'Cidade', 'Bairro', 'Acoes'];
  dataSource = new MatTableDataSource<Client>(this.clients);

  constructor(private clientService: ClientsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const name = params.get('name');
      if (name) {
        this.searchName = name;
        this.findClientByName();
      } else {
        this.listAll();
      }
    });
  }

    public listAll(): void {
    this.clientService.listAll(this.page, this.listPerPage, 'ASC', 'name').subscribe({
      next: (response) => {
        console.log(`Teste ${response}`);
        this.loading = true;
        this.root = response;
        this.totalClients = response.totalElements;
        this.itemPerPage = response.size;
        this.loading = false;
        console.log('ROOT ' + this.root.content);
        console.log('Response ' + response.content);
        this.dataSource = new MatTableDataSource<Client>(response.content);
      },
      error: (error) => {
        console.log(`ERROR ====> ${error}`)
        this.errorMessage = 'Ocorreu um erro ao buscar os dados. Por favor, verifique sua conexão.';
        this.loading = true; // Oculta o indicador de carregamento
      },
    });
  }

  public findClientByName(): void {
    this.loading = true;
    this.clientService.findClientByName(this.searchName).subscribe((res) => {
      this.clients = res;
    });
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }

  public editClient(clientId: number): void {
    this.router.navigate(['/client-product-form', clientId]);
  }

  public deleteClient(id: number, name: string) {
    Swal.fire({
      title: `Deseja excluir o cliente ${name}?`,
      showCancelButton: true,
      confirmButtonText: 'Deletar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.delete(id).subscribe((resp) => {
          Swal.fire('Deletado!', 'Cliente deletado com sucesso.', 'success').then(r => r);
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

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}


