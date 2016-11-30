
export default (state = [], action) => {
    switch (action.type){
        case 'UPDATE_SEARCH':
            return action.payload;
        default : return state;

    }
};

