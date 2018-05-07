import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterTags',
  pure: false,
})
export class FilterTagsPipe implements PipeTransform {

  transform(items: any, value: any) {
    if (!items) {
      return [];
    }

    if (!value || value === 'undefined' || value.length === 0) {
      return items;
    }

    const itmesRes = [];

    items.forEach(item => {
      value.forEach(val =>{
        if(item.tags.includes(val)) {
          itmesRes.push(item);
        }
      })
    })

    return itmesRes;
  }
}
