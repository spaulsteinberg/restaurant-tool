import React from "react";
import Button from 'react-bootstrap/Button';
import LoadingSpinner from "../../utility/LoadingSpinner";
import Alert from 'react-bootstrap/Alert';
import { pencilEditIconPath, checkMarkSavePath, circleSlashForCancelPaths} from '../../../constants/svg/svgs';

const ViewProfileButtons = ({edit, loading, success, error, handleEditClick, handleCancelClick}) => {

    return (
        <React.Fragment>
            <Button variant={!edit ? "warning" : "success"} className="btn mt-3 mb-2 mx-1" onClick={handleEditClick}>
                {!edit ? <svg xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16" fill="black" viewBox="0 0 16 16">
                    <path d={pencilEditIconPath} />
                </svg> : <svg xmlns="http://www.w3.org/2000/svg"
                    width="16" height="16" fill="white" viewBox="0 0 16 16">
                    <path d={checkMarkSavePath} />
                </svg>}
            </Button>
            {edit &&
                <Button variant="danger" className="mt-3 mb-2 mx-1" onClick={handleCancelClick}>
                    {circleSlashForCancelPaths}
                </Button>
            }
            {loading &&
                <div className="profile-form-state-div">
                    <LoadingSpinner alignment="center">Updating...</LoadingSpinner>
                </div>
            }
            {error &&
                <div className="profile-form-state-div">
                    <Alert variant="danger">{error}</Alert>
                </div>
            }
            {success &&
                <div className="profile-form-state-div">
                    <Alert variant="success">{success}</Alert>
                </div>
            }
        </React.Fragment>
    )
}

export default ViewProfileButtons;