import { Injectable } from '@angular/core';
import { Bankn } from '../models/bankn';
import { Category } from '../models/category';
import { Entity } from '../models/entity';
import { BanknService } from './bankn.service';
import { CategoryService } from './category.service';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(
    private banknService: BanknService,
    private utilsService: UtilsService
  ) { }

  upsertEntity(
    entityName?: string,
    description: string | null = null,
    referenceCategory: Category | null = null
  ): Entity | null {
    
    //Guard
    if (entityName == null || entityName == undefined || entityName.trim().length == 0) 
      return null;

    var entity = BanknService.getEntity(this.banknService.getBankn()! ,entityName);
    if (entity == null) {
      entity = new Entity(entityName);
      this.banknService.addEntity(entity);
    }

    if (!UtilsService.isDescriptionFromPatterns(description, entity.descriptionPatterns))
      EntityService.addDescriptionToPattern(entity, description!);

    if (referenceCategory) 
      entity.referenceCategory = referenceCategory;
    
      return entity;
  }

  static addDescriptionToPattern(entity: Entity, description: string){
    //TODO more inteligent
    entity.descriptionPatterns.push(description);
  }

  static getEntityFromDescriptionPattern(
    bankn: Bankn,
    descriptionPattern: string,
    referenceCategory: Category | null
  ): Entity | null {
    //TODO parse category
    for (let e = 0; e < bankn.entities.length; e++) {
      if (
        UtilsService.isDescriptionFromPatterns(
          descriptionPattern,
          bankn.entities[e].descriptionPatterns
        )
      )
        return bankn.entities[e];
    }
    return null;
  }

  public static toJson(entity: Entity): any {
    return {
      name: entity.name,
      descriptionPatterns: entity.descriptionPatterns,
      referenceCategory:
      entity.referenceCategory == null ? '' : CategoryService.toJson(entity.referenceCategory),
    };
  }

  public static fromJson(json: any): Entity {
    var entity = new Entity(json.name);
    entity.descriptionPatterns = json.descriptionPatterns;
    if (json.referenceCategory)
      entity.referenceCategory = CategoryService.fromJson(json.referenceCategory);
    return entity;
  }

}
