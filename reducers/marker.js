export default (state = [], action) => {
  switch (action.type) {
    case 'GET_LOCATION_SUCCESS':
    
        return [...state, action.markers]
    default:
          return state;
  }
};