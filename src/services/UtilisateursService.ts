import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import UtilisateurRepo from '@src/repos/UtilisateursRepo';
import { IUtilisateur, IUtilisateurLogin } from '@src/models/Utilisateur';

// **** Variables **** //

export const UTILISATEUR_NOT_FOUND_ERR = 'Utilisateur non trouvé!';

// **** Fonctions **** //

/**
 * Récupère tous les utilisateurs.
 */
function login(utilisateurConnection: IUtilisateurLogin): Promise<IUtilisateur |  null> {
  return UtilisateurRepo.login(utilisateurConnection);
}

/**
 * Ajoute un nouvel utilisateur.
 */
function register(utilisateur: IUtilisateur): Promise<void> {
  return UtilisateurRepo.register(utilisateur);
}

/**
 * Modifie un utilisateur existant.
 */
async function update(utilisateur: IUtilisateur): Promise<void> {
  const utilisateurModifie = await UtilisateurRepo.exists(utilisateur.cle_api);

  if (!utilisateurModifie) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, UTILISATEUR_NOT_FOUND_ERR);
  }

  return UtilisateurRepo.update(utilisateur);
}

/**
 * Supprime un utilisateur par sa cle_api.
 */
async function _delete(cle_api: string): Promise<void> {
  const utilisateurSupprime = await UtilisateurRepo.exists(cle_api);
  if (!utilisateurSupprime) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, UTILISATEUR_NOT_FOUND_ERR);
  }

  return UtilisateurRepo.delete(cle_api);
}

// **** Export par défaut **** //

export default {
  login,
  register,
  update,
  delete: _delete,
} as const;
