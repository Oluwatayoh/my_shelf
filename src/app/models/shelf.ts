import { IBooks } from './books';

export interface IShelf {
  uid?: string;
  categoryName: string;
  author?: string;
  title?: string;
  dateadded?: Date;
  description?: string;
  favourite?: boolean;
  imageUrl?: string;

  // constructor(
  //     _categoryName: string,
  //     _books: IBooks[],
  // ){

  //     this.categoryName = _categoryName;
  //     this.books = _books;
  // }
}

export const initialShelf: IShelf = {
  uid: '',
  categoryName: '',
  author: '',
  title: '',
  dateadded: new Date(),
  description: '',
  favourite: false,
  imageUrl: '',
};
