import { MediaApi } from "../api/MediaApi.js";
import { Repository } from "../model/Repository.js";
import { NetworkLocal } from "@/api/network.js";
/**
 * Class Media acts as delegates for the media class instances' functions.
 * @function load
 * @function createApi
 */
export class Media {
    constructor(collName) {
        this.repository = new Repository(collName);
    }
    //genre: string = '';
    /**
     * Used to delegate a media class method to get mediaItems from its registered media APIs, and the save them in the repository for peristence.
     * @param type
     * @param media
     * @param params
     */
    async load(type, media, params) {
        const mediaItems = [];
        const result = {};
        try {
            for (const api of media.apis) {
                const mediaApi = new MediaApi(api);
                //mediaItems.push(mediaApi.getItems(type, params));
                const name = mediaApi.api.constructor.name;
                NetworkLocal.test(`${name} good!`);
                let item = [];
                item = await mediaApi.getItems(type, params);
                if (typeof item === "object") {
                    NetworkLocal.test(`This is item from Media load. ${item}`);
                    console.log("this is item from Media load: ", item);
                    await this.addItems(/*media.constructor.name*/ item);
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    /**
     * Delegate method for a media class to register it's API objects
     * @param media
     * @param api
     */
    /*createApi(media: IMedia, ...api: IMediaApi[]) {
        media.apis.push(...api);
    }*/
    async addItems(items) {
        const result = {};
        try {
            NetworkLocal.test("Adding items from Media");
            await this.repository.addItems(items);
        }
        catch (err) {
            console.log(err);
        }
        console.log("Unable to load media");
        return result;
    }
    async readItems(params, op) {
        const result = [];
        try {
            const res = [];
            await res.push(NetworkLocal.test("Reading items from Media"));
            if (res) {
                return res;
            }
            return await this.repository.readItems(params, op);
        }
        catch (err) {
            console.log(err);
        }
        console.log("Unable to load media");
        return result;
    }
}
