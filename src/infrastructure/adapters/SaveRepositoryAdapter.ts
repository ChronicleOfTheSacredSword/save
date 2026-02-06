import {SaveRepositoryPort} from "../../application/ports/outbound/SaveRepositoryPort";
import {Save} from "../../domain/models/Save";
import {sendLogMessage} from "../../domain/services/sendLogMessage"
import redis from "../../../db";

class SaveRepo implements SaveRepositoryPort {
    async getSaveById(id: number):  Promise<Save | null>{
        const res = await redis.get(id.toString());
        if(res != null){
            const parsedRes = await JSON.parse(res);
            return {id: id, id_box: parsedRes.box, id_map: parsedRes.map};
        }
        return null;
    }

    async insertSave(save: Save):  Promise<Save | null>{
        try{
            await redis.set(save.id.toString(), JSON.stringify({map: save.id_map, box: save.id_box}));

            sendLogMessage({
                id_hero: save.id as number,
                content: `The hero ${save.id} created a new save with coordinate ${save.id_map}-${save.id_box}.`
            }).catch(err => {
                console.error("RabbitMQ log failed:", err.message);
            });

            return save;
        }catch (e){
            console.error(e);
            return null;
        }
    }

    async updateSave(save: Save):  Promise<Save | null>{
        try{
            await redis.set(save.id.toString(), JSON.stringify({map: save.id_map, box: save.id_box}));

            sendLogMessage({
                id_hero: save.id as number,
                content: `The hero ${save.id} updated his save with coordinate ${save.id_map}-${save.id_box}.`
            }).catch(err => {
                console.error("RabbitMQ log failed:", err.message);
            });

            return save;
        }catch (e){
            console.error(e);
            return null;
        }
    }

    async deleteSave(id: string): Promise<string | null>{
        try{
            await redis.del(id);

            sendLogMessage({
                id_hero: Number.parseInt(id),
                content: `The hero ${id} deleted his save`
            }).catch(err => {
                console.error("RabbitMQ log failed:", err.message);
            });

            return id;
        }catch (e){
            console.error(e);
            return null;
        }
    }
}export default SaveRepo

