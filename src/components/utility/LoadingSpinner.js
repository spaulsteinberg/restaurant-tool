import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = ({alignment, children, marginTop = 0, variant = "secondary"}) => {
    let childrenAlignment = alignment === "left" ? "text-left" : alignment === "right" ? "text-right" : "text-center";
    let divAlignment = alignment === "left" ? "start" : alignment === "right" ? "end" : "center";
    return (
        <div style={{textAlign: divAlignment, marginTop: marginTop}}>
            <Spinner animation="border" variant={variant} />
            <div className={childrenAlignment}>
                {children}
            </div>
        </div>
    )
}

export default LoadingSpinner;