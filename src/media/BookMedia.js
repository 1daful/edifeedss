import { GoogleBooks } from "../api/book/GoogleBooks.js";
import { Media } from "./Media.js";
export class BookMedia {
    constructor() {
        //publisher!: string;
        //subtitle!: string;
        //pageCount!: number;
        this.apis = [];
        this.googleBooks = new GoogleBooks();
        this.media = new Media('books');
        this.apis.push(this.googleBooks);
    }
    async readMedia(params, op) {
        try {
            return await this.media.readItems(params, op);
        }
        catch (err) {
            console.log(err);
        }
    }
    async getMedia(params) {
        //const res = {}
        try {
            await this.media.load('books', this, params);
        }
        catch (err) {
            console.log(err);
        }
        //return res
    }
}
