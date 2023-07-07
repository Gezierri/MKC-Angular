import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from 'src/app/model/client';
import { ClientsService } from 'src/app/services/clients.service';

class ClientImpl implements Client {
  id: string = '';
  name: string = '';
  email: string = '';
  dateBirth: Date = new Date();
  phoneNumber: string = '';
  street: string = '';
  number: string = '';
  complement: string = '';
  neighborhood: string = '';
  city: string = '';
  state: string = '';
  country: string = '';
}

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent {
  clientForm: FormGroup;
  submitted = false;
  client: ClientImpl = new ClientImpl();

  value1: string = '47991766414';
  date: Date = new Date();

  constructor(
    private formBuilder: FormBuilder,
    private clientsService: ClientsService
  ) {
    this.clientForm = this.formBuilder.group({
      client_name: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    this.submitted = true;
    if(this.clientForm.invalid){
      return;
    }
  }
}
