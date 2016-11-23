export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_DISTRICT_BORDER_POLYGON':
        return [...state, action.districtBorder]
    case 'UPDATE_DISTRICT_BORDER_POLYGON':
    	return action.polys
    default:
          return state;
  }
};