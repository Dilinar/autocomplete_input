import axios from 'axios';

const dataUrl = 'https://jsonplaceholder.typicode.com/users';

export function fetchUserData() {
    return async function(dispatch: any) {
      const response = await axios(dataUrl);
        return dispatch(setUserData(response.data));
      };
    }

function setUserData(data: any) {
  return {
    type: 'FETCH_USER_DATA',
    payload: data
  };
}
