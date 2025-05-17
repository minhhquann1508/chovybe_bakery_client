export interface CategoryType {
  image: string;
  _id: string;
  categoryName: string;
  description: string;
  isActive: boolean;
  createdBy: CreatedBy;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}

export interface CreatedBy {
  _id: string;
  email: string;
  fullName: string;
}
