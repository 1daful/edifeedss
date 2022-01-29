import { Resource } from "../Resource";
//import { Response } from "../Response";
import { Axiosi } from "../Axiosi";
import { ApiFormat } from "@/apiReqFormat/ApiFormat";
export class PaperQuotes {
    constructor() {
        this.axios = new Axiosi();
        this.BASE_URL = '';
        this.resources = [];
        this.apiFormat = new ApiFormat();
        this.quoteRes = new Resource(this, 'quotes', {
            name: 'quoteReq',
            baseUrl: '/quotes/',
            params: {
                categories: '',
                images: '',
                authors: '',
                random: '',
                tags: ''
            }
        }, 'quoteResp');
        this.data = {
            //quote: 'quote',
            author: 'author',
            tags: 'tags',
            image: 'image'
        };
        this.axios.load('../config.json').then(resp => {
            if (resp) {
                this.config = resp.data;
                this.BASE_URL = this.config.api.PaperQuotes.baseUrl;
                this.BASE_PARAMS = {
                    ID: this.config.api.PaperQuotes.id,
                    KEY: this.config.api.PaperQuotes.key
                };
            }
        });
    }
    async getBaseParams() {
        try {
            const config = await this.axios.load('../config.json');
            const apiBaseParams = config?.data.api.PaperQuotes.baseParams;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getBaseUrl() {
        try {
            const config = await this.axios.load('../config.json');
            const apiBaseUrl = config?.data.api.PaperQuotes.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getData(resData) {
        const respData = [];
        let mData;
        for (const data of resData.dataSource) {
            mData = {
                id: data.id,
                status: '',
                privacy: '',
                tags: '',
                description: data.volumeInfo.description,
                genre: data.mainCategory,
                thumbnailSmall: data.imageLinks.thumbnail,
                thumbnailLarge: data.imageLinks.large,
                created: data.volumeInfo.publishedDate,
                license: '',
                title: data.volumeInfo.title,
                authors: data.authors,
                printType: data.printType
            };
            respData.push(mData);
            //this.quoteRes.response.dataList.push(mData);
        }
        return respData;
    }
}
