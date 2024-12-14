import Utilisateur, { IUtilisateur, IUtilisateurLogin } from '@src/models/Utilisateur';
import { UTILISATEUR_NOT_FOUND_ERR } from '@src/services/UtilisateursService';

// **** Fonctions **** //

/**
 * Récupère l'utilisateur par son identifiant et mot de passe.
 */
async function login(utilisateurConnection: IUtilisateurLogin): Promise<IUtilisateur |  null> {
    const utilisateur = await Utilisateur.findOne({
        $or: [
            { "nom_utilisateur": utilisateurConnection.nom_utilisateur },
            { "email": utilisateurConnection.email }
        ], 
        "mot_de_passe": utilisateurConnection.mot_de_passe
    });
    
    return utilisateur;
}

/**
 * Ajoute un nouveau mot de passe.
 */
async function register(utilisateur: IUtilisateur): Promise<void> {
    const nouvelUtilisateur = new Utilisateur(utilisateur);
    await nouvelUtilisateur.save();
}

/**
 * Modifie un utilisateur existant.
 */
async function update(utilisateur: IUtilisateur): Promise<void> {
    const utilisateurModifie = await Utilisateur.findOne({ "cle_api": utilisateur.cle_api });
    
    if (!utilisateurModifie) {
        throw new Error(UTILISATEUR_NOT_FOUND_ERR);
    }

    // Mise à jour des champs
    utilisateurModifie.nom_utilisateur = utilisateur.nom_utilisateur;
    utilisateurModifie.email = utilisateur.email;
    utilisateurModifie.mot_de_passe = utilisateur.mot_de_passe;
    utilisateurModifie.cle_api = utilisateur.cle_api;
    utilisateurModifie.actif = utilisateur.actif;
    utilisateurModifie.role = utilisateur.role;

    await utilisateurModifie.save();
}

/**
 * Supprime un utilisateur par son identifiant.
 */
async function delete_(cle_api: string): Promise<void> {
    await Utilisateur.findOneAndDelete({ "cle_api": cle_api });
}

/**
 * Vérifie si un utilisateur existe à partir de sa clé API.
 */
async function exists(cle_api: string): Promise<boolean> {
    const utilisateur = await Utilisateur.find({ "cle_api": cle_api });
    return utilisateur.length > 0;
}

// **** Export par défaut **** //

export default {
    login,
    register,
    update,
    delete: delete_,
    exists,
} as const;