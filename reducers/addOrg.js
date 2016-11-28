/**
 * Created by erlend on 16.11.2016.
 */



export default (state = false, action) => {


    switch (action.type){
        case 'ADDORG_UPDATED':
            return action.payload;
        default : return state;
    }
};

/*
export default (state = false, action) => {

    console.log(state)

    switch (action.type){
        case 'ADDORG_UPDATED':
            return action.payload;
        default : return state;
    }
};
*/
