import { IMedia } from "./IMedia.js";
import { IMediaApi } from "../api/IMediaApi.js";
import { Media } from "./Media.js";
import { SoundCloud } from "../api/music/SoundCloud.js";

export class MusicMedia implements IMedia {
    apis: IMediaApi[] = [];
    //private mediaItems: Record<string, any>[] = [];
    media: Media;
    soundCloud: IMediaApi;

    constructor() {
        this.soundCloud = new SoundCloud();
        this.media = new Media('music');
        this.apis.push(this.soundCloud);
    }
    
    async getMedia(params?: Record<string, any>) {
        //const res = {}
        try {
            await this.media.load('tracks', this, params);
        }
        catch (err) {
            console.log(err)
        }
        //return res
    }
    async readMedia(params?: string[], op?: Record<string, any>) {
        try {
            return await this.media.readItems(params, op);}
        catch (err) {
            console.log(err)
        }
    }
}