export class BookFormat {
    constructor(props = {}) {
        this.tag = '';
        this.title = '';
        this.author = '';
        this.publisher = '';
        this.topic = '';
        this.isbn = '';
        this.lccl = '';
        this.oclc = '';
        this.format = '';
        this.printType = '';
        this.orderBy = '';
        Object.assign(this, props);
    }
}
