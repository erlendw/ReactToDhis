export default (state = [], action) => {
	var ut = [...state];
	if(action.type == 'SHOW_ALL_CHILD_POLYGONS'){
		console.log(...state);
		action.polys.forEach((wagner)=>{
			console.log("fartbucket");
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