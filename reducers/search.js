/**
 * Created by erlend on 10.11.2016.
 */


export default (state = [], action) => {
    switch (action.type){
        case 'UPDATE_SEARCH':
            return action.payload;
        default : return state;

    }
};

