import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTags'
})
export class FilterTagsPipe implements PipeTransform {

  transform(items: any, field: any, value: any): any[] {
    if (!items) {
      return [];
    }

    if (!value || value === 'undefined') {
      return items;
    }

    console.log(value[0].value)
    console.log(field, items, value)
    const myPattern = new RegExp(value[0].value, 'i');
    console.log(myPattern);
    return items.filter(it => it.tags[0].value.match(myPattern));
  }
}
