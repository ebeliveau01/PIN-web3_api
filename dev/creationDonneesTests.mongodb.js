use('test');

db.getCollection('utilisateurs').insertMany([
    { 
        _id: ObjectId("64e4d0cd8f5b7c9b9b93b3e2"),
        nom_utilisateur: 'Emile', 
        email: 'emile@carrefour.cegepvicto.ca', 
        mot_de_passe: '$2y$10$mrpmAZpcB9r1UEM6d3ghDe03QPogw5sASuIBfdfSJO/HobimOAdIG', // password
        cle_api: "e0bd7062-0585-4250-882c-46720cbea16b",
        actif: true,
        role: 2 // admin
    },
    {
        _id: ObjectId("670f0e0022833c8f51e01a7a"),
        nom_utilisateur: 'John Doe',
        email: 'john.doe@example.com', 
        mot_de_passe: '$2y$10$1Ly7xHGjtjERjj6dR0gzEebza68LeEBV1V9SQUl5xyystAhWZ.NDe', // johndoe
        cle_api: "b53c23a8-75db-4a76-a38b-3a6663fd351b",
        actif: false,
        role: 0 // utilisateur normal
    }
]);

db.getCollection('motdepasses').insertMany([
    {
        titre: "Recherche Google",
        nom_utilisateur: "emile123",
        password: "ENCRYPTED_PASSWORD_1", // Replace with the encrypted version of "password123"
        url: "https://www.google.com",
        notes: "Compte pour la recherche en ligne",
        dateCreation: new Date(),
        tags: ["recherche", "travail"],
        utilisateurId: "64e4d0cd8f5b7c9b9b93b3e2",
    },
    {
        titre: "Facebook",
        nom_utilisateur: "emile.fb",
        password: "ENCRYPTED_PASSWORD_2", // Replace with the encrypted version of "facebookpass"
        url: "https://www.facebook.com",
        notes: "Compte pour les réseaux sociaux",
        dateCreation: new Date(),
        tags: ["réseaux sociaux"],
        utilisateurId: "64e4d0cd8f5b7c9b9b93b3e2",
    },
    {
        titre: "GitHub",
        nom_utilisateur: "johndoe",
        password: "ENCRYPTED_PASSWORD_3", // Replace with the encrypted version of "gitsecure"
        url: "https://www.github.com",
        notes: "Compte pour le code et les projets",
        dateCreation: new Date(),
        tags: ["code", "projet"],
        utilisateurId: "670f0e0022833c8f51e01a7a",
    },
    {
        titre: "Amazon",
        nom_utilisateur: "john.doe123",
        password: "ENCRYPTED_PASSWORD_4", // Replace with the encrypted version of "amazonshopping"
        url: "https://www.amazon.com",
        notes: "Compte pour l'achat en ligne",
        dateCreation: new Date(),
        tags: ["achat", "e-commerce"],
        utilisateurId: "670f0e0022833c8f51e01a7a",
    },
    {
        titre: "Netflix",
        nom_utilisateur: "emile.netflix",
        password: "ENCRYPTED_PASSWORD_5", // Replace with the encrypted version of "netflixstream"
        url: "https://www.netflix.com",
        notes: "Compte pour le streaming et le divertissement",
        dateCreation: new Date(),
        tags: ["divertissement", "streaming"],
        utilisateurId: "64e4d0cd8f5b7c9b9b93b3e2",
    },
    {
        titre: "LinkedIn",
        nom_utilisateur: "emile.pro",
        password: "ENCRYPTED_PASSWORD_6", // Replace with the encrypted version of "linkedinconnect"
        url: "https://www.linkedin.com",
        notes: "Compte pour les réseaux professionnels",
        dateCreation: new Date(),
        tags: ["réseaux professionnels", "carrière"],
        utilisateurId: "64e4d0cd8f5b7c9b9b93b3e2",
    },
    {
        titre: "Spotify",
        nom_utilisateur: "john.music",
        password: "ENCRYPTED_PASSWORD_7", // Replace with the encrypted version of "musiclover123"
        url: "https://www.spotify.com",
        notes: "Compte pour écouter de la musique",
        dateCreation: new Date(),
        tags: ["musique", "divertissement"],
        utilisateurId: "670f0e0022833c8f51e01a7a",
    },
    {
        titre: "Twitter",
        nom_utilisateur: "john.doe_tw",
        password: "ENCRYPTED_PASSWORD_8", // Replace with the encrypted version of "tweetsecure"
        url: "https://www.twitter.com",
        notes: "Compte pour les réseaux sociaux",
        dateCreation: new Date(),
        tags: ["réseaux sociaux", "communication"],
        utilisateurId: "670f0e0022833c8f51e01a7a",
    },
    {
        titre: "Apple",
        nom_utilisateur: "emile.apple",
        password: "ENCRYPTED_PASSWORD_9", // Replace with the encrypted version of "applepass123"
        url: "https://www.apple.com",
        notes: "Compte pour les produits Apple",
        dateCreation: new Date(),
        tags: ["technologie", "produits Apple"],
        utilisateurId: "64e4d0cd8f5b7c9b9b93b3e2",
    },
]);