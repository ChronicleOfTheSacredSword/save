import {Save} from "../../../domain/models/Save";

export interface SaveServicePort {
    getSaveById(id_user: number, id_heros: number): Promise<Save | null>;
    postSave(save: Omit<Save, "id_hero">): Promise<Save>;
    updateSave(save: Save): Promise<Save | null>;
    deleteSave(id_user: number, id_heros: number): Promise<number | null>;
}
