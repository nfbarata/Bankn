export class Category {
  name: string = '';
  descriptionPatterns: string[] = [];
  innerCategory: Category | null = null;

  constructor(
    name: string,
    descriptionPatterns: string[] = [],
    innerCategory: Category | null = null
  ) {
    this.name = name;
    this.descriptionPatterns = descriptionPatterns;
    this.innerCategory = innerCategory;
  }

  public toJson(): any {
    return {
      name: this.name,
      descriptionPatterns: this.descriptionPatterns,
      innerCategory:
        this.innerCategory == null ? '' : this.innerCategory.toJson(),
    };
  }

  public static fromJson(json: any): Category {
    var category = new Category(json.name);
    category.descriptionPatterns = json.descriptionPatterns;
    if (json.innerCategory)
      category.innerCategory = Category.fromJson(json.innerCategory);
    return category;
  }
}
