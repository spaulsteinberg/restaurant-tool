import React, {useEffect, useRef} from 'react'
import { searchIcon } from '../../constants/svg/svgs';
import InputGroup from 'react-bootstrap/InputGroup';
import InputBox from './InputBox';

const InputSearch = props => {
    const ref = useRef();
    useEffect(() => {
        if (props.focus){
            ref.current.focus();
        }
    }, [props.focus])
    return (
        <InputGroup>
            <InputGroup.Text>
                {searchIcon}
            </InputGroup.Text>
            <InputBox {...props} ref={ref} />
        </InputGroup>
    )
}

export default InputSearch
