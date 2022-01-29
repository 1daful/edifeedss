import { BookMedia } from "../media/BookMedia";
import { QuoteMedia } from "../media/QuoteMedia";
import { MusicMedia } from "../media/MusicMedia";
import { VideoMedia } from "../media/VideoMedia";
import { Media } from "@/media/Media";
export class Recommender {
    constructor() {
        this.bookMedia = new BookMedia();
        this.quoteMedia = new QuoteMedia();
        this.musicMedia = new MusicMedia();
        this.videoMedia = new VideoMedia();
        this.media = new Media('collection');
    }
    //repository: IRepository = new Repository();
    /*constructor() {
    }*/
    async getMedia(section, genre, author) {
        let params;
        let op;
        //let collMedia =[]
        const mediaItems = [];
        const mediaList = [
            {
                type: 'quotes',
                mediaItems: mediaItems
            },
            {
                type: 'books',
                mediaItems: mediaItems
            },
            {
                type: 'music',
                mediaItems: mediaItems
            },
            {
                type: 'videos',
                mediaItems: mediaItems
            },
            {
                type: 'collection',
                mediaItems: mediaItems
            }
        ];
        switch (section) {
            case 'related':
                /*if (!genre) {
                    console.error('genre is not provided')
                    break;
                }*/
                /*params = {
                    fieldPath: 'genre',
                    op: '=',
                    value: `${genre}`
                };*/
                params = ['genre'];
                op = {
                    [genre]: "$eq"
                };
                this.load(mediaList, params, op);
                break;
            case 'sameAuthor':
                /*if (!item) {break;}
                params = {
                    fieldPath: 'author',
                    op: '=',
                    value: `${item.author}`
                }*/
                params = ['author'];
                op = {
                    [author]: "$eq"
                };
                this.load(mediaList, params, op);
                break;
            case 'top':
                this.load(mediaList);
                break;
            case 'collection':
                mediaList[4].mediaItems = await this.media.readItems();
                break;
            default:
                break;
        }
        return mediaList;
    }
    load(mediaList, params, op) {
        for (const item of mediaList) {
            switch (item.type) {
                case 'quote':
                    item.mediaItems = this.quoteMedia.getMedia(params);
                    break;
                case 'book':
                    item.mediaItems = this.bookMedia.readMedia(params, op);
                    break;
                case 'music':
                    item.mediaItems = this.musicMedia.readMedia(params, op);
                    break;
                case 'video':
                    item.mediaItems = this.videoMedia.readMedia(params, op);
                    break;
                default:
                    break;
            }
        }
    }
}
