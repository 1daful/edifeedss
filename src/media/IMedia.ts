import { IMediaApi } from "../api/IMediaApi";
import { Media } from "./Media";
export interface IMedia{
    apis: IMediaApi[];
    media: Media;
    readMedia(params?: string[], op?: Record<string, any>): any;
    getMedia(params?: Record<string, any>): any;
}