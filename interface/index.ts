export interface IMeal {
  id: number;
  image: string;
  title: string;
  creator: string;
  summary: string;
  slug: string;
  creator_email: string;
  instructions: string;
}

export interface IMeals {
  meals: IMeal[];
}
