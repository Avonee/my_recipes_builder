import { CHANGE_TAB } from '../actions/index'
const initialState = {
    newName: '1'
}
export default function TabReducer(state = initialState, action) {
    switch (action.type) {
        case CHANGE_TAB:
            return {
                ...state,
                newName: action.payload.newName
            }
        default:
            return state
    }
}