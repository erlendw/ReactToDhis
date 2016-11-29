export default (state = [], action) => {
    switch (action.type){
        case 'ORGANISATIONS_RECIEVED':
            return action.payload;
        case 'ADD_ORGANISATION':
            return [...state, action.payload];
        default : return state;

    }
};

