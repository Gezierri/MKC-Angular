import {Component, OnInit} from '@angular/core';
import {Client} from 'src/app/model/client';
import {Root} from 'src/app/model/root';
import {ClientsService} from 'src/app/components/client/service/clients.service';
import {ActivatedRoute, Router} from '@angular/router';
import * as moment from 'moment';
import Swal from "sweetalert2";


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  root: Root = new Root();
  clients: Client[] = [];
  page: number = 0;
  listPerPage: number = 20;
  totalClients: number = 0;
  searchName: string = ''
  itemPerPage: number = 0;
  loading = true;

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
    this.clientService.listAll(this.page, this.listPerPage, 'ASC', 'name').subscribe((response) => {
      this.loading = true;
      this.root = response;
      this.totalClients = response.totalElements;
      this.itemPerPage = response.size;
      this.page = response.number;
      setTimeout(() => {
        this.loading = false;
      }, 1000);
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
    this.router.navigate(['/client-form', clientId]);
  }

  public deleteClient(id: number, name: string) {
    Swal.fire({
      title: `Deseja excluir o cliente ${name}?`,
      showCancelButton: true,
      confirmButtonText: 'Deletar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.clientService.delete(id).subscribe((resp) => {
          Swal.fire('Deletado!', 'Cliente deletado com sucesso.', 'success')
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
