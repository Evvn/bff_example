import models from "../models";
import fetchVenueSeed from '../seeder/airtable/fetchVenueSeed.js';
import fetchOrderingSeed from '../seeder/airtable/fetchOrderingMenu';
import fetchAddonSeed from '../seeder/airtable/fetchOrderingAddons.js';
import transformForFrontend from './airtable/transformForFrontend.js';

const seedDatabase = async () => {
    const arr = [];
    const onVenueSuccess = async (payload) => {
        try {
            await models.Venue.create(transformForFrontend(payload));
        } catch(error){
            console.log(`${payload.NAME} threw a(n) ${error}.`)
        }
    };
    const onOrderingMenuSuccess = async (payload) => {
        try {
            await models.OrderingMenu.create(payload);
        } catch(error){
            console.log(`${payload.URL_NAME} threw a(n) ${error}.`)
        }
    };

    const onAddonSuccess = async (payload) => {
        try {
            await models.AddOn.create(payload);
        } catch(error){
            console.log(`${payload.URL_NAME} threw a(n) ${error}.`)
        }
    };

    fetchVenueSeed(onVenueSuccess)
        .then(() => fetchOrderingSeed(onOrderingMenuSuccess))
        .then(() => fetchAddonSeed(onAddonSuccess))
};
export default seedDatabase;