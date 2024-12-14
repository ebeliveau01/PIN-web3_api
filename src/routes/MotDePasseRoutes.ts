import HttpStatusCodes from '@src/common/HttpStatusCodes';
import MotDePasseService from '@src/services/MotDePasseService';
import { IMotDePasse, isMotDePasse } from '@src/models/MotDePasse';

import { IReq, IRes } from './common/types';
import check from './common/check';

// **** Fonctions **** //

/**
 * Récupère tous les mots de passe.
 */
async function getAll(_: IReq, res: IRes) {
  const motsDePasse = await MotDePasseService.getAll();
  res.status(HttpStatusCodes.OK).json({ motsDePasse });
}

/**
 * Récupère un mot de passe par son identifiant.
 */
async function getOneParID(req: IReq, res: IRes) {
  const motDePasseID = req.query.id as string;
  const motDePasse = await MotDePasseService.getOneParID(motDePasseID);
  res.status(HttpStatusCodes.OK).json({ motDePasse });
}

/**
 * Récupère les mots de passe correspondant aux filtres donnés :
 *  - associés à un utilisateur spécifique
 *  - et ayant des tags spécifiques
 */
async function getParFiltres(req: IReq, res: IRes) {
  const rechercheText = req.query.recherche as string;
  const tags = req.query.tags as string;

  const motsDePasse = await MotDePasseService.getParFiltres(rechercheText, tags.split(","));
  res.status(HttpStatusCodes.OK).json({ motsDePasse });
}

/**
 * Ajoute un nouveau mot de passe.
 */
async function add(req: IReq, res: IRes) {
  let motDePasse: IMotDePasse;

  /* TODO Adjust the motDePasse userid to suit the id of the user */
  
  if (isMotDePasse(req.body.motDePasse)) {
    motDePasse = req.body.motDePasse;
    await MotDePasseService.add(motDePasse);
    res.status(HttpStatusCodes.CREATED).end();
  }
  else {
    console.log(req.body.motDePasse);
    res.status(HttpStatusCodes.BAD_REQUEST).send({ message: "Le mot de passe n'est pas un mot de passe"});
  }
}

/**
 * Met à jour un mot de passe existant.
 */
async function update(req: IReq, res: IRes) {
  let motDePasse: IMotDePasse;

  if (isMotDePasse(req.body.motDePasse)) {
    motDePasse = req.body.motDePasse;
    await MotDePasseService.update(motDePasse);
    res.status(HttpStatusCodes.OK).end();
  }
  else {
    console.log(req.body.motDePasse);
    res.status(HttpStatusCodes.BAD_REQUEST).send({ message: "Le mot de passe n'est pas un mot de passe"});
  }
}

/**
 * Supprime un mot de passe par son identifiant.
 */
async function _delete(req: IReq, res: IRes) {
  let motDePasseID: string = req.params.id as string;
  await MotDePasseService.delete(motDePasseID);
  res.status(HttpStatusCodes.OK).end();
}

// **** Export par défaut **** //

export default {
  getAll,
  getOneParID,
  getParFiltres,
  add,
  update,
  delete: _delete,
} as const;