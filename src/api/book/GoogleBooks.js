import { Resource } from "../Resource";
import { Axiosi } from "../Axiosi";
import { ApiFormat } from "../../apiReqFormat/ApiFormat";
/**
 * This is a concrete GoogleBooks class implementation of IMedia
 */
export class GoogleBooks {
    constructor() {
        this.axios = new Axiosi();
        this.resources = [];
        this.apiFormat = new ApiFormat();
        this.volumeRes = new Resource(this, 'books', {
            name: 'volumeReq',
            baseUrl: '/volumes',
            params: {
                q: {
                    intitle: this.apiFormat.title || '',
                    inauthor: this.apiFormat.author || '',
                    inpublisher: this.apiFormat.publisher || '',
                    subject: this.apiFormat.genre || '',
                    isbn: this.apiFormat.isbn || '',
                    lccn: this.apiFormat.lccl || '',
                    oclc: this.apiFormat.oclc || ''
                },
                download: this.apiFormat.format || '',
                filter: '',
                printType: this.apiFormat.printType || '',
                projection: '',
                orderBy: this.apiFormat.orderBy || '',
            }
        }, 'volumeResp');
    }
    /*setDataSource(data: Record<string, any>) {
        this.volumeRes.response.dataSource = data.items;
    }*/
    async getBaseUrl() {
        try {
            const config = await this.axios.load('../config.json');
            const apiBaseUrl = config?.data.api.GoogleBooks.baseUrl;
            return apiBaseUrl;
        }
        catch (err) {
            console.log(err);
        }
        /*.then(resp => {
            if (resp) {
                this.config = resp.data;
                console.log('axios load working', this.config.api.GoogleBooks.baseUrl)
                this.BASE_URL = this.config.api.GoogleBooks.baseUrl;
                this.BASE_PARAMS =  {
                    ID: this.config.api.GoogleBooks.id,
                    KEY: this.config.api.GoogleBooks.key
                }
            }
        })*/
    }
    async getBaseParams() {
        try {
            const config = await this.axios.load('../config.json');
            const apiBaseParams = config?.data.api.GoogleBooks.baseParams;
            return apiBaseParams;
        }
        catch (err) {
            console.log(err);
        }
    }
    getData(resData) {
        let respData = [];
        let mData;
        for (const data of resData.items) {
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
                authors: {
                    name: data.authors,
                    pic: '',
                    bio: ''
                },
                printType: data.printType //book or magazine
            };
            //this.volumeRes.response.dataList.push(mData);
            respData.push(mData);
        }
        return respData;
    }
}
