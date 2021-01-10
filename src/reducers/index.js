import { combineReducers } from 'redux'
import RecipeReducer from './reducer_recipe'
import TabReducer from './reducer_tab'

const rootReducer = combineReducers({
    recipes: RecipeReducer,
    tabs: TabReducer
});

export default rootReducer
