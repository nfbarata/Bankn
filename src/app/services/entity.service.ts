import { Injectable } from '@angular/core';
import { Bankn } from '../models/bankn';
import { Category } from '../models/category';
import { Entity } from '../models/entity';
import { UtilsService } from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class EntityService {

  constructor(
    private utilsService: UtilsService
  ) { }

  static upsertEntity(
    bankn: Bankn,
    entityName: string,
    descriptionPattern: string | null = null,
    referenceCategory: Category | null = null
  ): Entity {
    var entity = bankn.getEntity(entityName);
    if (entity == null) {
      entity = new Entity(entityName);
      bankn.entities.push(entity); //? event
    }
    if (descriptionPattern != null)
      if (
        !UtilsService.isDescriptionFromPatterns(
          descriptionPattern,
          entity.descriptionPatterns
        )
      )
        //TODO more inteligent
        entity.descriptionPatterns.push(descriptionPattern);
    if (referenceCategory) entity.referenceCategory = referenceCategory;
    return entity;
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

}
