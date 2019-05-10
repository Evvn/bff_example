import Airtable from 'airtable';
Airtable.configure(
  {
    apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
    endpointUrl: 'https://api.airtable.com',
  }
);
const base = Airtable.base(process.env.MR_YUM_ORDERING_DB);

const mapColumns = record => {
    return {
      id: record.id,
      itemOrder: record.get("itemOrder"),
      name: record.get("Item Name"),
      namefr: record.get("name-fr"),
      nameel: record.get("name-el"),
      namezhcn: record.get("name-zh-CN"),
      namees: record.get("name-es"),
      nameit: record.get("name-it"),
      price: record.get("price_discounted"),
      tags: record.get("Tags"),
      itemType: record.get("itemType"),
      filters: record.get("Tags Filtering"),
      image: record.get("Image"),
      description: record.get("Item Description"),
      descriptionfr: record.get("description-fr"),
      descriptionel: record.get("description-el"),
      descriptionzhcn: record.get("description-zh-CN"),
      descriptiones: record.get("description-es"),
      descriptionit: record.get("description-it"),
      imageCredit: record.get("image credit"),
      sections: record.get("Sections"),
      category: record.get("Head Category"),
      addons: record.get("Add-On Group")
    };
  };

  const mapAddonColumns = record => {
    const priceValue = record.get("price_discounted");
    return {
      id: record.id,
      group: record.get("Add-On Group"),
      name: record.get("Add-On Name"),
      required: record.get("Required or Optional"),
      multi: record.get("Single or Multiple Select"),
      dbName: record.get("Database Name"),
      price: Array.isArray(priceValue) ? priceValue[0] : priceValue,
      fields: record.fields
    };
  };

  let baseName = "Database";
const fetchVenueNames = async (onSuccess) => {
    const menu = [];
    base('Database').select({
        view: "Grid view",
        filterByFormula: `OR({Venue} = 'Hopscotch',{Venue} ='Winter Village') = 1`,
    }).eachPage(function(records, fetchNextPage){
        console.log('Fetching Ordering Menu Items...');
        if (!records.length) { return; }
        records.map(record => {
          if (
              baseName.toLowerCase().includes("add-on") &&
              baseName.toLowerCase().includes("group")
            ) {
              onSuccess({
                  ID: record.id,
                  NAME: record.get("Item Name"),
                  URL_NAME: record.get("nameInUrl"),
                  AIRTABLE_MENU_PAYLOAD: mapAddonColumns(record),
              });
            } else {
                onSuccess({
                    ID: record.id,
                    URL_NAME: record.get("nameInUrl"),
                    NAME: record.get("Item Name"),
                    AIRTABLE_MENU_PAYLOAD: mapColumns(record),
                });
            }
        });

        fetchNextPage();
    }, function done(err) {return});
};

export default fetchVenueNames;
