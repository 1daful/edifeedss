import axios from 'axios';
import { NetworkLocal } from "./network";
export class Axiosi {
    constructor(resource) {
        this.message = 'Axios request successful!!!';
        this.config = {};
        if (resource) {
            this.resource = resource;
        }
    }
    async get() {
        if (this.resource) {
            //try {
            /*if (params) {
                this.resource.setRequestParam(params);
            }*/
            const baseUrl = await this.resource.getBaseURL();
            //console.log('Axios baseUrl:', baseUrl)
            this.config.params = this.resource.getBaseParam();
            if (baseUrl) {
                const response = await axios.get(baseUrl, this.config)
                    .catch((error) => {
                    if (error.request) {
                        const data = NetworkLocal.test(this.message);
                        if (response) {
                            return this.resource.getResponse(response.data);
                        }
                        else {
                            data;
                        }
                    }
                });
            }
            //return this.resource.response.dataList;
            //}
            /*catch (error) {
                console.error(error)
            }*/
        }
        else {
            console.error('resource value not set');
        }
        const nothing = [];
        return nothing;
    }
    async post(data) {
        if (this.resource) {
            //this.resource.setRequestParam(params);
            //this.resource.setRequestParam(data);
            try {
                const baseUrl = await this.resource.getBaseURL();
                this.config.params = this.resource.getBaseParam();
                if (baseUrl) {
                    const response = await axios.post(baseUrl, data, this.config);
                    NetworkLocal.test(this.message);
                    return this.resource.getResponse(response.data);
                }
                //return this.resource.response.dataList;
            }
            catch (err) {
                console.error(err);
            }
        }
        else {
            console.error('resource value not set');
        }
        const nothing = [];
        return nothing;
    }
    async load(file) {
        try {
            const resp = await axios.get(file);
            //NetworkLocal.test(filthis.message)
            return resp;
        }
        catch (err) {
            console.error(err);
        }
    }
}
