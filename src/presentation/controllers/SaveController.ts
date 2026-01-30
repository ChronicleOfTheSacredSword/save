import { SaveServicePort } from "../../application/ports/inbound/SaveServicePort";
import { Express, Response, Request } from "express";
import { Save } from "../../domain/models/Save";

export class SaveController {
  constructor(private herosServicePort: SaveServicePort) {}

  registerRoutes(app: Express) {
    app.get('/save', this.getSave.bind(this));
    app.post('/save', this.insertSave.bind(this));
    app.put('/save', this.updateSave.bind(this));
    app.delete('/save', this.deleteSave.bind(this));
  }
  // const { title } = req.query; // Accessing query parameters (delete)

  async getSave(req: Request, res: Response) {
    const id_user: number = Number.parseInt(req.query.user as string);
    const id_hero: number = Number.parseInt(req.query.hero as string);

    if (isNaN(id_user) || isNaN(id_hero)){
      res.status(422).send({ message: `Unprocessable Content` });
    }
    else {
      const hero = await this.herosServicePort.getSaveById(id_user, id_hero);
      if (hero) {
        res.status(200).send(hero);
      } else {
        res.status(404).send({ message: `Hero ${id_hero} from User ${id_user} not found` });
      }
    }
  }

  async insertSave(req: Request, res: Response) {
    const created: Save = await this.herosServicePort.postSave(req.body);
    if (created === null) {
      res.status(404).send({ message: "Hero could not be saved" });
    } else {
      res.status(201).send(created);
    }
  }

  async updateSave(req: Request, res: Response) {
    const updated: Save | null = await this.herosServicePort.updateSave(req.body);
    if (updated === null) {
      res.status(404).send({ message: "Hero could not be updated" });
    } else {
      res.status(201).send(updated);
    }
  }

  async deleteSave(req: Request, res: Response) {
    const id_user: number = Number.parseInt(req.query.user as string);
    const id_hero: number = Number.parseInt(req.query.hero as string);

    if (isNaN(id_user) || isNaN(id_hero)){
      res.status(422).send({ message: `Unprocessable Content` });
    }
    else {
      const deleted: number | null = await this.herosServicePort.deleteSave(id_user, id_hero);
      if (deleted === null) {
        res.status(404).send({ message: "Hero could not be deleted" });
      } else {
        res.status(201).send(deleted);
      }
    }
  }
}