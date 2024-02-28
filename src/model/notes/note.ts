import { uid } from "uid";

export default class Note {
    public id: string;
    public title: string;
    public content: string;
    public createdAt: number;
    public updatedAt: number;
    public paletteColor: number;
    public creatorId: string;
    constructor(id?: string, title?: string, content?: string, createdAt?: string | number, updateAt?: string | number, paletteColor?: number, creatorId?: string) {
        this.id = id ?? uid()
        this.title = title ?? "";
        this.content = content ?? "";
        this.createdAt = typeof createdAt == 'string' ? Date.parse(createdAt) : Date.now()
        this.updatedAt = typeof updateAt == 'string' ? Date.parse(updateAt) : Date.now()
        this.paletteColor = paletteColor ?? Math.floor(Math.random() * 12);
        this.creatorId = creatorId ?? "00000000-0000-0000-0000-000000000000";
    }
    static createWithCreatorId(uid: string): Note {
        const note = new Note();
        note.creatorId = uid;
        return note;
    }
}