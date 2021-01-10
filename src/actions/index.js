import axios from 'axios'
export const FETCH_RECIPES = 'fetch_recipes'
export const FETCH_STORAGE_RECIPES = 'fetch_storage_recipes'
export const SAVE_TO_STORAGE = 'save_to_storage'
export const SEARCH_LISTS = 'search_lists'
export const SHOW_RECIPE = 'show_recipe'
export const CHANGE_TAB = 'change_tab'

export function changeTabNumber(newName) {
    return {
        type: CHANGE_TAB,
        payload: { newName: newName },
    }
}

export function fetchStorageRecipes() {
    let loadDatas = JSON.parse(localStorage.getItem('myDatas'))
    return {
        type: FETCH_STORAGE_RECIPES,
        payload: loadDatas
    }
}

export function saveToStorage(saveKey, saveValue) {
    localStorage.setItem(saveKey, JSON.stringify(saveValue))
    return {
        type: SAVE_TO_STORAGE
    }
}

export function searchLists(term, fromLists) {
    const re = new RegExp(`${term}`);
    const sLists = fromLists.filter(record => (record.title.match(re) || record.ingredients.match(re)))
    return {
        type: SEARCH_LISTS,
        payload: sLists
    }
}

export function fetchRecipes(term) {

    return async (dispatch) => {
        // const url = `http://www.recipepuppy.com/api/?q=${term}`
        const url = `/api/?q=${term}`
        const request = await axios.get(url)

        // return request.then(
        //     response => dispatch({
        //         type: FETCH_RECIPES,
        //         // payload: request,
        //         payload: response,
        //     })
        // )

        dispatch({
            type: FETCH_RECIPES,
            payload: request
        })

    }
}

export function showRecipe(url) {
    return {
        type: SHOW_RECIPE,
        payload: url,
    }
}

