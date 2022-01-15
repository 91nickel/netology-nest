import {Injectable} from '@nestjs/common';
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";
import { v4 as uuidv4 } from 'uuid';

export interface IBook {
    _id: object | null
    title: string
    description: string
    authors: string
    favorite: string
    fileCover: string
    fileName: string
    fileBook: string
    comments: object[]

    update(fields: UpdateBookDto): Book

    save(): Promise<Book>

    delete(): Promise<Book>
}

export interface IBooksRepository {
    createBook(book: CreateBookDto): Promise<Book | void>;

    getBook(id: string): Promise<Book | void>;

    getBooks(): Promise<Array<Book> | void>;

    updateBook(id: string, fields: UpdateBookDto): Promise<Book | void>;

    deleteBook(id: string): Promise<Book | void>;
}

@Injectable()
export class BooksService {
    storage: Book[] = [
        new Book({_id: '1', title: "Some title 1", description: "Some description 1"}),
        new Book({_id: '2', title: "Some title 2", description: "Some description 2"}),
        new Book({_id: '3', title: "Some title 3", description: "Some description 3"}),
    ]

    // создание книги
    async createBook(fields: CreateBookDto): Promise<Book | void> {
        console.log('BooksRepository.createBook()', fields);
        if (!fields._id) {
            fields._id = uuidv4();
        }
        const book = new Book(fields);
        this.storage.push(book)
        return book;
    }

    //получение книги по id
    async getBook(id: string): Promise<Book | void> {
        console.log('BooksRepository.getBook()', id);
        return this.storage.find(book => book._id === id);
    }

    //получение всех книг
    async getBooks(): Promise<Array<Book> | void> {
        console.log('BooksRepository.getBooks()...', this.storage);
        return this.storage;
    }

    //обновление книги
    async updateBook(id: string, fields: UpdateBookDto): Promise<Book | void> {
        console.log('BooksRepository.updateBook()', id, fields);
        const book = this.storage.find(book => book._id === id);
        book.update(fields);
        return book;
    }

    //удаление книги
    async deleteBook(id: string): Promise<Book | void> {
        console.log('BooksRepository.deleteBook()', id);
        const book = this.storage.find(book => book._id === id);
        this.storage = this.storage.filter(book => book._id !== id)
        return book;
    }
}

@Injectable()
export class Book implements IBook {
    public _id = null
    public title = ''
    public description = ''
    public authors = ''
    public favorite = ''
    public fileCover = ''
    public fileName = ''
    public fileBook = ''
    public comments = []

    constructor(fields: CreateBookDto = {}) {
        console.log('Book->constructor() ', fields)
        Object.keys(fields).forEach((key: string) => {
            if (this.hasOwnProperty(key)) {
                this[key] = fields[key];
            }
        })
        console.log('Book->constructor->fields', this);
    }

    async save(): Promise<Book> {
        console.log('Book->save', this);
        return this;
    }

    async delete(): Promise<Book> {
        console.log('Book->delete', this._id);
        return this;
    }

    update(fields: UpdateBookDto): Book {
        Object.keys(fields).forEach((key) => {
            if (this.hasOwnProperty(key)) {
                this[key] = fields[key];
            }
        })
        return this;
    }
}
