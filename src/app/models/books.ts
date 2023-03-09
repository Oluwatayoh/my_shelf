export class IBooks {
    public bookId: string;
    public bookName: string;
    public author: string;
    public isFavourite: boolean;

    constructor(
        _bookId: string,
        _bookName: string,
        _author: string,
        _isFavourite: boolean
    ) {
        this.bookId = _bookId;
        this.bookName = _bookName;
        this.author = _author;
        this.isFavourite = _isFavourite;
    }
}
