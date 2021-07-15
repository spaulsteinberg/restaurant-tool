import React from 'react';
import Spinner from 'react-bootstrap/Spinner';

const LoadingSpinner = ({alignment, children, variant = "secondary"}) => {
    let childrenAlignment = alignment === "left" ? "text-left" : alignment === "right" ? "text-right" : "text-center";
    let divAlignment = alignment === "left" ? "start" : alignment === "right" ? "end" : "center";
    return (
        <div style={{textAlign: divAlignment}}>
            <Spinner animation="border" variant={variant} />
            <div className={childrenAlignment}>
                {children}
            </div>
        </div>
    )
}

export default LoadingSpinner;