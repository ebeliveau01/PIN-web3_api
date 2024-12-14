import supertest, { Test } from "supertest";
import TestAgent from "supertest/lib/agent";

import app from "@src/server";
import { IUtilisateur } from "@src/models/Utilisateur";
import HttpStatusCodes from "@src/common/HttpStatusCodes";

import Paths from 'spec/support/Paths';
import apiCb from "spec/support/apiCb";
import { TApiCb } from "spec/types/misc";

import UtilisateursRepo from "@src/repos/UtilisateursRepo";
import { ValidationErr } from "@src/common/classes";
import { UTILISATEUR_NOT_FOUND_ERR } from "@src/services/UtilisateursService";

function getDummyUsers(): IUtilisateur[] {
    return [
        {
            nom_utilisateur: 'Emile', 
            email: 'emile@carrefour.cegepvicto.ca', 
            mot_de_passe: '$2y$10$mrpmAZpcB9r1UEM6d3ghDe03QPogw5sASuIBfdfSJO/HobimOAdIG', // password
            cle_api: "e0bd7062-0585-4250-882c-46720cbea16b",
            actif: true,
            role: 2 // admin
        },
        {
            nom_utilisateur: 'John Doe',
            email: 'john.doe@example.com', 
            mot_de_passe: '$2y$10$1Ly7xHGjtjERjj6dR0gzEebza68LeEBV1V9SQUl5xyystAhWZ.NDe', // johndoe
            cle_api: "b53c23a8-75db-4a76-a38b-3a6663fd351b",
            actif: false,
            role: 0 // utilisateur normal
        }
    ];
};

describe('UtilisateurRouter', () => {

    let agent: TestAgent<Test>;
  
    // Run before all tests
    beforeAll(done => {
        agent = supertest.agent(app);
        done();
    });
  
    // Get tous les utilisateurs
    describe(`"GET:${Paths.Users.Get}"`, () => {
        const identifiant:string = "Emile";
        const passwordHash: string = "$2y$10$mrpmAZpcB9r1UEM6d3ghDe03QPogw5sASuIBfdfSJO/HobimOAdIG";

        // Succès
        it('doit retourner un objet JSON utilisateur ' +
            `et un code de "${HttpStatusCodes.OK}" si la requête est réussie.`,
        (done) => {
            const data = getDummyUsers()[0];
            spyOn(UtilisateursRepo, 'login').and.resolveTo(data);

            agent.get(Paths.Users.Get).send({ identifiant, passwordHash })
            .end(apiCb(
                res => {
                    expect(res.status).toBe(HttpStatusCodes.OK)
                    expect(res.body.cle_api).toEqual(data.cle_api);
                    done();
                }
            ));
        });

        // Le corps de la requête est vide
        it('doit retourner un message d\'erreur avec utilisateur et mot de passe requis ' +
            `et un code de "${HttpStatusCodes.BAD_REQUEST}"`,
        (done) => {
            spyOn(UtilisateursRepo, 'login').and.resolveTo();

            agent.get(Paths.Users.Get)
            .end(apiCb(
                res => {
                    expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST)
                    expect(res.body.message).toEqual('Identifiants et mot de passe requis.');
                    done();
                }
            ));
        });

        // Identifiant manquant
        it('doit retourner un message d\'erreur avec utilisateur et mot de passe requis ' +
            `et un code de "${HttpStatusCodes.BAD_REQUEST}"`,
        (done) => {
            spyOn(UtilisateursRepo, 'login').and.resolveTo();

            agent.get(Paths.Users.Get).send({ identifiant })
            .end(apiCb(
                res => {
                    expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST)
                    expect(res.body.message).toEqual('Identifiants et mot de passe requis.');
                    done();
                }
            ));
        });

        // Mot de passe manquant
        it('doit retourner un message d\'erreur avec utilisateur et mot de passe requis ' +
            `et un code de "${HttpStatusCodes.BAD_REQUEST}"`,
        (done) => {
            spyOn(UtilisateursRepo, 'login').and.resolveTo();

            agent.get(Paths.Users.Get).send({ passwordHash })
            .end(apiCb(
                res => {
                    expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST)
                    expect(res.body.message).toEqual('Identifiants et mot de passe requis.');
                    done();
                }
            ));
        });

        // Aucun utilisateur retrouvé
        it('doit retourner un message d\'erreur identifiants incorrects ' +
            `et un code de "${HttpStatusCodes.UNAUTHORIZED}"`,
        (done) => {
            spyOn(UtilisateursRepo, 'login').and.resolveTo(null);

            agent.get(Paths.Users.Get).send({ identifiant: "fhg", passwordHash: "th" })
            .end(apiCb(
                res => {
                    expect(res.status).toBe(HttpStatusCodes.UNAUTHORIZED)
                    expect(res.body.message).toEqual('Identifiants incorrects');
                    done();
                }
            ));
        });
    });
  
    // Ajouter un utilisateur
    describe(`"POST:${Paths.Users.Add}"`, () => {
        const ERROR_MSG = ValidationErr.GetMsg('utilisateur'), UTILISATEUR_BIDON = getDummyUsers()[0];
        
        it(`doit retourner un code de statut "${HttpStatusCodes.CREATED}" si la ` +
        'requête est réussie.',
        (done) => {
            spyOn(UtilisateursRepo, 'register').and.resolveTo();
            
            agent.post(Paths.Users.Add).send({ utilisateur: UTILISATEUR_BIDON })
            .end(apiCb(
                res => {
                    expect(res.status).toBe(HttpStatusCodes.CREATED);
                    done();
                }
            ));
        });

        it(`doit retourner un objet JSON avec un message d'erreur ` +
        `et un code de statut "${HttpStatusCodes.BAD_REQUEST}" si le paramètre utilisateur est manquant.`,
        (done) => {
            agent.post(Paths.Users.Add).send(undefined)
            .end(apiCb(
                res => {
                    expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
                    expect(res.body.message).toBe(ERROR_MSG);
                    done();
                }
            ));
        });
    });
    // Update users
    describe(`"PUT:${Paths.Users.Update}"`, () => {
  
        const ERROR_MSG =  ValidationErr.GetMsg('utilisateur'), UTILISATEUR_BIDON = getDummyUsers()[0];

        it(`doit retourner un code de statut "${HttpStatusCodes.OK}" si la ` +
        'requête est réussie.', (done) => {
            spyOn(UtilisateursRepo, 'update').and.resolveTo();
            spyOn(UtilisateursRepo, 'exists').and.resolveTo(true);
            
            agent.put(Paths.Users.Update).send( { utilisateur: UTILISATEUR_BIDON })
            .end(apiCb(
                res => {
                    expect(res.status).toBe(HttpStatusCodes.OK);
                    done();
                }
            ));
        });

        it(`doit retourner un objet JSON avec un message d'erreur ` +
        `et un code de statut "${HttpStatusCodes.BAD_REQUEST}" si le paramètre utilisateur est manquant.`,
        (done) => {
            agent.put(Paths.Users.Update).send(undefined)
            .end(apiCb(
                res => {
                    expect(res.status).toBe(HttpStatusCodes.BAD_REQUEST);
                    expect(res.body.message).toBe(ERROR_MSG);
                    done();
                }
            ));
        });
    });
  /*
    // Delete User
    describe(`"DELETE:${Paths.Users.Delete}"`, () => {
  
        // Call API
        const callApi = (id: number, cb: TApiCb) => 
        agent
            .delete(insertUrlParams(Paths.Users.Delete, { id }))
            .end(apiCb(cb));
  
        // Success
        it(`should return a status code of "${HttpStatusCodes.OK}" if the ` + 
        'request was successful.', (done) => {
            // Setup spies
            spyOn(UserRepo, 'delete').and.resolveTo();
            spyOn(UserRepo, 'persists').and.resolveTo(true);
            // Call api
            callApi(5, res => {
                expect(res.status).toBe(HttpStatusCodes.OK);
                done();
            });
        });
  
        // User not found
        it('should return a JSON object with the error message of ' + 
        `"${USER_NOT_FOUND_ERR}" and a status code of ` + 
        `"${HttpStatusCodes.NOT_FOUND}" if the id was not found.`, done => {
            // Setup spies
            callApi(-1, res => {
                expect(res.status).toBe(HttpStatusCodes.NOT_FOUND);
                expect(res.body.error).toBe(USER_NOT_FOUND_ERR);
                done();
            });
        });
    });*/
});