import React from 'react'
import { useMappedState, useDispatch } from 'redux-react-hook'
import RecipeListItem from './recipe_list_item'
import { showRecipe } from '../actions'
import 'antd/dist/antd.css';
import { message, Row } from 'antd';

export default function RecipeList(props) {
    const recipes = useMappedState(state => state.recipes.fetchRecipes)
    const disPatch = useDispatch()

    const getRecipeItems = () => {

        if (recipes.length > 0) {

            return (recipes.map(recipe => {
                return (
                    <div>
                        <RecipeListItem
                            recipe={recipe}
                            key={recipe.title}
                            onRecipeSelect={recipe => {
                                if (recipe.href.length > 0) {
                                    disPatch(showRecipe(recipe.href))
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

    return (
        <Row gutter={30}>
            {getRecipeItems()}
        </Row>
    )
}