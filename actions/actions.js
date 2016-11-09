/**
 * Created by erlend on 09.11.2016.
 */


export const updateSearch = (text) => {

    console.log(text)

    return{
        type: "SEARCH_UPDATED",
        payload: text
    }

};