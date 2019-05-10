const orderingMenu = (sequelize, DataTypes) => {
    const OrderingMenu = sequelize.define('orderingMenu', {
      ID: {
        type: DataTypes.STRING,
        unique: true,
      },
      NAME: {
        type: DataTypes.STRING,
        unique: false,
      },
      URL_NAME: {
        type: DataTypes.STRING,
        unique: false,
      },
      AIRTABLE_MENU_PAYLOAD: {
        type: DataTypes.JSON,
        unique: false,
      },

    });

    OrderingMenu.findByUrl = async URL_NAME => {
      let orderingMenu = await OrderingMenu.findAll({
        where: { URL_NAME: URL_NAME },
      });

  
      return orderingMenu;
    };
  
    return OrderingMenu;
  };
  
  export default orderingMenu;