/**
 * Created by erlend on 28.11.2016.
 */


/**
 * Created by erlend on 16.11.2016.
 */



export default (state = [], action) => {

    switch (action.type){
        case 'CURRENTORG_UPDATED':
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
