import React from 'react';

const TopBarIconShortcut = ({iconData}) => {
    return (
        <div className="top-nav-item">
            <div className="block-svg-wrapper">
                <div className="block-svg-item-icon">
                    {iconData.element}
                </div>
                <div className="block-svg-item-desc">
                    <div>
                        <span className="dash-icon-title">{iconData.title}</span>
                    </div>
                    <div>
                        <span>{iconData.data}</span>
                    </div>
                    <div>
                        <span>{iconData.timeframe}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TopBarIconShortcut;
