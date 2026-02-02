import {Save} from "../../../domain/models/Save";

export interface SaveServicePort {
    getSaveById(id: number): Promise<Save | null>;
    insertSave(map: Save):  Promise<Save | null>;
    updateSave(map: Save):  Promise<Save | null>;
    deleteSave(id: string):  Promise<string | null>;
}