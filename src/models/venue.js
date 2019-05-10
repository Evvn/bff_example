const venue = (sequelize, DataTypes) => {
    const Venue = sequelize.define('venue', {
      ID: {
        type: DataTypes.STRING,
        unique: true,
      },
      NAME: {
        type: DataTypes.STRING,
        unique: true,
      },
      NAME_NO_SPACE: {
        type: DataTypes.STRING,
        unique: true,
      },
      CATEGORY: {
        type: DataTypes.STRING,
        unique: false,
      },
      VERIFIED: {
        type: DataTypes.BOOLEAN,
        unique: false,
      },
      AIRTABLE_MENU_PAYLOAD: {
        type: DataTypes.JSON,
        unique: false,
      },
      BANNER_IMAGE: {
        type: DataTypes.JSON,
        unique: false,
      },
      /*DOSHII_LOCATION_ID: {
        type: DataTypes.STRING,
        unique: false,
      },*/
    });

    /*Venue.associate = models => {
      Venue.hasOne(models.Menu);
    };*/

    /*Venue.associate = models => {
        Venue.hasMany(models.Orders);
      };*/

    Venue.findByID = async ID => {
      let venue = await Venue.findOne({
        where: { ID: ID },
      });

      return venue;
    };

    Venue.findByCategory = async CATEGORY => {
      let venue = await Venue.findAll({
        where: { CATEGORY: CATEGORY },
      });

      return venue;
    };

    Venue.findByNameNoSpace = async NAME_NO_SPACE => {
      let venue = await Venue.findOne({
        where: { NAME_NO_SPACE: NAME_NO_SPACE },
      });

      return venue;
    };

    return Venue;
  };

  export default venue;
