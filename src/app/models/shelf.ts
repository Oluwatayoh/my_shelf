import { IBooks } from './books';

export class IShelf {
    public id: number;
    public categoryName: string;
    public books: IBooks[];

    constructor(
        _id: number,
        _categoryName: string,
        _books: IBooks[],
    ){
        this.id = _id;
        this.categoryName = _categoryName;
        this.books = _books;
    }
}
