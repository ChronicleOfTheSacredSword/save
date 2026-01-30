# Service Sauvegarde API
API du service de sauvegarde

## Version: 1.0.0

**Contact information:**  
louys370@gmail.com  

**License:** [Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0.html)

---
## Sauvegarde
Operations sur les sauvegardes du héros

### [GET] /save
**recherche la sauvegarde d'un héros**

En entrant les options appropriés, vous pouvez trouver
les sauvegardes d'un héros d'un joueur.

#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| idUser | query | Identifiant de l'utilisateur | Yes | integer |
| idHero | query | Identifiant du héros | Yes | integer |

#### Responses

| Code | Description | Schema |
| ---- | ----------- | ------ |
| 200 | search results matching criteria | **application/json**: [ [Sauvegarde](#sauvegarde) ]<br> |
| 400 | bad input parameter |  |

### [POST] /save
**ajoute la sauvegarde d'un héros**

#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Sauvegarde](#sauvegarde)<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 201 | sauvegarde ajoutée |
| 400 | invalid input, object invalid |
| 409 | an existing item already exists |

### [PUT] /save
**met à jour la sauvegarde d'un héros**

#### Request Body

| Required | Schema |
| -------- | ------ |
|  No | **application/json**: [Sauvegarde](#sauvegarde)<br> |

#### Responses

| Code | Description |
| ---- | ----------- |
| 201 | sauvegarde mise à jour |
| 400 | invalid input, object invalid |

### [DELETE] /save
**supprime la sauvegarde d'un héros**

En entrant les options appropriés, vous pouvez supprimer
la sauvegarde d'un héros d'un joueur.

#### Parameters

| Name | Located in | Description | Required | Schema |
| ---- | ---------- | ----------- | -------- | ------ |
| idUser | query | Identifiant de l'utilisateur | Yes | integer |
| idHero | query | Identifiant du héros | Yes | integer |

#### Responses

| Code | Description |
| ---- | ----------- |
| 201 | héros supprimé |
| 400 | invalid parameter |
| 404 | le héros n'existe pas |

---
### Schemas

#### Sauvegarde

| Name | Type | Description | Required |
| ---- | ---- | ----------- | -------- |
| id_hero | integer | *Example:* `0` | Yes |
| id_map | integer | *Example:* `0` | Yes |
| id_box | integer | *Example:* `0` | Yes |
