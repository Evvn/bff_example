import Airtable from 'airtable';
Airtable.configure(
  {
    apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
    endpointUrl: 'https://api.airtable.com',
  }
);
const base = Airtable.base(process.env.MR_YUM_DB);


const fetchMenus = async (venues, onSuccess) => {
    venues.forEach((venue, index) => {
      let menu = [];
      base('Database')
        .select({
          view: "Grid view",
          filterByFormula: `SEARCH("${venue.NAME}", Venue) = 1`,
          })
        .eachPage(function page(records, fetchNextPage) {

          let sectionNames = records.map((record) => record.Sections);
          sectionNames = [...new Set(sectionNames)];

          let populatedSections = sectionNames.map(sectionName => {
            return {
              name: sectionName,
              items: []
            };
          });

          records.forEach((record) => {
            populatedSections.forEach((section) => {
              if (section.name === record.Sections) {
                section.items.push(record);
              }
            });
          });

          menu.push(populatedSections);
          fetchNextPage();
        }, function done(err){
          onSuccess({
            ID: venue.ID,
            NAME: venue.NAME,
            NAME_NO_SPACE: venue.NAME_NO_SPACE,
            CATEGORY: venue.CATEGORY,
            BANNER_IMAGE: venue.BANNER_IMAGE,
            VERIFIED: venue.VERIFIED,
            AIRTABLE_MENU_PAYLOAD: menu,
        }) });
      }); //End of Venue Loop
    
};

export default fetchMenus;