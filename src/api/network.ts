/**
 * Class utility to check for local developer or network developer IDE.
 */
export class NetworkLocal {
    os = require('os')
    static isLoopback = require('is-loopback-addr')
    static onLine = window.navigator.onLine;

    static test(message: string, msg?: string) {
        if (!this.isLoopback(window.location.origin)){
            console.log(message, msg)
            console.log("Network offline:")
            console.log(this.dummyData)
            return this.dummyData
        }
        
    }
    
    private static dummyData = {
        name: "dummyData",
        data: {
            id: 1,
                status: "released",
                privacy: "public",
                tags: ['test', 'dummy variable'],
                description: 'This is a test json data for the ui',
                genre: "Dummy Variable",
                thumbnailSmall: "data_dummy_small.jpg",
                thumbnailLarge: "data.dummy_large",
                created: "01-02-20",
                license: "GPL",
                title: "Dummy Data comes handy",
                authors: {
                    name: "Wonder Ayanfe",
                    pic: "awonder1",
                    bio: "Quality-oriented"
                },
                printType: "papaerback" //book or magazine
            }
    }
}