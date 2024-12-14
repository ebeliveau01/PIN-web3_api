import { Router } from 'express';

import Paths from '../common/Paths';
import MotDePasseRoutes from './MotDePasseRoutes';
import UtilisateursRoutes from './UtilisateursRoutes';
import JetonRoutes from './JetonRoutes';

// **** Variables **** //

const apiRouter = Router();


const motDePasseRouter = Router();

motDePasseRouter.get(Paths.MotDePasse.GetAll, MotDePasseRoutes.getAll);
motDePasseRouter.get(Paths.MotDePasse.GetID, MotDePasseRoutes.getOneParID);
motDePasseRouter.get(Paths.MotDePasse.GetFiltres, MotDePasseRoutes.getParFiltres);
motDePasseRouter.post(Paths.MotDePasse.Add, MotDePasseRoutes.add);
motDePasseRouter.put(Paths.MotDePasse.Update, MotDePasseRoutes.update);
motDePasseRouter.delete(Paths.MotDePasse.Delete, MotDePasseRoutes.delete);

apiRouter.use(Paths.MotDePasse.Base, motDePasseRouter);

const utilisateurRouter = Router();

utilisateurRouter.post(Paths.Users.Add, UtilisateursRoutes.register);
utilisateurRouter.put(Paths.Users.Update, UtilisateursRoutes.update);
utilisateurRouter.delete(Paths.Users.Delete, UtilisateursRoutes.delete);

apiRouter.use(Paths.Users.Base, utilisateurRouter);

const tokenRouter = Router();

tokenRouter.post(Paths.GenerateToken.Post, JetonRoutes.generateToken);

apiRouter.use(Paths.GenerateToken.Base, tokenRouter);

// **** Exportation par défaut **** //

export default apiRouter;
