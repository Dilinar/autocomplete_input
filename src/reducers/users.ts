export default function users(state = {}, action: any) {
  switch (action.type) {
    case 'FETCH_USER_DATA':
      return [ ...action.payload ];

    default:
      return state;
  };
}
