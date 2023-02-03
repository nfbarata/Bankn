import { Injectable } from '@angular/core';
import { Bankn } from '../models/bankn';
import { Category } from '../models/category';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
  ) { }

  static upsertCategory(
    bankn: Bankn,
    categoryFullName: string,
    descriptionPattern?: string
  ): Category | null {
    //stop condition
    if (categoryFullName.trim().length == 0) return null;

    var categoryNames = categoryFullName.split('.');

    var parentCategoryName = categoryNames[0];
    var category = bankn.getCategory(parentCategoryName);
    if (category == null) {
      category = new Category(parentCategoryName);
      bankn.categories.push(category); //? event
    }

    //recursive category creation
    if (categoryNames.length > 1)
      category.innerCategory = this.upsertCategory(bankn, 
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
}
