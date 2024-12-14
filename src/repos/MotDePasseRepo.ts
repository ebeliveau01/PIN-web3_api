import MotDePasse, { IMotDePasse } from '@src/models/MotDePasse';

// **** Fonctions **** //

/**
 * Récupère tous les mots de passe.
 */
async function getAll(): Promise<IMotDePasse[]> {
    const motsDePasse = await MotDePasse.find();
    return motsDePasse;
}

/**
 * Récupère un mot de passe par son identifiant.
 */
async function getOneParID(id: string): Promise<IMotDePasse | null> {
    const motDePasse = await MotDePasse.findOne({ "_id": id });
    return motDePasse;
}

/**
 * Récupère tous les mots de passe qui correspondent aux filtres :
 *  - associés à l'utilisateur donné
 *  - contenant un des tags mentionnés
 */
async function getParFiltres(rechercheText: string, tags: string[]): Promise<IMotDePasse[]> {
    const motsDePasse = await MotDePasse.find({
        $or: [
            { notes: rechercheText },
            { titre: rechercheText }
        ],
        "tags": { $in: tags },
    });
    return motsDePasse;
}

/**
 * Ajoute un nouveau mot de passe.
 */
async function add(motDePasse: IMotDePasse): Promise<void> {
    const nouveauMotDePasse = new MotDePasse(motDePasse);
    await nouveauMotDePasse.save();
}

/**
 * Modifie un mot de passe existant.
 */
async function update(motDePasse: IMotDePasse): Promise<void> {
    const motDePasseModifie = await MotDePasse.findById(motDePasse._id);
    if (motDePasseModifie === null) {
        throw new Error('Mot de passe non trouvé');
    }

    // Mise à jour des champs
    motDePasseModifie.titre = motDePasse.titre;
    motDePasseModifie.nom_utilisateur = motDePasse.nom_utilisateur;
    motDePasseModifie.password = motDePasse.password;
    motDePasseModifie.url = motDePasse.url;
    motDePasseModifie.notes = motDePasse.notes;
    motDePasseModifie.dateCreation = motDePasse.dateCreation;
    motDePasseModifie.tags = motDePasse.tags;
    motDePasseModifie.utilisateurId = motDePasse.utilisateurId;

    await motDePasseModifie.save();
}

/**
 * Supprime un mot de passe par son identifiant.
 */
async function delete_(id: string): Promise<void> {
    await MotDePasse.findOneAndDelete({ _id: id });
}

/**
 * Vérifie si un mot de passe existe à partir de son identifiant.
 */
async function exists(id: string): Promise<boolean> {
    const motDePasse = await MotDePasse.findById(id);
    return motDePasse !== null;
}

// **** Export par défaut **** //

export default {
    getAll,
    getOneParID,
    getParFiltres,
    add,
    update,
    delete: delete_,
    exists,
} as const;