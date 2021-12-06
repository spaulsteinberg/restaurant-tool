import React from 'react'
//import { FormControl, FormGroup, FormLabel } from 'react-bootstrap'

const InputLinks = ({ links }) => {
    return (
        <React.Fragment>
            {/* <FormGroup className="my-2" id="home-links-input">
                <FormLabel>Enter any links you would like to display: </FormLabel>
                <FormControl />
            </FormGroup> */}
            <div id="home-links-input">
                <ol>
                    <li>item 1</li>
                    <li>item 2</li>
                </ol>
            </div>
        </React.Fragment>

    )
}

export default InputLinks
