export default (state = [], action) => {
  switch (action.type) {
    case 'ADD_CHIEFDOM_BORDER_POLYGON':  
    	console.log("adding one");
        return [...state, action.chiefdomBorder] 
    case 'UPDATE_CHIEFDOM_BORDER_POLYGON':
    	return action.polys
    default:
          return state;
  }
};