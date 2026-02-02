import {SaveRepositoryPort} from "../../application/ports/outbound/SaveRepositoryPort";
import {SaveServicePort} from "../../application/ports/inbound/SaveServicePort";
import {Save} from "../models/Save";

export class SaveService implements SaveServicePort {
    constructor(private readonly repo: SaveRepositoryPort) {}
    getSaveById(id: number): Promise<Save | null>{
        if(id === undefined) {
            throw new Error("A save's id must be provided");
        }
        return this.repo.getSaveById(id);
    }
    insertSave(save: Save):  Promise<Save | null>{
        if(save === undefined) {
            throw new Error("A save must be provided");
        }
        return this.repo.insertSave(save);
    }
    updateSave(save: Save):  Promise<Save | null>{
        if(save === undefined) {
            throw new Error("A save must be provided");
        }
        return this.repo.updateSave(save);
    }
    deleteSave(id: string):  Promise<string | null> {
        if (id === undefined) {
            throw new Error("A save's id must be provided");
        }
        return this.repo.deleteSave(id);
    }
}