import { Response } from "./Response";
//import { Utility } from "../Utility";
/**
 *
 * This class reads a media resource api configuration and sets up request format from it.
 * This class prepares the request parameters, and the appropriate response format.
 */
export class Resource {
    constructor(api, type, request, respName) {
        this.api = api;
        this.type = type;
        this.request = request;
        this.response = new Response(respName);
        this.api.resources.push(this);
    }
    //setResponse!: Function
    //util = new Utility()
    /**
     * A private method to construct make resource filters part of the request
     * @param url
     * @param params
     */
    /*private addFilters(url = '', params = {}){
        for (const key in this.params) {
            if (url) {
                url = url + this.params[key]
            }
            else if (params) {
                this.pushObject(params, this.params);
            }
        }
    }
    private addParts(url = '', param = {}){
        for (const key in this.childrens) {
            if (url) {
                url = url + '/'

            }
        }
    }*/
    /*private setResourceData (param: Record<string, any>, resData: Record<string, any>) {
        let newParam: string;
        const obj: Record<string, any> = {};
        Object.keys(resData).forEach(key => {
            let p;
            if (this.isObject(resData[key])){
                for (const key2 in resData[key]){
                    for (p in param){
                        if (p === resData[key][key2]){
                            newParam = newParam + ` ${key2}: ${param[p]} `;
                        }
                    }
                    obj[key] =  newParam;
                }
            }
            else {
                for (p in param){
                    if (p === resData[key]){
                        obj[key] = resData[p];
                    }
                }
            }
        });
        resData = obj;
    }*/
    isObject(obj) {
        return obj instanceof Object && obj.constructor === Object;
    }
    getRequestParam(resData) {
        let newParam = '';
        const param = resData; //Request parameters
        Object.keys(resData).forEach(key => {
            if (this.isObject(resData[key])) {
                const keyse = Object.keys(resData[key]);
                let i = 0; //index has a base value of 0.
                Object.keys(resData[key]).forEach((key2) => {
                    if (i < 1) {
                        newParam = newParam + `${keyse[i]}:${resData[key][key2]}`;
                    }
                    if (i > 0) {
                        newParam = newParam + '&' + `${keyse[i]}:${resData[key][key2]}`;
                    }
                    i++;
                    param[key] = newParam;
                });
            }
        });
        return param;
    }
    /*setResponseData() {
        this.setResourceData(this.response.dataSource, this.response.data);
    }*/
    /**
     * this method appends request parameters to api base parameters
     * @param type type of the resource to retrieve
     */
    async getBaseParam() {
        const obj = {};
        try {
            const apiBaseParams = await this.api.getBaseParams();
            Object.assign(obj, apiBaseParams);
            Object.assign(obj, this.getRequestParam(this.request.params));
            return obj;
        }
        catch (err) {
            console.log;
        }
        //this.util.joinObject(this.api.BASE_PARAMS, this.getRequestParam(this.request.params));
        return obj;
    }
    async getBaseURL() {
        //const ApiBaseURL = this.api.BASE_URL + this.request.baseUrl;
        try {
            const apiBaseUrl = await this.api.getBaseUrl();
            const baseUrl = apiBaseUrl + this.request.baseUrl;
            return baseUrl;
        }
        catch (err) {
            console.log(err);
        }
    }
    /*setDataSource(data: Record<string, any>) {
        this.response.dataSource = data.items;
    }*/
    getResponse(data) {
        //this.setDataSource(data);
        return this.api.getData(data);
    }
}
