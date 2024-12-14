/**
 * Express router paths go here.
 */

export default {
  Base: '/api',
  GenerateToken: {
    Base: '/generatetoken',
    Post: '/',
  },
  Users: {
    Base: '/users',
    Add: '/register',
    Update: '/modifier',
    Delete: '/delete/:id',
  },
  MotDePasse: {
    Base: '/motdepasse',
    GetAll: '/all',
    GetID: '/:id',
    GetFiltres: '/filtres',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;
