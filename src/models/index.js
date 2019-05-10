import Sequelize from 'sequelize';

const sequelize = new Sequelize(`postgres://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@localhost:5432/${process.env.DATABASE}`
);

const models = {
  Venue: sequelize.import('./venue'),
  OrderingMenu: sequelize.import('./orderingMenu'),
  AddOn: sequelize.import('./addOn'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize };

export default models;