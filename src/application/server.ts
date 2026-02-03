import express from 'express';
import * as fs from "node:fs";
import * as YAML from 'yaml';
import swaggerUi from 'swagger-ui-express';

import { errorHandler } from "./errorHandling";

import SaveRepo from "../infrastructure/adapters/SaveRepositoryAdapter";
import {SaveService} from "../domain/services/SaveService";
import {SaveController} from "../presentation/controllers/SaveController";


const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:9000' }));


const file  = fs.readFileSync(require.resolve('../api/Save.yml'), 'utf8')
const swaggerDocument = YAML.parse(file)

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


const saveRepo = new SaveRepo();
const saveService = new SaveService(saveRepo);
const saveController = new SaveController(saveService);
saveController.registerRoutes(app);

app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server listening on http://localhost:${port}`);
  console.log(`Swagger docs at http://localhost:${port}/docs`);
});
