export class Category {
  name: string;
  descriptionPatterns: string[];
  innerCategory: Category | null;

  constructor(
    name: string,
    descriptionPatterns: string[] = [],
    innerCategory: Category | null = null
  ) {
    this.name = name;
    this.descriptionPatterns = descriptionPatterns;
    this.innerCategory = innerCategory;
  }
}
