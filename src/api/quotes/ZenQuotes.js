import { Resource } from "../Resource";
import { Axiosi } from "../Axiosi";
import { ApiFormat } from "@/apiReqFormat/ApiFormat";
export class ZenQuotes {
    constructor() {
        this.axios = new Axiosi();
        this.BASE_URL = '';
        this.resources = [];
        this.apiFormat = new ApiFormat();
        this.quoteRes = new Resource(this, 'quotes', {
            name: 'quoteReq',
            baseUrl: '/quotes',
            params: {
                categories: '',
                images: '',
                authors: '',
                random: '',
                tags: ''
            }
        }, 'quoteResp');
        this.qod = new Resource(this, 'qod', {
            name: 'qodReq',
            baseUrl: '/qod',
            params: {}
        }, 'qodResp');
        this.data = {
            quote: 'quote',
            author: 'author',
            tags: [],
            image: 'image'
        };
        this.axios.load('../config.json').then(resp => {
            if (resp) {
                this.config = resp.data;
                this.BASE_URL = this.config.api.ZenQuotes.baseUrl;
                this.BASE_PARAMS = {
                    ID: this.config.api.ZenQuotes.id,
                    KEY: this.config.api.ZenQuotes.key
                };
            }
        });
    }
    async getBaseParams() {
        try {
            const config = await this.axios.load('../config.json');
            const apiBaseParams = config?.data.api.ZenQuotes.baseParams;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    async getBaseUrl() {
        try {
            const config = await this.axios.load('../config.json');
            const apiBaseUrl = config?.data.api.ZenQuotes.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    getData(resp) {
        const respData = [];
        let mData;
        if (resp.name === 'quoteResp')
            for (const data of resp.dataSource) {
                mData = {
                    id: data.id,
                    status: '',
                    privacy: '',
                    tags: '',
                    description: data.q,
                    genre: '',
                    thumbnailSmall: '',
                    thumbnailLarge: '',
                    created: '',
                    license: '',
                    title: '',
                    authors: data.a,
                    printType: ''
                };
                respData.push(mData);
                //this.quoteRes.response.dataList.push(mData);
            }
        return respData;
    }
}
