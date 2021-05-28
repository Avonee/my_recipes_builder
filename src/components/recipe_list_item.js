import React from 'react'
import 'antd/dist/antd.css';
import { Card, Col } from 'antd';

const { Meta } = Card;

const RecipeListItem = ({ recipe, onRecipeSelect }) => {
    const { title, thumbnail, ingredients } = recipe

    return (
        <Col className="gutter-row" span={8}>
            <li onClick={() => onRecipeSelect(recipe)} className="list-group-item">
                <Card
                    hoverable
                    style={{ width: 200 }}
                    cover={<img alt="example" src={thumbnail || '../assets/images/logo.png'} />}
                >
                    <Meta className="ingredients" title={title} description={ingredients} />
                </Card>
            </li>
        </Col>
    )
}

export default RecipeListItem
