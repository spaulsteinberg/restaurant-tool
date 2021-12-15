import React from 'react'
import EditIconButton from '../../utility/EditIconButton'

const RestaurantNameDisplay = ({ config, handleSetEditable, previewMode = false }) => {

    return (
        <React.Fragment>
            <div className={previewMode ? "" : "input-container"}>
                <h1 className={`text-${config.color} height-${config.height} weight-${config.weight} font-${config.font}`}>
                    {config.display}
                </h1>
            </div>
            { previewMode ? null : <EditIconButton className="button-styles" text="" onClick={handleSetEditable} />}
        </React.Fragment>
    )
}

export default RestaurantNameDisplay
