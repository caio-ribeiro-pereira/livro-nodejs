module.exports = (app) => {
  const { home } = app.controllers;
  app.get('/', home.index);
};