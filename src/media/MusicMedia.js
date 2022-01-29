import { Media } from "./Media.js";
import { SoundCloud } from "../api/music/SoundCloud.js";
export class MusicMedia {
    constructor() {
        this.apis = [];
        this.soundCloud = new SoundCloud();
        this.media = new Media('music');
        this.apis.push(this.soundCloud);
    }
    async getMedia(params) {
        //const res = {}
        try {
            await this.media.load('tracks', this, params);
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
