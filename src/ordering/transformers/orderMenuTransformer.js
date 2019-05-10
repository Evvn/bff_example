// eslint-disable-next-line import/prefer-default-export

const buildOrderMenuPayload = (data) => {
    const categories = [];
    const menuByCategory = {};
    const menuByItem = {};
    const containerPayload = {};

    data.map(item => {
      const menuData = item.AIRTABLE_MENU_PAYLOAD;
      if(!categories.includes(menuData.category)){
        categories.push(menuData.category);
        menuByCategory[menuData.category] = {};
      }

    });

    data.map(item => {
      const menuData = item.AIRTABLE_MENU_PAYLOAD;
      const wrapper = {};
      const newItem = {
        id: item.ID,
        fields: menuData,
      };
      wrapper[item.ID] = newItem;
      menuByItem[item.ID] = newItem;
      menuByCategory[menuData.category] = {...menuByCategory[menuData.category], ...wrapper};
    });

    containerPayload.menuByCategory = menuByCategory;
    containerPayload.menuByItem = menuByItem;

    return containerPayload;
}


const orderMenuTransformer = {
  getOrderMenuData: data => buildOrderMenuPayload(data),
  getStripeResponse: data => data,
  getSmsResponse: data => data,
};

export default orderMenuTransformer;
