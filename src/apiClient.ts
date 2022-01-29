//import { Resource } from "./api/Resource";
export interface ApiClient{
    get(params: Record<string,any>): Promise<Record<string,any>>;
    post(data: Record<string,any>, params: Record<string, any>): Promise<Record<string, any>>;
}