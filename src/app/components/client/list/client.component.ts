import {Component, OnInit} from '@angular/core';
import {Client} from 'src/app/model/client';
import {Root} from 'src/app/model/root';
import {ClientsService} from 'src/app/components/client/service/clients.service';
import {ActivatedRoute} from '@angular/router';

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

  constructor(private clientService: ClientsService, private route: ActivatedRoute) {}

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
      console.log(response.content.map((r) => r.address.city))
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

  public onPageChange(pageNumber: number): void {
    this.page = (pageNumber - 1);
    this.listAll();
    console.log('Página selecionada:', pageNumber);
  }
}
