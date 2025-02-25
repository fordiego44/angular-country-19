import { Component } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";

@Component({
  selector: 'country-by-region-page',
  imports: [  ListComponent],
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {
  onSearch(value: string) {
    console.log(value);
  }
}
