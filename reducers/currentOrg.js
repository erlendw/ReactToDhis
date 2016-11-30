
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
