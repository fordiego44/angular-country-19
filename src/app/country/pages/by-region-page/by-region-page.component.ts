import { Component, inject, linkedSignal, signal } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { ListComponent } from "../../components/list/list.component";
import { rxResource } from '@angular/core/rxjs-interop';
import { CountryService } from '../../services/country.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Region } from '../../interfaces/region.type';
import { ActivatedRoute, Router } from '@angular/router';

function validateQueryParam(queryParam: string):Region {
  queryParam = queryParam.toLowerCase();

  const validRegions: Record<string, Region>={
    africa: 'Africa',
    americas: 'Americas',
    asia: 'Asia',
    europe: 'Europe',
    oceania: 'Oceania',
    antarctic: 'Antarctic',
  };

  return validRegions[queryParam] ?? 'Americas';
}

@Component({
  selector: 'country-by-region-page',
  imports: [  ListComponent ],
  templateUrl: './by-region-page.component.html',
  styles: ``
})
export class ByRegionPageComponent {

  private countryService = inject(CountryService);
  activatedRoute =  inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('region') ?? ''

  // selectedRegion = signal<Region|null>(this.queryParam);
  selectedRegion = linkedSignal(()=> validateQueryParam(this.queryParam) );

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ];

    countryResource = rxResource({
        request: ()=> ({ region: this.selectedRegion() }),
        loader:   ({request}) => {
          if (!request.region) return of([]);

          this.router.navigate(['/country/by-region'],{
            queryParams:{
              region: request.region
            }
          });

          return this.countryService.searchByRegion(request.region);
        }
      });


}
