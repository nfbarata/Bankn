import { Category } from './category';

export class Entity {
  name: string;
  descriptionPatterns: string[];
  referenceCategory: Category | null;

  //Volatile
  referenceSimilarityRating: number|null = null;

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
