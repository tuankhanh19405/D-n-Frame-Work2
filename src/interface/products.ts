export interface IProduct {
    id:string|number,
    name:string,
    price:number,
    image:string,
    image2:string,
    image3:string,
    category_id: number,
    description: string,
    descriptionLong: string,

  }
  export type IProductForm = Omit<IProduct,"id">