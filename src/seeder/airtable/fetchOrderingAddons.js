import Airtable from 'airtable';
Airtable.configure(
  {
    apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
    endpointUrl: 'https://api.airtable.com',
  }
);
const base = Airtable.base(process.env.MR_YUM_ORDERING_DB);

  
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

  let baseName = "Add-On By Group";
const fetchAddons = async (onSuccess) => {
    const menu = [];
    base(baseName).select({
        view: "Grid view",
    }).eachPage(function(records, fetchNextPage){
        console.log('Fetching Ordering Menu Addons...');
        if (!records.length) { return; }
        records.map(record => {
          if (
              baseName.toLowerCase().includes("add-on") &&
              baseName.toLowerCase().includes("group")
            ) {
              onSuccess({
                  ID: record.id, 
                  NAME: record.get("Item Name"),
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

export default fetchAddons;

