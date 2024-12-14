import JetonService from '@src/services/JetonService';
import { isUtilisateurLogin } from '@src/models/Utilisateur';
import { IReq, IRes } from './common/types';
import check from './common/check';
// **** Functions **** //

/**
 * Générer un jeton.
 *
 * @param {IReq} req - La requête au serveur
 * @param {IRes} res - La réponse du serveur
 */
async function generateToken(req: IReq, res: IRes) {
  const utilisateur = check.isValid(req.body, 'utilisateur', isUtilisateurLogin);
  const token = await JetonService.generateToken(utilisateur);
  res.send(token);
}

// **** Export default **** //

export default {
  generateToken,
} as const;