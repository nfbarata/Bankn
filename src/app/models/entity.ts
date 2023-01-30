import { Category } from './category';

export class Entity {
  name: string;
  descriptionPatterns: string[];
  referenceCategory: Category | null;

  constructor(
    name: string,
    descriptionPatterns: string[] = [],
    referenceCategory: Category | null = null
  ) {
    this.name = name;
    this.descriptionPatterns = descriptionPatterns;
    this.referenceCategory = referenceCategory;
  }

  public toJson(): any {
    return {
      name: this.name,
      descriptionPatterns: this.descriptionPatterns,
      referenceCategory:
        this.referenceCategory == null ? '' : this.referenceCategory.toJson(),
    };
  }

  public static fromJson(json: any): Entity {
    var entity = new Entity(json.name);
    entity.descriptionPatterns = json.descriptionPatterns;
    if (json.referenceCategory)
      entity.referenceCategory = Category.fromJson(json.referenceCategory);
    return entity;
  }
}
