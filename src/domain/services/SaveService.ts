import {SaveServicePort} from "../../application/ports/inbound/SaveServicePort";
import {SaveRepositoryPort} from "../../application/ports/outbound/SaveRepositoryPort";
import {Save} from "../models/Save";

export class SaveService implements SaveServicePort {
  constructor(private readonly repo: SaveRepositoryPort) {}

  getSaveById(id_user: number, id_heros: number): Promise<Save | null>{
    return this.repo.findByHeroId(id_user, id_heros);
  }

  postSave(heros: Omit<Save, "id">): Promise<Save>{
    return this.repo.save(heros);
  }

  updateSave(heros: Save): Promise<Save | null>{
    return this.repo.update(heros);
  }

  deleteSave(id_user: number, id_heros: number): Promise<number | null>{
    return this.repo.delete(id_user, id_heros);
  }
}