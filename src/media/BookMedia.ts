import { IMedia } from "./IMedia.js";
import { GoogleBooks } from "../api/book/GoogleBooks.js";
import { IMediaApi } from "../api/IMediaApi.js";
import { Media } from "./Media.js";

export class BookMedia implements IMedia{
    //publisher!: string;
    //subtitle!: string;
    //pageCount!: number;

    apis: IMediaApi[] = [];
    media: Media;
    googleBooks: IMediaApi;
    constructor(){
        this.googleBooks = new GoogleBooks();
        this.media = new Media('books');
        this.apis.push(this.googleBooks);
    }

    async readMedia(params?: string[], op?: Record<string, any>) {
        try {
            return await this.media.readItems(params, op);
        }
        catch (err) {
            console.log(err)
        }
    }

    async getMedia(params?: Record<string, any>) {
        //const res = {}
        try {
            await this.media.load('books', this, params);
        }
        catch (err) {
            console.log(err)
        }
        //return res
    }
}