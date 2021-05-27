import React, { useState, useEffect, useCallback } from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import _ from 'lodash'
import { showRecipe, fetchFavorRecipes, searchLists } from '../actions'
import RecipeListItem from './recipe_list_item'
import RecipeList from './recipe_list'
import 'antd/dist/antd.css';
import { message, Form, Row } from 'antd';

export default function FavorList(props) {
    const tabNewName = useMappedState(state => state.tabs.newName)
    const myLists = useMappedState(state => state.recipes.fetchFavorRecipes)
    const searchMyLists = useMappedState(state => state.recipes.searchLists)
    const disPatch = useDispatch()
    const [term, setTerm] = useState('')

    const loadAll = useCallback(() => {
        disPatch(fetchFavorRecipes())
    }, [])

    useEffect(() => {
        if (tabNewName === '2') {
            loadAll()
        }
    }, [loadAll])

    const search_debouncedFetchRecipes = useCallback(
        _.debounce(term => {
            // disPatch(fetchRecipes(term))
            disPatch(searchLists(term, myLists))
        }, 1000), []
    )

    const onInputChange = (term) => {
        setTerm(term)
        search_debouncedFetchRecipes(term)
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
                    <div>
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
                    </div>
                )
            }))
        }
    }

    const formRef = React.createRef();

    const layout = {
        labelCol: {
            span: 8,
            margin: 20
        },
        wrapperCol: {
            span: 16,
            margin: 20
        },
    };

    return (
        <Form
            {...layout}
            ref={formRef} name="control-ref"
        >
            <div className="search-bar">
                <input
                    autoFocus
                    value={term}
                    onChange={e => onInputChange(e.target.value)}
                    placeholder="Search By Ingredients..."
                />
            </div>
            <Row gutter={30}>
                {getMyRecipeItems()}
            </Row>
            <RecipeList />
        </Form >
    )
}