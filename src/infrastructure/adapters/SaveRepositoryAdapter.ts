import {SaveRepositoryPort} from "../../application/ports/outbound/SaveRepositoryPort";
import {Save} from "../../domain/models/Save";
import db from '../../../db';

class HerosRepo implements SaveRepositoryPort {

    async findByHeroId(id_user: number, id_hero: number): Promise<Save | null> {
        const res = await db.query(
            `
			SELECT
				*
			FROM heroes
			WHERE id_user = $1
			AND id = $2
			`,
            [id_user, id_hero]
        );

        return res.rows[0] ?? null;
    }

    async save(heros: Omit<Save, 'id'>): Promise<Save> {
        const res = await db.query(
            `
			INSERT INTO heroes (
			    id_user,
				name,
				class,
			    pv,
			    atk,
			    lvl,
			    xp,
			    gold
			)
			VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
			RETURNING
				id,
				name
			`,
            [
                heros.id_user,
                heros.name,
                heros.class,
                heros.pv,
                heros.atk,
                heros.lvl,
                heros.xp,
                heros.gold
            ]
        );

        return res.rows[0];
    }

    async update(heros: Save): Promise<Save | null> {
        const res = await db.query(
            `
			UPDATE heroes
			SET name = $1,
			    class = $2,
			    pv = $3,
			    atk = $4,
			    lvl = $5,
			    xp = $6,
			    gold = $7
			WHERE id = $8
			AND id_user = $9
            RETURNING
				id,
				name
			`,
            [
                heros.name,
                heros.class,
                heros.pv,
                heros.atk,
                heros.lvl,
                heros.xp,
                heros.gold,
                heros.id,
                heros.id_user
            ]
        );

        return res.rows[0] ?? null;
    }

    async delete(id_user: number, id_heros: number): Promise<number> {
        const res = await db.query(
            `
			DELETE FROM heroes
			WHERE id = $1
            AND id_user = $2
            RETURNING
				id,
				name
			`,
            [
                id_heros,
                id_user
            ]
        );

        return res.rows[0];
    }

} export default HerosRepo