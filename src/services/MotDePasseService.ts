import { RouteError } from '@src/common/classes';
import HttpStatusCodes from '@src/common/HttpStatusCodes';

import MotDePasseRepo from '@src/repos/MotDePasseRepo';
import { IMotDePasse } from '@src/models/MotDePasse';

// **** Variables **** //

export const MOT_DE_PASSE_NOT_FOUND_ERR = 'Pas de mot de passe trouvé!';

// **** Fonctions **** //

/**
 * Récupère tous les mots de passe.
 */
function getAll(): Promise<IMotDePasse[]> {
  return MotDePasseRepo.getAll();
}

/**
 * Récupère un mot de passe par son identifiant.
 */
function getOneParID(id: string): Promise<IMotDePasse | null> {
  return MotDePasseRepo.getOneParID(id);
}

/**
 * Récupère tous les mots de passe qui correspondent aux filtres :
 *  - associés à l'utilisateur donné
 *  - contenant un des tags mentionnés
 */
function getParFiltres(rechercheText: string, tags: string[]): Promise<IMotDePasse[] | null> {
  console.log("jrenhgyhuweqabgewuh");
  return MotDePasseRepo.getParFiltres(rechercheText, tags);
}

/**
 * Ajoute un nouveau mot de passe.
 */
function add(motDePasse: IMotDePasse): Promise<void> {
  return MotDePasseRepo.add(motDePasse);
}

/**
 * Modifie un mot de passe existant.
 */
async function update(motDePasse: IMotDePasse): Promise<void> {
  const motDePasseModifie = await MotDePasseRepo.exists(motDePasse._id!);
  if (!motDePasseModifie) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, MOT_DE_PASSE_NOT_FOUND_ERR);
  }

  return MotDePasseRepo.update(motDePasse);
}

/**
 * Supprime un mot de passe par son identifiant.
 */
async function _delete(id: string): Promise<void> {
  const motDePasseSupprime = await MotDePasseRepo.exists(id);
  if (!motDePasseSupprime) {
    throw new RouteError(HttpStatusCodes.NOT_FOUND, MOT_DE_PASSE_NOT_FOUND_ERR);
  }

  return MotDePasseRepo.delete(id);
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
