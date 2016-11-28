export default (state = false, action) => {
    switch (action.type){
        case 'SHOW_HELP_MODAL':
            return action.payload;
        default : return state;
    }
};
