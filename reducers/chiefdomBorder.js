export default (state = [], action) => {
  switch (action.type) {
    case 'GET_CHIEFDOM_BORDER_SUCCESS':
    
        return [...state, action.cords]
    default:
          return state;
  }
};