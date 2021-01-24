import React, { useState, useEffect, useCallback } from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import _ from 'lodash'
import { fetchRecipes, showRecipe, fetchStorageRecipes, searchLists } from '../actions'
import RecipeListItem from './recipe_list_item'
import 'antd/dist/antd.css';
import { message } from 'antd';

export default function SearchBar(props) {
    const tabNewName = useMappedState(state => state.tabs.newName)
    const myLists = useMappedState(state => state.recipes.fetchStorageRecipes)
    const searchMyLists = useMappedState(state => state.recipes.searchLists)
    const disPatch = useDispatch()
    const [term, setTerm] = useState('')

    const loadAll = useCallback(() => {
        disPatch(fetchRecipes(''))
        disPatch(fetchStorageRecipes())
    }, [])

    useEffect(() => {
        if (tabNewName === '1') {
            loadAll()
        }
    }, [loadAll])

    const search_debouncedFetchRecipes = useCallback(
        _.debounce(term => {
            disPatch(fetchRecipes(term))
            disPatch(searchLists(term, myLists))
        }, 1000), []
    )

    const onInputChange = (term) => {
        setTerm(term)
        search_debouncedFetchRecipes(term)
        // debouncedFetchRecipes(term)
    }

    const getMyRecipeItems = () => {

        if (myLists && myLists.length > 0) {

            let renderLists = []
            if (term !== '') {
                renderLists = searchMyLists
            } else {
                renderLists = myLists
            }

            return (renderLists.map(myList => {
                return (
                    <RecipeListItem
                        recipe={myList}
                        key={myList.id}
                        onRecipeSelect={myList => {
                            if (myList.href.length > 0) {
                                disPatch(showRecipe(myList.href))
                            } else {
                                message.error(`No link here`, 2.5);
                            }
                        }
                        }
                    />
                )
            }))
        }
    }

    return (
        <div>
            <div className="search-bar">
                <input
                    autoFocus
                    value={term}
                    onChange={e => onInputChange(e.target.value)}
                    placeholder="Search By Ingredients..."
                />

            </div>
            <ul className="list-group">
                {getMyRecipeItems()}
            </ul>
        </div>
    )
}