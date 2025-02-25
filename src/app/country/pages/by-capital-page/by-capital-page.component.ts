import { Component } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";

@Component({
  selector: 'country-by-capital-page',
  imports: [ListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  onSearch(value: string) {
    console.log(value);

  }
}
