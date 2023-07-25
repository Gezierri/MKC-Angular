import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Client} from 'src/app/model/client';
import {State} from 'src/app/model/states';
import {ClientsService} from 'src/app/components/client/service/clients.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css'],
})
export class ClientFormComponent implements OnInit {
  states: State = new State();
  client: Client = new Client();
  clientForm: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private clientsService: ClientsService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.clientForm = this.formBuilder.group({
      client_name: ['', Validators.required],
      date_birth: [null, Validators.required],
      phone_number: ['', Validators.required],
      email: new FormControl('', [Validators.email]),
      city: [''],
      state: [''],
      neighborhood: [''],
      number: [''],
      street: ['']
    });
  }

  public get valuesForm(): any {
    return this.clientForm.controls;
  }

  public onSubmit(): void {

    this.submitted = true;

    if (this.clientForm.invalid) {
      return;
    }

    this.client.name = this.valuesForm.client_name.value;
    this.client.dateBirth = this.valuesForm.date_birth.value;
    this.client.phone = this.valuesForm.phone_number.value;
    this.client.email = this.valuesForm.email.value;
    this.client.address.street = this.valuesForm.street.value;
    this.client.address.number = this.valuesForm.number.value;
    this.client.address.city = this.valuesForm.city.value;
    this.client.address.neighborhood = this.valuesForm.neighborhood.value;
    this.client.address.state = this.valuesForm.state.value;

    this.clientsService.save(this.client).subscribe(() => {
      this.submitted = false;
      this.clientForm.reset();
      Swal.fire('Sucesso!', 'Cliente cadastrado com sucesso.', "success");
    });
  }

  public goListClient(): void {
    this.route.navigate(['/clients']);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];
      console.log(id)
      if (id) {
        this.findById(id);
      }
    });
  }

  private findById(id: number): void {
    this.clientsService.findById(id).subscribe((clientResponse) => {
      this.client = clientResponse;
      this.clientForm.patchValue({
        name: this.client.name
      })
    });
  }
}
