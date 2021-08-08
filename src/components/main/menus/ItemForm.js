import React from 'react'
import InputBox from '../../utility/InputBox';
import FormSelectBox from '../../utility/FormSelectBox';
import FormGroup from 'react-bootstrap/FormGroup';
import Form from 'react-bootstrap/Form';
import { ITEM_TYPES } from '../../../constants/constants';


const ItemForm = ({form, handleInputChange}) => {
    return (
        <Form className="text-reset">
            <FormGroup className="m-1">
                <label>Item Name</label>
                <InputBox name="item" type="text" value={form.item} onChange={handleInputChange} disabled />
            </FormGroup>
            <FormGroup className="m-1">
                <label>Description</label>
                <InputBox name="description" type="text" value={form.description} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup className="m-1">
                <label>Price</label>
                <InputBox name="price" type="text" value={form.price} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup className="m-1">
                <label>Category</label>
                <InputBox name="category" type="text" value={form.category} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup className="m-1">
                <label>This Item is a: </label>
                <FormSelectBox options={[...ITEM_TYPES.keys()]} name="type" defaultText={""} defaultValue={""} changeFunction={handleInputChange} defaultDisabled={true} />
            </FormGroup>
        </Form>
    )
}

export default ItemForm;