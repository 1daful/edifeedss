"use strict";
/*import { Resource } from "../Resource";
import { IMediaApi } from "../IMediaApi";
import { Response } from "../Response";*/
/**
 * This is a concrete GoogleBooks class implementation of IMedia
 */
/*export class MailjetFunc  implements IMediaApi{
    resources: Resource[] =[];
    BASE_URL = '/.netlify/functions';
    BASE_PARAMS!: {
        ID: string,
        KEY: string
    }

    getContactRes = new Resource('getContact',
        {
            name: 'getContactReq',
            baseUrl: '/get-contact',
            params: {
                id: 'id'
            }
        },
        'getContactResp',
        
    )
    postContactRes = new Resource('postContact',
        {
            name: 'postContactReq',
            baseUrl: '/post-contact',
            params: {
                id: 'id'
            }
        },
        'postContactResp'
    );

    setDataSource(data: Record<string, any>) {
        this.getContactRes.response.dataSource = data.data;
        this.postContactRes.response.dataSource = data.data;
    }
    setData(resp: Response) {
        let mData: Record<string, any>
        for (const data of resp.dataSource) {
            mData = {
            id: data.id,
            name: data.name,
            email: data.email
            };
            resp.dataList.push(mData);
        }
        
    }
    
    setResponse(data: Record<string, any>) {
        this.setDataSource(data);
        this.setData(this.getContactRes.response);
        this.setData(this.postContactRes.response);
    }

    data = {
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
    }*/ 
