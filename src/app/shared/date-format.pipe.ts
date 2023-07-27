import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormatPipe implements PipeTransform {

  transform(value: Date): string {
    console.log(value)
    const partsOfDate = value.toString().split('-');
    const day = partsOfDate[2];
    const month = partsOfDate[1];
    const year = partsOfDate[0];
    return day + '/' + month + '/' + year;
  }
}
