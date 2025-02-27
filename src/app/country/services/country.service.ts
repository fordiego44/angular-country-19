import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { Country } from '../interfaces/country.interface';
import { catchError, delay, map, Observable, of, pipe, tap, throwError } from 'rxjs';
import { CountryMapper } from '../mappers/country.mapper';
import { Region } from '../interfaces/region.type';

const API_URL:string = 'https://restcountries.com/v3.1';

@Injectable({providedIn: 'root'})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheCapital = new Map<string, Country[]>();
  private queryCacheCountry = new Map<string, Country[]>();
  private queryCacheRegion = new Map<Region, Country[]>();

  searchByCapital( query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if (this.queryCacheCapital.has(query)) {
      return of(this.queryCacheCapital.get(query) ?? []);
    }

    console.log(`Llegando al servidor por ${query}`);


    return this.http
              .get<RESTCountry[]>(`${API_URL}/capital/${query}`)
              .pipe(
                map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
                tap((countries)=>this.queryCacheCapital.set(query, countries)),
                delay(3000),
                catchError((error) =>{
                  console.log(error);

                  return throwError(()=> new Error(`No se pudo obtener paises con ese query ${query}`));
                })
              );
  }

  searchByCountry( query: string): Observable<Country[]> {

    const url:string = `${API_URL}/name/${query}`;
    query = query.toLowerCase();

    if (this.queryCacheCountry.has(query)) {
      return of(this.queryCacheCountry.get(query) ?? []);
    }

    console.log(`Llegando al servidor por ${query}`);

    return this.http
              .get<RESTCountry[]>(url)
              .pipe(
                map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
                tap((countries)=>this.queryCacheCountry.set(query, countries)),
                delay(3000),
                catchError((error) =>{
                  console.log(error);

                  return throwError(()=> new Error(`No se pudo obtener paises con ese query ${query}`));
                })
              );
  }

  searchByRegion( query: Region): Observable<Country[]> {

    if (this.queryCacheRegion.has(query)) {
      return of(this.queryCacheRegion.get(query) ?? []);
    }

    console.log(`Llegando al servidor por region: ${query}`);


    return this.http
              .get<RESTCountry[]>(`${API_URL}/region/${query}`)
              .pipe(
                map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
                tap((countries)=>this.queryCacheRegion.set(query, countries)),
                delay(3000),
                catchError((error) =>{
                  console.log(error);

                  return throwError(()=> new Error(`No se pudo obtener paises con ese query ${query}`));
                })
              );
  }


  searchCountryByAlphaCode( code: string): Observable<Country | undefined> {

    const url:string = `${API_URL}/alpha/${code}`;

    return this.http
              .get<RESTCountry[]>(url)
              .pipe(
                map((resp) => CountryMapper.mapRestCountryArrayToCountryArray(resp)),
                map((countries) => countries.at(0) ),
                catchError((error) =>{
                  console.log(error);

                  return throwError(()=> new Error(`No se pudo obtener paises con ese código ${code}`));
                })
              );
  }
}
