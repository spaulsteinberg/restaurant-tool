import React from 'react'
import { Button } from 'react-bootstrap'

const RouteButton = ({btn, sm, handleClick}) => {
    return (
        <Button 
            variant={btn.background} 
            className={`mx-${btn.margin} border-${btn.border} text-${btn.text} route-button-${btn.hoverBackground}`} 
            size={sm ? "sm" : null}
            onClick={e => handleClick(e, btn.route)}>
            {btn.display}
        </Button>
    )
}

export default RouteButton
