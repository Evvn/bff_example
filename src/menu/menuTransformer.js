// eslint-disable-next-line import/prefer-default-export
import wordsToSearch from '../../data/wordsToSearch.json';
import definitions from '../../data/definitions.json';

const transformMenuItem = (menuItem) => {

  let description = menuItem.DESCRIPTION.en;
  description = !description ? '' : description;
  const justWords = description.split(' ');
  const definedWords = [];
  const wordDictionary = {};

  justWords.map(word =>{
   const searchResult = wordsToSearch[word.replace(/[^a-zA-Z ]/g,'')];
   wordDictionary[word] = (searchResult && searchResult !== '') ? searchResult : false;
  });


  let newDescription = '';
  Object.keys(wordDictionary).map(word => {
   if(wordDictionary[word]){
     if(!definedWords.includes(word)){
       newDescription = newDescription +
         ` <span class="define" data="${wordDictionary[word]}">${word}</span>`;
       definedWords.push(word);
     }
    }
    else{
      newDescription = newDescription + ' ' + word;
    }

  });

 menuItem.DESCRIPTION_WITH_SPANS = newDescription;

 return menuItem;

};

const buildMenuPayload = (data) => {
    let payload = data.items;
    const newPayload = {}
    payload.map(item => {
      newPayload[item.ID] = transformMenuItem(item)
    });
    data.items = newPayload;

    return data;

}

const buildVenuePayload = (data) => {
  return data.map(datum => {
    delete datum.dataValues.AIRTABLE_MENU_PAYLOAD;
    return datum.dataValues;
  });
}

const menuTransformer = {
  getMenuData: data => buildMenuPayload(data),
  getVenueList: data => data,
  getVenueNames: data => data,
};

export default menuTransformer;
