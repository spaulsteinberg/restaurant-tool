import React from 'react'
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import { HOME_MODAL_ACTIONS } from '../../../../constants/constants';

const RouteButtonActions = ({ showActions, mode, handleNextClick, handleBackClick, hsncfe, hsbcfe, showEditForm, hasButtons = true }) => {

    return (
        <React.Fragment>
            {
                showActions && <DialogActions><Button variant='primary' onClick={handleNextClick}>Next</Button></DialogActions>
            }
            {
                !showActions && mode === HOME_MODAL_ACTIONS.ADD && <DialogActions className="justify-content-start"><Button variant='primary' onClick={handleBackClick}>Back</Button></DialogActions>
            }
            {
                !showActions && mode === HOME_MODAL_ACTIONS.EDIT &&
                    <DialogActions className="justify-content-between">
                        { <Button variant='primary' onClick={showEditForm ? hsbcfe : handleBackClick}>Back</Button> }
                        { hasButtons && !showEditForm && <Button variant='primary' onClick={hsncfe}>Next</Button>}
                    </DialogActions>
            }
        </React.Fragment>
    )
}

export default RouteButtonActions
