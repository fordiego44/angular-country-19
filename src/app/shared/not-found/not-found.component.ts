import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'shared-not-found',
  imports: [],
  templateUrl: './not-found.component.html',
  styles: ``
})
export class NotFoundComponent {

  location = inject(Location);

  goBack(){
   this.location.back();
  }
}
