import Sequelize from 'sequelize';

const addOn = (sequelize, DataTypes) => {
    const AddOn = sequelize.define('addOn', {
      ID: {
        type: DataTypes.STRING,
        unique: true,
      },
      NAME: {
        type: DataTypes.STRING,
        unique: false,
      },
      AIRTABLE_MENU_PAYLOAD: {
        type: DataTypes.JSON,
        unique: false,
      },

    });

    AddOn.findByIDs = async whereClause => {
      let addOn = await AddOn.findAll({
        where: {
          ID: whereClause.length === 1 ? whereClause[0] : {
            [Sequelize.Op.or]: whereClause,
          }
        }
      });

      return addOn;
    };

    return AddOn;
  };

  export default addOn;
