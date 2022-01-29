import { Media } from "./Media.js";
import { Youtube } from "../api/video/Youtube.js";
export class VideoMedia {
    constructor() {
        this.apis = [];
        this.mediaItems = [];
        this.youtube = new Youtube();
        this.media = new Media('videos');
        this.apis.push(this.youtube);
    }
    async getMedia(params) {
        //const res = {}
        try {
            await this.media.load('videos', this, params);
        }
        catch (err) {
            console.log(err);
        }
        //return res
    }
    async readMedia(params, op) {
        try {
            return await this.media.readItems(params, op);
        }
        catch (err) {
            console.log(err);
        }
    }
}
