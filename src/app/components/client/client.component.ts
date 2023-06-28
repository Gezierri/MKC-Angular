import { ClientsService } from './../../services/clients.service';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/model/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent implements OnInit {
  clients: Client[] = [];
  page: number = 1;
  itemsPerPage: number = 20;
  totalClients: number = 0;

  constructor(private clientService: ClientsService) {}

  ngOnInit(): void {
    this.listAll();
  }

  public listAll(): void {
    this.clientService.listAll().subscribe((response) => {
      this.clients = response;
      this.totalClients = response.length;
    });
  }
}
