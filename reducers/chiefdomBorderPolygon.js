export default (state = [], action) => {
	var ut = [...state];
	if(action.type == 'SHOW_ALL_CHILD_POLYGONS'){
		action.polys.forEach((wagner)=>{
			ut.push(wagner);
		});
	}


  switch (action.type) {
    case 'ADD_CHIEFDOM_BORDER_POLYGON':  
        return [...state, action.chiefdomBorder] 
    case 'UPDATE_CHIEFDOM_BORDER_POLYGON':
    	return action.polys
    case 'SHOW_ALL_CHILD_POLYGONS':
    	return ut
    default:
          return state;
  }
};