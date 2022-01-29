import { IRepository } from "./IRepository";
import { Repository } from "./Repository";
//import { FIRepository } from "./FIRepository";

export class Metadata{
    /*constructor() {
        this.repository = new FIRepository(db);
    }*/
    repository: IRepository = new Repository('metadata');
    //message!: string;

    saveGenres(items: Record<string, any>[]) {
        for (const item of items) {
            if (item.genre) {
                this.repository.addItem({id: item.genre});
            }
        }
    }

    loadGenres() {
        return this.repository.readItems();
    }

}