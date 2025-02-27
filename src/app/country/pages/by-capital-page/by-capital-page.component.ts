import { Component, inject, linkedSignal, resource, signal } from '@angular/core';
import { ListComponent } from "../../components/list/list.component";
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryService } from '../../services/country.service';
import { Country } from '../../interfaces/country.interface';
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { query } from '@angular/animations';

@Component({
  selector: 'country-by-capital-page',
  imports: [ListComponent, SearchInputComponent],
  templateUrl: './by-capital-page.component.html',
  styles: ``
})
export class ByCapitalPageComponent {

  countryService = inject(CountryService);

  activatedRoute =  inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('query') ?? ''

  // query = linkedSignal(()=>this.queryParam);
  query = signal(this.queryParam);

  countryResource = rxResource({
    request: ()=> ({ query: this.query() }),
    loader:   ({request}) => {

      console.log([{query:request.query}]);

      if (!request.query) return of([]);

      this.router.navigate(['/country/by-capital'],{
        queryParams:{
          query: request.query
        }
      });

      return this.countryService.searchByCapital(request.query);
    }
  });

  // countryResource = resource({
  //   request: ()=> ({ query: this.query() }),
  //   loader: async ({request}) => {
  //     if (!request.query) return [];

  //     return await firstValueFrom(
  //       this.countryService.searchByCapital(request.query)
  //     );
  //   }
  // });

  // isLoading = signal(false);
  // isError = signal<string|null>(null);
  // countries = signal<Country[]>([]);


  // onSearch(query: string) {

  //   if (this.isLoading()) return;

  //   this.isLoading.set(true);
  //   this.isError.set(null);

  // //#1
  // //   this.countryService.searchByCapital(query).subscribe((countries)=>{
  // //     this.isLoading.set(false);
  // //     this.countries.set(countries);
  // //     console.log(countries);
  // //   });
  // // }

  // //#2
  // // this.countryService.searchByCapital(query).subscribe({
  // //   next: (countries)=>{
  // //     this.isLoading.set(false);
  // //     this.countries.set(countries);
  // //   },
  // //   error: (err)=>{
  // //     this.isLoading.set(false);
  // //     this.countries.set([]);
  // //     this.isError.set(err)
  // //   },
  // // });

  // }
}
