import mongoose, { Schema, model } from 'mongoose';

// ****** Types ******* //

export interface IUtilisateur {
    nom_utilisateur: string;
    email: string;
    mot_de_passe: string;
    cle_api: string;
    actif: boolean;
    role: number;
    _id?: string;
}

export type IUtilisateurLogin = {
    mot_de_passe: string;
} & (
    | { nom_utilisateur: string; email?: string | undefined }
    | { email: string; nom_utilisateur?: string | undefined }
    | { nom_utilisateur: string; email: string }
);

const UtilisateurSchema = new Schema<IUtilisateur>({
    nom_utilisateur: {
        type: String,
        required: [true, "Le nom de l'utilisateur est obligatoire."],
    },
    email: {
        type: String,
        required: [true, "L'email de l'utilisateur est obligatoire."],
        unique: true,
    },
    mot_de_passe: {
        type: String,
        required: [true, "Le mot de passe de l'utilisateur est obligatoire."],
    },
    cle_api: {
        type: String,
        required: [true, "La clé API de l'utilisateur est obligatoire."],
    },
    actif: {
        type: Boolean,
        required: [true, "Le personnage doit soit être actif ou inactif"],
    },
    role: {
        type: Number,
        required: [true, "Le personnage doit avoir un rôle assigné"],
        min: [0, "L'utilisateur ne peut pas avoir un rôle négatif"],
        max: [2, "L'utilisateur ne peut pas avoir un rôle de plus de 2"],
    }
});

export function isUtilisateur(arg: unknown): arg is IUtilisateur {
    return (
        !!arg &&
        typeof arg === 'object' &&
        
        'nom_utilisateur' in arg && typeof (arg as IUtilisateur).nom_utilisateur === 'string' &&
        'email' in arg && typeof (arg as IUtilisateur).email === 'string' &&
        'mot_de_passe' in arg && typeof (arg as IUtilisateur).mot_de_passe === 'string' &&
        'cle_api' in arg && typeof (arg as IUtilisateur).cle_api === 'string' &&
        'actif' in arg && typeof (arg as IUtilisateur).actif === 'boolean' &&
        'role' in arg && typeof (arg as IUtilisateur).role === 'number' &&
        ('_id' in arg ? typeof (arg as IUtilisateur)._id === 'string' : true)
    );
}

export function isUtilisateurLogin(arg: unknown): arg is IUtilisateurLogin {
    if (!arg || typeof arg !== 'object') return false;

    const obj = arg as Partial<IUtilisateurLogin>;

    if (typeof obj.mot_de_passe !== 'string') return false;

    const hasNomUtilisateur = typeof obj.nom_utilisateur === 'string';
    const hasEmail = typeof obj.email === 'string';

    return hasNomUtilisateur || hasEmail;
}

export default model<IUtilisateur>('Utilisateur', UtilisateurSchema);