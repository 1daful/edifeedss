import { Media } from "./Media";
import { TheySaidSo } from "../api/quotes/Theysaidso";
//import { BookFormat } from "@/apiReqFormat/BookFormat";
import { ZenQuotes } from "@/api/quotes/ZenQuotes";
import { NetworkLocal } from "@/api/network";
export class QuoteMedia {
    //bookFormat: BookFormat = new BookFormat()
    constructor() {
        this.apis = [];
        //this.paperQuotes = new PaperQuotes();
        this.theySaidSo = new TheySaidSo();
        this.zenQuotes = new ZenQuotes();
        this.media = new Media('quotes');
        this.apis.push(this.theySaidSo, this.zenQuotes);
    }
    async getMedia(params) {
        //let res = {}
        try {
            await this.media.load('quotes', this, params);
            //console.log("cecking res from QuoteMdia: ", res)
        }
        catch (err) {
            console.log(err);
            console.log("QuoteMedia not successful");
        }
    }
    async readMedia(params, op) {
        try {
            NetworkLocal.test("Reading items from QuoteMedia");
            const res = await this.media.readItems(params, op);
            console.log("QuoteMdia res: ", res);
            return res;
        }
        catch (err) {
            console.log(err);
        }
        console.log("Unable to load quote");
    }
}
