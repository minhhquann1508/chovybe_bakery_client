import type { CategoryType } from "./categories";

export interface SubCategoryType {
  _id: string;
  subCategoryName: string;
  slug: string;
  category: string | CategoryType;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedAt: string;
}
