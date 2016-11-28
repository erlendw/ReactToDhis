/**
 * Created by erlend on 27.11.2016.
 */


/**
 * Created by erlend on 16.11.2016.
 */
export default (state = false, action) => {
    switch (action.type){
        case 'CHANGEORG_UPDATED':
            console.log(action.type)
            return action.payload;
        default : return state;
    }
};
