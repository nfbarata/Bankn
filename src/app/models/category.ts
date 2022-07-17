export class Category {
  name: string = "";
  descriptionPatterns: string[] = [];
  innerCategory: Category|null = null;
}