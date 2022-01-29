/**
 * Class utility to check for local developer or network developer IDE.
 */
export class NetworkLocal {
    constructor() {
        this.os = require('os');
    }
    static test(message) {
        if (!this.isLoopback(window.location.origin)) {
            console.log("Message from the world: ", message);
            console.log("Network offline:");
            console.log(this.dummyData);
            return this.dummyData;
        }
    }
}
NetworkLocal.isLoopback = require('is-loopback-addr');
NetworkLocal.onLine = window.navigator.onLine;
NetworkLocal.dummyData = {
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
};
