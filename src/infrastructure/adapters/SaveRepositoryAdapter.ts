import {SaveRepositoryPort} from "../../application/ports/outbound/SaveRepositoryPort";
import {Save} from "../../domain/models/Save";
import redis from "../../../db";

class SaveRepo implements SaveRepositoryPort {
    async getSaveById(id: string):  Promise<Save | null>{
        const res = await redis.get(id);
        if(res != null){
            const parsedRes = await JSON.parse(res);
            return {id: id, id_box: parsedRes.id_box, id_map: parsedRes.id_map};
        }
        return null;
    }

    async insertSave(save: Save):  Promise<Save | null>{
        try{
            await redis.set(save.id, JSON.stringify({map: save.id_map, box: save.id_box}));
            return save;
        }catch (e){
            console.error(e);
            return null;
        }
    }

    async updateSave(save: Save):  Promise<Save | null>{
        try{
            await redis.set(save.id, JSON.stringify({map: save.id_map, box: save.id_box}));
            return save;
        }catch (e){
            console.error(e);
            return null;
        }
    }

    async deleteSave(id: string): Promise<string | null>{
        try{
            await redis.del(id);
            return id;
        }catch (e){
            console.error(e);
            return null;
        }
    }
}export default SaveRepo

