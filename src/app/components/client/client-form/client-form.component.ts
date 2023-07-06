import { Component } from '@angular/core';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent {
  value1: string = '47991766414'
  date: Date = new Date()
}
