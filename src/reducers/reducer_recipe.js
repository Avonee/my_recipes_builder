import { SHOW_RECIPE, FETCH_RECIPES, FETCH_STORAGE_RECIPES, SAVE_TO_STORAGE, SEARCH_LISTS, DEL_ITEM } from '../actions/index'
const initialState = {
    fetchRecipes: [],
    fetchStorageRecipes: [],
    searchLists: []
}
const MAX_RESULTS = 20

export default function RecipeReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_RECIPES:
            return {
                ...state,
                fetchRecipes: action.payload.data.results.slice(0, MAX_RESULTS)
            }
        case FETCH_STORAGE_RECIPES:
            return {
                ...state,
                fetchStorageRecipes: action.payload
            }
        case SAVE_TO_STORAGE:
            return state
        case SEARCH_LISTS:
            return {
                ...state,
                searchLists: action.payload
            }
        case DEL_ITEM:
            return {
                ...state
            }
        case SHOW_RECIPE:
            const win = window.open(action.payload, '_blank')
            win.focus()
            return state
        default:
            return state
    }
}
