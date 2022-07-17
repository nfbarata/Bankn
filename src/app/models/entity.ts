import { Category } from "./category";

export class Entity {
  name: string = "";
  descriptionPatterns: string[] = [];
  referenceCategory: Category|null = null;
}