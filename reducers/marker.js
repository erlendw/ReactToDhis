export default (state = [], action) => {
  switch (action.type) {
    case 'GET_LOCATION_SUCCESS':
    
        return [...state, action.marker]

    case 'SET_ALL_MARKERS':
    	return action.allMarkers;
    default:
          return state;
  }
};