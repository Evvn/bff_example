// eslint-disable-next-line import/prefer-default-export

const buildMenuPayload = (data) => {
    if (Object.keys(data).length > 0){
      let payload = data.AIRTABLE_MENU_PAYLOAD[0][0].items;

      const newPayload = {}
      payload.map(item => {
        newPayload[item.id] = item
      });

      data.AIRTABLE_MENU_PAYLOAD[0][0].items = payload;
      return newPayload;
    }

    return data;

}

const buildVenuePayload = (data) => {
  return data.map(datum => {
    delete datum.dataValues.AIRTABLE_MENU_PAYLOAD;
    return datum.dataValues;
  });
}

const airtableTransformer = {
  getMenuData: data => buildMenuPayload(data),
  getVenueList: data => buildVenuePayload(data),
  getVenueNames: data => data.map(datum => datum.NAME_NO_SPACE),
};

export default airtableTransformer;
