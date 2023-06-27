import { ClientsService } from './../../services/clients.service';
import { Component } from '@angular/core';
import { Client } from 'src/app/model/client';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
})
export class ClientComponent {
  clients: Client[] = [];

  constructor(private clientService: ClientsService) {
    clientService.listAll().subscribe((response) => {
      console.log(response);
    });
  }
}
