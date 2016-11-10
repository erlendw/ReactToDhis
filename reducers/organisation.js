export default (state = [], action) => {


    switch (action.type){

        case 'ORGANISATIONS_RECIEVED':
            return action.payload;

        default : return state;

    }
};

