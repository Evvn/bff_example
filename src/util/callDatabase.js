import axios from 'axios';
import mockMenu from './mockMenu.json';

const callDatabase = async (route, onSuccess) => {
    try {
        let res;
        if(process.env.ENV_NAME === 'MEMORY'){
            res = {data: mockMenu};
        }
        else{
            const res = await axios.get(
            `${process.env.MR_YUM_DATABASE_SERVER}/${route}`,{
                headers: {
                "Content-Type" : 'application/json',
                // Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`
                }
            }
            ); 
        }
        onSuccess(res.data);
    } catch (error) {
        console.error(`Error: ${error}`);
        onSuccess(error);
    }
};

export default callDatabase;