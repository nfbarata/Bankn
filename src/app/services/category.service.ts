import { Injectable } from '@angular/core';
import { Bankn } from '../models/bankn';
import { Category } from '../models/category';
import { BanknService } from './bankn.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private banknService: BanknService,
  ) { }

  upsertCategory(
    categoryFullName?: string,
    descriptionPattern?: string
  ): Category | null {
    //stop&guard condition
    if (categoryFullName == null || categoryFullName == undefined || categoryFullName.trim().length == 0) 
      return null;

    var categoryNames = categoryFullName.split('.');
    var parentCategoryName = categoryNames[0];
    var category = BanknService.getCategory(this.banknService.getBankn()!, parentCategoryName);
    if (category == null) {
      category = new Category(parentCategoryName);
      this.banknService.addCategory(category);
    }

    //recursive category creation
    if (categoryNames.length > 1)
      category.innerCategory = this.upsertCategory( 
        categoryFullName.substring(parentCategoryName.length),
        descriptionPattern
      );

    //pattern only in the inner most category
    if (category.innerCategory == null && descriptionPattern !== undefined)
      UtilsService.addNewPattern(descriptionPattern, category.descriptionPatterns);

    return category;
  }

  static getCategoryFromDescriptionPattern(
    bankn: Bankn,
    descriptionPattern: string
  ): Category | null {
    //check top most categories
    for (let c = 0; c < bankn.categories.length; c++) {
      var result = CategoryService.getCategoryFromDescriptionPatternRecursive(
        descriptionPattern,
        bankn.categories[c].innerCategory!
      );
      if (result != null) return result;
    }
    return null;
  }

  static getCategoryFromDescriptionPatternRecursive(
    descriptionPattern: string,
    parentCategory: Category
  ): Category | null {
    var result = null;
    //give priority to innerCategories
    if (parentCategory.innerCategory != null)
      result = this.getCategoryFromDescriptionPatternRecursive(
        descriptionPattern,
        parentCategory.innerCategory!
      );
    if (result != null) return result;
    if (
      UtilsService.isDescriptionFromPatterns(
        descriptionPattern,
        parentCategory.descriptionPatterns
      )
    )
      return parentCategory;
    return null;
  }

  public static toJson(category: Category): any {
    return {
      name: category.name,
      descriptionPatterns: category.descriptionPatterns,
      innerCategory:
      category.innerCategory == null ? '' : CategoryService.toJson(category.innerCategory),
    };
  }

  public static fromJson(json: any): Category {
    var category = new Category(json.name);
    category.descriptionPatterns = json.descriptionPatterns;
    if (json.innerCategory)
      category.innerCategory = CategoryService.fromJson(json.innerCategory);
    return category;
  }
}
