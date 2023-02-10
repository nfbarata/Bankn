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
}
