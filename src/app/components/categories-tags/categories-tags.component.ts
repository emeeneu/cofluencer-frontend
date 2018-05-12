import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-categories-tags',
  templateUrl: './categories-tags.component.html',
  styleUrls: ['./categories-tags.component.css']
})
export class CategoriesTagsComponent implements OnInit {

  @Input() tags: Array<String>;
  @Input() state: String;

  categories = ['fashion', 'food', 'sport', 'brand', 'business', 'lifestyle', 'blog', 'art', 'technology', 'music', 'video', 'others'];
  colors = ['red', 'tomato', 'yellow', 'orange', 'blue', 'grey', 'gold', 'black', 'white', 'purple', 'green', 'lightsalmon'];

  constructor() { }

  ngOnInit() {
  }

  checkHaveTag(tag) {
    if (this.tags.indexOf(tag) !== -1){
      return true;
    } else {
      return false;
    }
  }

  toggleTags(tag) {
    if (this.tags.indexOf(tag) !== -1) {
      this.tags.splice(this.tags.indexOf(tag),1);
    } else {
      this.tags.push(tag);
    }
  }

}
