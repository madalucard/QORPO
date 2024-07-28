import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
  standalone: true,
})
export class TruncatePipe implements PipeTransform {
  transform(value: string): string {
    if (!value) {
      return '';
    }

    if (value.length <= 9) {
      return value;
    }

    const firstPart = value.substring(0, 5);
    const lastPart = value.substring(value.length - 4);

    return `${firstPart}...${lastPart}`;
  }
}
