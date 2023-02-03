import { Injectable } from '@angular/core';
//@ts-ignore
import { countries } from 'country-data-list';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  private countries: any;

  constructor() { 
    this.countries = UtilsService.getCountries();
  }

  getCountries() {
    return this.countries;
  }

  static getCountries() {
    return countries.all.filter(function (country: any) {
      return country.currencies.length > 0;
    });
  }

  static addNewPattern(descriptionPattern: string, descriptionPatterns: string[]) {
    //TODO more inteligent
    if (
      !UtilsService.isDescriptionFromPatterns(descriptionPattern, descriptionPatterns)
    )
      descriptionPatterns.push(descriptionPattern);
  }

  static isDescriptionFromPatterns(
    descriptionPattern: string,
    descriptionPatterns: string[]
  ): boolean {
    for (let d = 0; d < descriptionPatterns.length; d++) {
      if (
        UtilsService.isDescriptionFromPattern(
          descriptionPattern,
          descriptionPatterns[d]
        )
      ) {
        //TOOD optimize other descriptionPatterns?
        return true;
      }
    }
    return false;
  }

  private static isDescriptionFromPattern(
    description: string,
    descriptionPattern: string
  ): boolean {
    //TODO more inteligent
    return description == descriptionPattern;
  }
}
