import {SaveServicePort} from "../../application/ports/inbound/SaveServicePort";
import {Express, Response, Request} from "express";
import {Save} from "../../domain/models/Save";

export class SaveController {
  constructor(private saveService: SaveServicePort) {}

  registerRoutes(app: Express) {
    app.get('/save/:id', this.getSaveById.bind(this));
    app.post('/save', this.insertSave.bind(this));
    app.put('/save', this.updateSave.bind(this));
    app.delete('/save/:id', this.deleteSave.bind(this));
  }

  async getSaveById(req: Request, res: Response) {
    const map: Save | null = await this.saveService.getSaveById(req.params.id);
    if (map) {
      res.status(200).send(map);
    } else {
      res.status(404).send({ message: `Save ${req.params.id} not found` });
    }
  }
  async insertSave(req: Request, res: Response) {
    const created: Save | null = await this.saveService.insertSave(req.body);
    if (created === null) {
      res.status(404).send({ message: "Save could not be inserted" });
    } else {
      res.status(201).send(created);
    }
  }

  async updateSave(req: Request, res: Response) {
    const updated: Save | null = await this.saveService.updateSave(req.body);
    if (updated === null) {
      res.status(404).send({ message: "Save could not be updated" });
    } else {
      res.status(201).send(updated);
    }
  }

  async deleteSave(req: Request, res: Response) {
    const deleted: string | null = await this.saveService.deleteSave(req.params.id);
    if (deleted === null) {
      res.status(404).send({message: `Save ${req.params.id} could not be deleted`});
    } else {
      res.status(200).send({message: `Save ${deleted} deleted`});
    }
  }
}