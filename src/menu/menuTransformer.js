// eslint-disable-next-line import/prefer-default-export
import wordsToSearch from "../../data/wordsToSearch.json";

const transformMenuItem = menuItem => {
  let description = menuItem.DESCRIPTION.en;
  description = !description ? "" : description;
  const justWords = description.split(" ");

  justWords.map((word, index) => {
    const searchResult = wordsToSearch[word.replace(/[^a-zA-Z ]/g, "")];
    if (searchResult !== undefined && searchResult !== "") {
      justWords[
        index
      ] = `<span class="define" data="${searchResult}">${word}</span>`;
    }
  });

  menuItem.DESCRIPTION_WITH_SPANS = justWords.join(" ");

  return menuItem;
};

const buildMenuPayload = data => {
  console.log("----------- BUILD MENU PAYLOAD -----------");
  console.log(data);

  let payload = data.items;
  const newPayload = {};
  payload.map(item => {
    newPayload[item.ID] = transformMenuItem(item);
  });
  data.items = newPayload;

  return data;
};

const buildVenuePayload = data => {
  return data.map(datum => {
    delete datum.dataValues.AIRTABLE_MENU_PAYLOAD;
    return datum.dataValues;
  });
};

const menuTransformer = {
  getMenuData: data => buildMenuPayload(data),
  getVenueList: data => data,
  getVenueNames: data => data
};

export default menuTransformer;
