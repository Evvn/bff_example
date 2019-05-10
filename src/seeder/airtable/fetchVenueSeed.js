import fetchVenueNames from './fetchVenueNames';
import fetchMenus from './fetchMenus';

const fetchVenueSeed = async (onSuccess) => {
    const onMenuFetchSuccess = async (payload) => {
        onSuccess(payload);
    }
    const onVenueNameFetchSuccess = async (payload) => {
        fetchMenus(payload, onMenuFetchSuccess);
    }
    fetchVenueNames(onVenueNameFetchSuccess)
    
    
}

export default fetchVenueSeed;
