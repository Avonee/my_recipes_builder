import React, { useState, useEffect, useCallback } from 'react'
import 'antd/dist/antd.css';
import { Form, Input, Button, message, Modal } from 'antd';
import { useMappedState, useDispatch } from 'redux-react-hook'
import RecipeListItem from './recipe_list_item'
import { showRecipe, fetchStorageRecipes, saveToStorage, searchLists, delItem } from '../actions'
import _ from 'lodash'

export default function FormList(props) {

    const myLists = useMappedState(state => state.recipes.fetchStorageRecipes)
    const searchMyLists = useMappedState(state => state.recipes.searchLists)
    const disPatch = useDispatch()
    const [myTitle, setMyTitle] = useState('')
    const [myIngredients, setMyIngredients] = useState('')
    const [myLink, setMyLink] = useState('')
    const [myImageLink, setMyImageLink] = useState('')
    const [editID, setEditID] = useState(null)
    const [startEdit, setStartEdit] = useState(false)
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [searchItem, setSearchItem] = useState('')

    const loadAll = useCallback(() => {
        disPatch(fetchStorageRecipes())
    }, [])

    useEffect(() => {
        loadAll()
    }, [loadAll])

    const onInputChange = (term) => {
        const debouncedFetchRecipes = _.debounce(term => {
            disPatch(searchLists(term, myLists))
        }, 300)
        setSearchItem(term)
        debouncedFetchRecipes(term)
    }

    const showAddForm = () => {
        setIsModalVisible(true);
        formRef.current.resetFields();
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setStartEdit(false)
    };

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

    const tailLayout = {
        wrapperCol: {
            offset: 8,
            span: 16,
        },
    };

    const onReset = () => {
        formRef.current.resetFields();
    };

    const onInputMyTitle = (myt) => {
        setMyTitle(myt)
    }

    const onInputMyIngredients = (myI) => {
        setMyIngredients(myI)
    }

    const onInputMyLink = (myL) => {
        setMyLink(myL)
    }

    const onInputMyImageLink = (myIL) => {
        setMyImageLink(myIL)
    }

    const saveToStorageRecipes = () => {

        if (myTitle !== '' && myIngredients !== '') {

            let addOne = [{
                "id": (startEdit === false) ? (myLists && myLists.length === null || myLists.length === 0 ? 0 : myLists[myLists.length - 1].id + 1) : editID,
                "title": myTitle,
                "href": myLink ?? "",
                "ingredients": myIngredients,
                "thumbnail": myImageLink ?? "",
                'removeIcon': true,
                'editIcon': true
            }]

            let newList
            if (startEdit === false) {
                newList = myLists.concat(addOne)
            } else {
                setStartEdit(false)
                const index = myLists.findIndex(food => food.id === editID);
                myLists.splice(index, 1, addOne[0])
                newList = myLists
            }

            disPatch(saveToStorage('myDatas', newList))
            loadAll()

        }
        setIsModalVisible(false);
    }

    const editRecipe = (recipe) => {
        formRef.current.setFieldsValue({
            title: recipe.title,
            ingredients: recipe.ingredients,
            link: recipe.href,
            imagelink: recipe.thumbnail
        });
        setMyTitle(recipe.title)
        setMyIngredients(recipe.ingredients)
        setMyLink(recipe.href)
        setMyImageLink(recipe.thumbnail)
        setEditID(recipe.id)
        setStartEdit(true)
        setIsModalVisible(true);

    }

    const removeRecipe = (recipe) => {
        disPatch(delItem(recipe, myLists))
        disPatch(saveToStorage('myDatas', myLists))
        loadAll()
    }

    const getMyRecipeItems = () => {

        if (myLists && myLists.length > 0) {

            let renderLists = []
            if (searchItem !== '') {
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
                        <div style={{ position: 'relative' }}>
                            <div style={{ position: 'absolute', top: -68, right: 0 }}>
                                {myList.editIcon === true ? <img src="../assets/images/edit.png" alt="edit image" onClick={() => editRecipe(myList)}
                                    style={{ width: 40, height: 40, marginRight: 8, padding: 8, marginBottom: 10 }}
                                /> : null}
                                {myList.removeIcon === true ? <img src="../assets/images/close.png" alt="delete image" onClick={() => removeRecipe(myList)}
                                    style={{ width: 40, height: 40, marginRight: 8, padding: 8, marginBottom: 10 }}
                                /> : null}
                            </div>
                        </div>
                    </div>
                )
            }))
        }
    }

    return (
        <Form
            {...layout}
            ref={formRef} name="control-ref"
        >
            <div className="search-bar">
                <input
                    autoFocus
                    value={searchItem}
                    onChange={e => onInputChange(e.target.value)}
                    placeholder="Search By Ingredients..."
                />
            </div>

            <Form.Item {...tailLayout}>
                <Button className='button-add' type="primary" onClick={() => showAddForm()}>ADD</Button>
            </Form.Item>
            <Modal title="Recipe form" visible={isModalVisible}
                onCancel={handleCancel}
                footer={[<Form.Item {...tailLayout}>
                    <Button style={{ marginRight: 8 }} type="primary" htmlType="submit" onClick={() => saveToStorageRecipes()}>Submit</Button>
                    <Button htmlType="button" onClick={() => onReset()}>Reset</Button>
                </Form.Item>]}>
                <Form.Item name="title" label="Recipe Title" rules={[{ required: true }]}>
                    <Input placeholder="e.g spaghetti, sushi, fries" value={myTitle} onChange={e => onInputMyTitle(e.target.value)} />
                </Form.Item>
                <Form.Item name="ingredients" label="Ingredients" rules={[{ required: true }]}>
                    <Input placeholder="e.g onion, garlic, bread, etc" value={myIngredients} onChange={e => onInputMyIngredients(e.target.value)} />
                </Form.Item>
                <Form.Item name="link" label="Recipe Link" rules={[{ required: false }]}>
                    <Input placeholder="recipe link..." value={myLink} onChange={e => onInputMyLink(e.target.value)} />
                </Form.Item>
                <Form.Item name="imagelink" label="Image" rules={[{ required: false }]}>
                    <Input placeholder="recipe image link..." value={myImageLink} onChange={e => onInputMyImageLink(e.target.value)} />
                </Form.Item>
            </Modal>

            <ul className="list-group">
                {getMyRecipeItems()}
            </ul>
        </Form >
    )
}
