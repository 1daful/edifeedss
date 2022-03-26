import { Resource } from "../Resource";
import { ApiFormat } from "@/apiReqFormat/ApiFormat";
/**
 * This is our transactional email implementation for Mailjet
 */
export class MailjetFunc {
    constructor() {
        this.apiFormat = new ApiFormat();
        this.resources = [];
        this.BASE_URL = '/.netlify/functions';
        this.getContactRes = new Resource(this, 'getContact', {
            name: 'getContactReq',
            baseUrl: '/get-contact',
            params: {
                id: 'id'
            }
        }, 'getContactResp');
        this.postContactRes = new Resource(this, 'postContact', {
            name: 'postContactReq',
            baseUrl: '/post-contact',
            params: {
                id: 'id'
            }
        }, 'postContactResp');
        this.data = {
            id: 'id',
            status: 'state',
            privacy: 'sharing',
            tags: 'tag_list',
            url: 'url',
            description: 'description',
            genre: 'genre',
            thumbnail: 'artwork_url',
            created: 'created_at',
            license: 'license',
            volumeInfo: {
                title: 'title',
                authors: 'authors',
            }
        };
    }
    getBaseUrl() {
        throw new Error("Method not implemented.");
    }
    getBaseParams() {
        throw new Error("Method not implemented.");
    }
    getData(res) {
        const resi = [];
        resi.push(res);
        return resi;
        //throw new Error("Method not implemented.");
    }
    setDataSource(data) {
        this.getContactRes.response.dataSource = data.data;
        this.postContactRes.response.dataSource = data.data;
    }
    setData(resp) {
        let mData;
        for (const data of resp.dataSource) {
            mData = {
                id: data.id,
                name: data.name,
                email: data.email
            };
            resp.dataList.push(mData);
        }
    }
    setResponse(data) {
        this.setDataSource(data);
        this.setData(this.getContactRes.response);
        this.setData(this.postContactRes.response);
    }
}
