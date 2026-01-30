import {Save} from "../../../domain/models/Save";

export interface SaveRepositoryPort {
    findByHeroId(id_user: number, id_heros: number): Promise<Save | null>;
    save(save: Omit<Save, "id_hero">): Promise<Save>;
    update(save: Save): Promise<Save | null>;
    delete(id_user: number, id_heros: number): Promise<number | null>;
}