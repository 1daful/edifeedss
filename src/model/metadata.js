import { Repository } from "./Repository";
//import { FIRepository } from "./FIRepository";
export class Metadata {
    constructor() {
        /*constructor() {
            this.repository = new FIRepository(db);
        }*/
        this.repository = new Repository('metadata');
    }
    //message!: string;
    saveGenres(items) {
        for (const item of items) {
            if (item.genre) {
                this.repository.addItem({ id: item.genre });
            }
        }
    }
    loadGenres() {
        return this.repository.readItems();
    }
}
