export class ApiFormat {
    constructor(props = {}) {
        this.title = '';
        this.author = {
            name: '',
            pic: '',
            bio: ''
        };
        this.publisher = {
            name: '',
            logo: '',
            description: ''
        };
        this.topic = '';
        this.isbn = '';
        this.lccl = '';
        this.oclc = '';
        this.format = '';
        this.printType = '';
        this.orderBy = '';
        this.content = '';
        this.date = '';
        this.thumbnail = '';
        this.genre = '';
        this.tags = [];
        this.region = '';
        this.length = '';
        this.parent = '';
        this.description = '';
        Object.assign(this, props);
    }
}
