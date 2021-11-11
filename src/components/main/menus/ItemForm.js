import React, {useEffect} from 'react'
import InputBox from '../../utility/InputBox';
import FormSelectBox from '../../utility/FormSelectBox';
import FormGroup from 'react-bootstrap/FormGroup';
import Form from 'react-bootstrap/Form';
import { ITEM_TYPES } from '../../../constants/constants';
import Disclaimer from '../../utility/Disclaimer';

const ItemForm = ({form, handleInputChange, handleFileUpload, mainRef, newForm = null}) => {

    useEffect(() => {
        if (mainRef) {
            mainRef.current.focus();
        }
    }, [mainRef])

    return (
        <Form className="text-reset">
            <FormGroup className="m-1">
                <label>Item Name</label>
                <InputBox name="item" type="text" ref={mainRef} value={form.item} onChange={handleInputChange} disabled={newForm ? false : true} />
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
            <Form.Group className="m-1">
                <label>Add an image: </label>
                <Form.Control type="file" onChange={handleFileUpload}/>
                <Disclaimer classes="text-info">*Please choose a small image with an aspect ratio of 4:3 for the best render</Disclaimer>
            </Form.Group>
        </Form>
    )
}

export default ItemForm;