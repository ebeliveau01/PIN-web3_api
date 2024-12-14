import moment from 'moment';
import mongoose, { Schema, model } from 'mongoose'

// ****** Types ******* //

export interface IMotDePasse {
    titre: string;
    nom_utilisateur: string;
    password: string;
    url: string;
    notes: string;
    dateCreation: Date;
    tags: string[];
    utilisateurId: string;
    _id?: string;
}

const MotDePasseSchema = new Schema<IMotDePasse>({
    titre: {
        type: String,
        required: [true, "Le titre du mot de passe est obligatoire."],
        maxlength: [200, "Le titre ne peut pas dépaser 200 caractères de long."],
    },
    nom_utilisateur: {
        type: String,
        required: [true, "Le nom d'utilisateur est obligatoire."],
        maxlength: [100, "Le nom d'utilisateur ne peut pas dépasser les 100 caractères."]
    },
    password: {
        type: String,
        required: [true, "Le mot de passe est obligatoire."]
    },
    url: {
        type: String,
        required: [true, "L'url du site est obligatoire."],
        maxlength: [200, "L'url ne peut pas dépasser les 200 caractères."],
        match: [/^(http|https):\/\/.+\..+/, "L'URL fournie n'est pas valide."]
    },
    notes: {
        type: String,
        required: [true, "Les notes sont obligatoires."]
    },
    dateCreation: {
        type: Date,
        required: [true, "La date de création du mot de passe est obligatoire."],
        default: () => new Date()
    },
    tags: {
        type: [String],
        default: [],
        validate: {
            validator: (tags: string[]) => Array.isArray(tags) && tags.every(tag => typeof tag === 'string'),
            message: "Tous les éléments de 'tags' doivent être des chaînes de caractères."
        }
    },
    utilisateurId: {
        type: String,
        required: [true, "Il est important de connaître à qui appartient ce mot de passe."]
    }
});

export function isMotDePasse(arg: unknown): arg is IMotDePasse {
    return (
        !!arg &&
        typeof arg === 'object' &&
        
        'titre' in arg && typeof arg.titre === 'string' &&
        'nom_utilisateur' in arg && typeof arg.nom_utilisateur === 'string' &&
        'password' in arg && typeof arg.password === 'string' &&
        'url' in arg && typeof arg.url === 'string' &&
        'notes' in arg && typeof arg.notes === 'string' &&
        'dateCreation' in arg && typeof moment(arg.dateCreation as string | Date).isValid() &&
        'tags' in arg && Array.isArray(arg.tags) && arg.tags.every(tag => typeof tag === 'string') &&
        'utilisateurId' in arg && typeof arg.utilisateurId === 'string' &&

        ('_id' in arg ? typeof arg._id === 'string' : true)
    );
}

export default model<IMotDePasse>('Motdepasse', MotDePasseSchema);