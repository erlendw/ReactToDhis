
export default (state = false, action) => {
    switch (action.type){
        case 'CHANGEORG_UPDATED':
            return action.payload;
        default : return state;
    }
};
