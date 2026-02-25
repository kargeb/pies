export interface Asset {
  assetName: string;
  quantity: number;
}

export interface User {
  id: string;
  username: string;
  age: number;
  city: string;
  assets: Asset[];
  phone?: string;
}
