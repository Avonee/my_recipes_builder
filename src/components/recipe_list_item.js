import React from 'react'

const RecipeListItem = ({ recipe, onRecipeSelect }) => {
    const { title, thumbnail, ingredients } = recipe

    return (
        <ul>
            <li onClick={() => onRecipeSelect(recipe)} className="list-group-item">
                <div className="recipe-list-media">
                    <div className="media-left">
                        <img className="media-object" src={thumbnail || '../assets/images/no-image-available.jpg'} />
                    </div>
                    <div className="media-body">
                        <div className="media-heading title">{title}</div>
                        <p>Ingredients: <span className="ingredients">{ingredients}</span></p>
                    </div>
                </div>
            </li>
        </ul>
    )
}

export default RecipeListItem
