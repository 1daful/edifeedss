export interface IRepository {
    //setItems(collName: string, items: Record<string, any>[]): void;
    addItem(item: Record<string, any>): Promise<Record<string, any>>;
    addItems(param: Record<string, any>[]): void;
    //readItem(collName: string): Promise<Record<string, any>>;
    readItems(params?: string[], op?: Record<string, any>): Promise<Record<string, any>[]>;
    updateItem(docId: string, param: Record<string, any>): void;
    deleteItem(docId: string): void;
    //setChild(subPath: string, item: Record<string, any>): void;
    find(params: string[], op: Record<string, any>, sort?: string, limit?: number): void
}