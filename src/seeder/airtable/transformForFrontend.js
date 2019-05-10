import wordsToSearch from '../../../data/wordsToSearch.json';
import definitions from '../../../data/definitions.json';

const transformMenuItem = (menuItem) => {

   let description = menuItem.fields['Item Description'];
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

  menuItem.fields['Item Description Raw'] = menuItem.fields['Item Description'];
  menuItem.fields['Item Description'] = newDescription;

  return menuItem;

};

const transformForFrontend = (data) => {
    if(data.AIRTABLE_MENU_PAYLOAD[0][0]){
      let payload = data.AIRTABLE_MENU_PAYLOAD[0][0].items;

      try{
      const newPayload = {}
      payload.map(item => {
        newPayload[item.id] = transformMenuItem(item)
      });


      data.AIRTABLE_MENU_PAYLOAD[0][0].items = payload;
    } catch(error){console.log(error)}
    }


    return data;
}

export default transformForFrontend;
