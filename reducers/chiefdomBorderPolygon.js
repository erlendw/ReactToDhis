export default (state = [], action) => {

	if(action.type == 'SHOW_ALL_CHILD_POLYGONS'){
		console.log(...state);
		action.polys.forEach((poly)=>{
			console.log("fartbucket");
		});
	}
	


  switch (action.type) {
    case 'ADD_CHIEFDOM_BORDER_POLYGON':  
        return [...state, action.chiefdomBorder] 
    case 'UPDATE_CHIEFDOM_BORDER_POLYGON':
    	return action.polys
    case 'SHOW_ALL_CHILD_POLYGONS':
    	return action.polys
    default:
          return state;
  }
};