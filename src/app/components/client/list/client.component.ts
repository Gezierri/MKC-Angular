import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/client';
import { ClientsService } from 'src/app/services/clients.service';

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
  searchName: string = '';

  constructor(private clientService: ClientsService, private route: Router) {}

  ngOnInit(): void {
    this.listAll();
  }

  public listAll(): void {
    this.clientService.listAll(this.searchName).subscribe((response) => {
      this.clients = response;
      this.totalClients = response.length;
    });
  }
}
