import Airtable from 'airtable';
Airtable.configure(
  {
    apiKey: process.env.REACT_APP_AIRTABLE_API_KEY,
    endpointUrl: 'https://api.airtable.com',
  }
);
const base = Airtable.base(process.env.MR_YUM_DB);

const fetchVenueNames = async (onSuccess) => {
    const venues = [];
    base('Venues').select({
        view: "Grid view",
    }).eachPage(function(records, fetchNextPage){
        console.log('Fetching Venue Names...');
        records.forEach(function(record) {
            venues.push({
                NAME: record.fields.Name,
                NAME_NO_SPACE: record.fields['nameInUrl'],
                ID: record.fields.record_id,
                CATEGORY: record.fields.category ? record.fields.category[0] : null,
                BANNER_IMAGE: record.fields.bannerImage ? record.fields.bannerImage[0] : null,
                VERIFIED: record.fields.verified ? true : false,
            });
        })
        fetchNextPage();
    }, function done(err) { onSuccess(venues) });
};

export default fetchVenueNames;
