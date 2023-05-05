export interface BoredItem {
  activity: string;
  type: string;
  participants?: number;
  price: number;
  link?: string;
  key?: string;
  accessibility?: number;
}

export type BoredObject = BoredItem | {};
