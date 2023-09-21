import {Component} from '@angular/core';
import {ClientsService} from "../client/service/clients.service";
import {Schedule} from "../../app.component";
import {parseISO} from "date-fns";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  schedule: Schedule = new Schedule();

  constructor(private service: ClientsService) {
  }

  public saveSchedule(): void {
    this.schedule.schedulingName = 'teste schedule';
    this.schedule.type = 'EXAME';
    this.schedule.local = 'hospital ilhota';
    this.schedule.doctor = 'House';
    this.schedule.specialty = 'Clinico geral';
    this.schedule.userId = 1;
    this.service.saveSchedule(this.schedule).subscribe((s) => {
      console.log(s);
    });
  }
}
