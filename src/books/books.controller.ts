import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CreateBookDto} from "./dto/create-book.dto";
import {UpdateBookDto} from "./dto/update-book.dto";
import {BooksService} from "./books.service";

@Controller('books')
export class BooksController {
    constructor(private readonly storage: BooksService) {}

    @Get()
    async getAll() {
        return this.storage.getBooks();
    }
    @Get('view/:id')
    async getOne(@Param('id') id: string) {
        console.log(`get one book ${id}`);
        return this.storage.getBook(id);
    }
    @Post('create')
    async createOne(@Body() body: CreateBookDto) {
        console.log('BooksController->createOne()', body);
        console.log(`create one ${JSON.stringify(body)}`);
        return this.storage.createBook(body);
    }
    @Patch('update/:id')
    async updateOne(@Param('id') id: string, @Body() body: UpdateBookDto) {
        console.log(`update one book ${id} ${JSON.stringify(body)}`);
        return this.storage.updateBook(id, body);
    }
    @Delete('delete/:id')
    async deleteOne(@Param('id') id: string) {
        console.log(`delete one book ${id}`);
        return this.storage.deleteBook(id);
    }
}
