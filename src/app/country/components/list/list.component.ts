import { Component, input } from '@angular/core';
import { Country } from '../../interfaces/country.interface';
import { DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'country-list',
  imports: [DecimalPipe, RouterLink],
  templateUrl: './list.component.html',
  styles: ``
})
export class ListComponent {

  countries = input.required<Country[]>();

  errorMessage = input<null| unknown | string>();
  isLoading = input(false);
  isEmpty =input(false);
}
