// **** Variables **** //

import { IUtilisateurLogin } from '@src/models/Utilisateur';
import UtilisateursService from './UtilisateursService';
import jwt from 'jsonwebtoken';

export const UTILISATEUR_NOT_FOUND_ERR = 'Utilisateur non trouvé';

// **** Functions **** //

/**
 * Générer un jeton pour un utilisateur
 *
 * @param {IUtilisateurLogin} utilisateur - L'utilisateur demandant le jeton
 * @returns {Promise} - Le jeton signé
 */
async function generateToken(utilisateurConnection: IUtilisateurLogin): Promise<{id: string | undefined, token: string}> {
    const utilisateurBD = await UtilisateursService.login(utilisateurConnection);

    if (utilisateurBD) {
        if (utilisateurConnection.nom_utilisateur)
            return {id: utilisateurBD._id, token: jwt.sign(utilisateurConnection.nom_utilisateur, process.env.JWT_SECRET as string)};
        if (utilisateurConnection.email)
            return {id: utilisateurBD._id, token: jwt.sign(utilisateurConnection.email, process.env.JWT_SECRET as string)};
    }
    return {id: "", token: ""};
}

// **** Export default **** //
export default {
  generateToken,
} as const;