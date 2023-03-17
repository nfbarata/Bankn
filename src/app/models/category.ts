export class Category {
  name: string;
  descriptionPatterns: string[] = [];
  innerCategories: Category[] = [];

  constructor(
    name: string
  ) {
    this.name = name;
  }
}
