import { IMediaApi } from "../IMediaApi";
import { Resource } from "../Resource";
import {Axiosi} from "../Axiosi";
import { ApiFormat } from "@/apiReqFormat/ApiFormat";
export class Youtube implements IMediaApi{
    constructor() {
        this.axios.load('../config.json').then(resp => {
            if (resp) {
                this.config = resp.data;
                this.BASE_URL = this.config.api.Youtube.baseUrl;
                this.BASE_PARAMS = {
                    ID: this.config.api.Youtube.id,
                    KEY: this.config.api.Youtube.key
                }
            }
        })
    }
    axios = new Axiosi()
    config!: any
    BASE_URL = '';
    BASE_PARAMS: any
    apiFormat = new ApiFormat()

    resources: Resource[] = [];
    videoData: Record<string, any> = {};
    searchData: Record<string, any> = {};

    videoRes = new Resource(this, 'video',
    {
        name: 'videos',
        baseUrl: '/videoRes',
        params: {
            q: '',
            part: {
                snippet: 'data'
            },
            filters: {
                chart: 'chart', //required, mostPopular
                region: 'regionCode',
                ids: 'id'
            },
        }
    }, 'videoResp');

    searchRes = new Resource(this, 'video', {
        name: 'searchReq',
        baseUrl: '/search',
        params: {
            related: 'relatedToId',
            author: 'channelId',
            televised: 'channelType', //any, show
            broadcast: 'eventType', //completed, live, upcoming
            sort: 'order', //date, rating, relevance, title, videoCount, viewCount
            q: 'q',
            category: 'videoCategoryId',
            region: 'regionCode',
        }
    }, 'searchResp')
    async getBaseParams() {
        try{
            const config = await this.axios.load('../config.json')
            const apiBaseParams = config?.data.api.Youtube.baseParams
            return apiBaseParams
        }
        catch (err) {
            console.log(err)
        }
    }
    async getBaseUrl() {
        try{
            const config = await this.axios.load('../config.json')
            const apiBaseUrl = config?.data.api.Youtube.baseUrl
            return apiBaseUrl
        }
        catch (err) {
            console.log(err)
        }
    }

    getData(resp: Record<string, any>) {
        let video: Record<string, any>;
        let videoData;
        let respData: Record<string, any>[] = [];
        if (resp.name === 'videoResp') {
            for (videoData of resp.dataSource) {
                video = {
                    id: videoData.id,
                    title: videoData.snippet.title,
                    duration: videoData.contentDetails.duration,
                    status: videoData.snippet.liveBroadcastContent,
                    privacy: videoData.status.privacyStatus,
                    tags: videoData.snippet.tags,
                    description: videoData.snippet.description,
                    genre: videoData.snippet.categoryId,
                    thumbnailSmall: videoData.snippet.thumbnailSmall,
                    thumbnailLarge: videoData.snippet.thumbnails.high.url,
                    creator: videoData.snippet.channelId,
                    created: videoData.snippet.publishedAt,
                    license: videoData.status.license,
                    source: 'youtube'
                }
                respData.push(video);
            //this.videoRes.response.dataList.push(video);
            }
        }

        else if (resp.name === 'searchResp') {

            for (videoData of resp.dataSource) {
                video = {
                    id: videoData.id.videoId,
                    title: videoData.snippet.title,
                    //duration: videoData.contentDetails.duration,
                    status: videoData.snippet.liveBroadcastContent,
                    //privacy: videoData.status.privacyStatus,
                    //tags: videoData.snippet.tags,
                    //description: videoData.snippet.description,
                    //genre: videoData.snippet.categoryId,
                    thumbnailSmall: videoData.snippet.thumbnails.default.url,
                    thumbnailLarge: videoData.snippet.thumbnails.high.url,
                    creator: videoData.snippet.channelId,
                    created: videoData.snippet.publishedAt,
                    //license: videoData.status.license,
                    source: 'youtube'
                }
            //this.searchRes.response.dataList.push(video);
            respData.push(video)
            }
        }
        return respData
    }

}
