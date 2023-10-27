import { Injectable } from '@angular/core';
//@ts-ignore
import { countries } from 'country-data-list';
import { levenshtein } from 'string-comparison';

@Injectable({
  providedIn: 'root',
})
export class UtilsService {
  static minRating = 0.6;
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

  static calculateSimilarityRating(
    description: string,
    descriptionPatterns: string[]
  ): number {
    if (descriptionPatterns.length == 0) return 0;
    return levenshtein.similarity(description, descriptionPatterns);
  }
}
