import { MediaApi } from "../api/MediaApi.js";
import { IMedia } from "./IMedia.js";
import { IRepository } from "../model/IRepository.js";
import { Repository } from "../model/Repository.js";
//import { NetworkLocal } from "@/api/network.js";

/**
 * Class Media acts as delegates for the media class instances' functions.
 * @function load
 * @function createApi
 */
export class Media {
    constructor(collName: string) {
        this.repository = new Repository(collName)
    }
    repository: IRepository;
    //genre: string = '';

    /**
     * Used to delegate a media class method to get mediaItems from its registered media APIs, and the save them in the repository for peristence.
     * @param type 
     * @param media 
     * @param params 
     */
    async load(type: string, media: IMedia, params?: Record<string, any>) {
        //const mediaItems: Record<string, any>[] = [];
        //const result: Record<string, any> = {}

        try {
            for (const api of media.apis) {
                const mediaApi: MediaApi = new MediaApi(api);
                //mediaItems.push(mediaApi.getItems(type, params));
                //const name = mediaApi.api.constructor.name
                //NetworkLocal.test(`${name} good!`)
                let items: any = []
                items = await mediaApi.getItems(type, params)
                if (items) {
                    //NetworkLocal.test(`This is item from Media load. ${items}`)
                    //console.log("this is item from Media load: ", items)
                    await this.addItems(/*media.constructor.name*/ items);
                }
            }
            
        }
        catch (err) {
            console.log(err)
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

    private async addItems(items: Record<string, any>[]): Promise<Record<string, any>> {
        const result = {}
        try {
            //NetworkLocal.test("Adding items from Media")
            await this.repository.addItems(items);
        } 
        catch (err) {
            console.log(err)
        }
        console.log("Unable to load media")
        return result
    }

    async readItems(params?: string[], op?: Record<string, any>): Promise<Record<string, any>[]> {
        let result: Record<string, any>[] = []
        try {
            result = await this.readItems(params, op)
            return result
            
        }
        catch (err) {
            console.log(err)
            console.log("Unable to load media")
        }
        return result
    }

    /*readItem(collName: string) {
        let item
        try {
            this.repository.readItem(collName).then(res => {
                item = res
            })
        }
        catch(err) {
            console.error(err)
        }

        return item
    }*/
}