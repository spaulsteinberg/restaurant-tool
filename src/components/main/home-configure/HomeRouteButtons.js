import React from 'react'
import { useHistory } from 'react-router-dom'
import RouteButtonModal from './create-route-button/RouteButtonModal';
import RouteButton from './RouteButton'

const HomeRouteButtons = ({routeButtons, sm, showModal, handleShowModal, handleClose}) => {

    const history = useHistory();

    const handleOnClickRoute = (event, url) => {
        url && history.push(`${url}`)
    }



    return (
        <div className='mt-2 route-button-container'>
            {
                routeButtons
                .map(btn => <RouteButton key={btn.display} btn={btn} sm={sm} handleClick={handleOnClickRoute} />)
            }
            { showModal ? <RouteButtonModal show={showModal} handleClose={handleClose} data={routeButtons} /> : null}
            { /* add button option here */}
        </div>
    )
}

export default HomeRouteButtons
