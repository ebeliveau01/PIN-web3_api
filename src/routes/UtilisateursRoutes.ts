import HttpStatusCodes from '@src/common/HttpStatusCodes';
import UtilisateurService, { UTILISATEUR_NOT_FOUND_ERR } from '@src/services/UtilisateursService';
import { isUtilisateur } from '@src/models/Utilisateur';

import { IReq, IRes } from './common/types';
import check from './common/check';
import { RouteError, ValidationErr } from '@src/common/classes';

// **** Fonctions **** //

/**
 * Ajoute un nouvel utilisateur.
 */
async function register(req: IReq, res: IRes) {
  try {
    const utilisateur = check.isValid(req.body, 'utilisateur', isUtilisateur)

    await UtilisateurService.register(utilisateur);
    res.status(HttpStatusCodes.CREATED).end();
  }
  catch (error: any) {
    res.status(HttpStatusCodes.BAD_REQUEST).json({ message: ValidationErr.GetMsg('utilisateur')}).end();
  }
}

/**
 * Met à jour un utilisateur existant.
 */
async function update(req: IReq, res: IRes) {
  try {
    const utilisateur = check.isValid(req.body, 'utilisateur', isUtilisateur);
    await UtilisateurService.update(utilisateur);
    res.status(HttpStatusCodes.OK).end();
  }
  catch (error: any) {
    if (error.status === 400)
      res.status(HttpStatusCodes.BAD_REQUEST).json({ message: ValidationErr.GetMsg('utilisateur')}).end();
    else if (error.status === 404)
      res.status(HttpStatusCodes.NOT_FOUND).json({ message: UTILISATEUR_NOT_FOUND_ERR}).end();
  }
}

/**
 * Supprime un utilisateur par son identifiant.
 */
async function _delete(req: IReq, res: IRes) {
  const utilisateurID = check.isStr(req.query, 'id');
  await UtilisateurService.delete(utilisateurID);
  res.status(HttpStatusCodes.OK).end();
}

// **** Export par défaut **** //

export default {
  register,
  update,
  delete: _delete,
} as const;
