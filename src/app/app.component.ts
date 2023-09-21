import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'mkc';
  schedule: Schedule = new Schedule();
}

export class Schedule {
  schedulingName: string = '';
  schedulingDate: string = '2023-11-11';
  type: string = '';
  local: string = '';
  doctor: string = '';
  specialty: string = '';
  userId: number = 0;
}


