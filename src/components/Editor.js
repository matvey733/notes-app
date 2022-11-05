import React, { useState, useEffect } from "react";

export default function Editor(props) {
    
    console.log(props);
    function toggleDarkMode() {
        props.setDarkMode(prevMode => !prevMode);
    }

    return (
        <div className="editor">
            <div className="top-bar" role="controls-bar">
                <div 
                    className="dark-mode"
                    onClick={toggleDarkMode}
                >
                    <div className="dark-mode-switch">
                        <div className="dark-mode-switch-circle"></div>
                    </div>
                    <div className="dark-mode-label">Dark Mode</div>
                </div>
            </div>

            <div className="editor">
                <textarea 
                    // value={}
                    rows="50"
                    cols="200"
                /> 
            </div>
        </div>
    )
}