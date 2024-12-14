import { Response } from 'supertest';
import { IUtilisateur } from '@src/models/Utilisateur';
import { IMotDePasse } from '@src/models/MotDePasse';


// Misc
export type TReqBody = Record<string, unknown>;
export type TRes = Omit<Response, 'body'> & { body: {
  error?: string;
  message?: string;
  utilisateur?: IUtilisateur
  motdepasse?: IMotDePasse
  motdepasses?: IMotDePasse[]
  utilisateurs?: IUtilisateur[]
  cle_api?: string
}};
export type TApiCb = (res: TRes) => void;
