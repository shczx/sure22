import React from "react";


function PopUpWindow(props) {
    const { input } = props;
    return (
        <form className="popup" onSubmit={props.handleInput}>
            <label htmlFor="text">Enter a note for your selected text!</label>
            <input id="text" type="text" value={input} onChange={props.handleInputChange} />
            <input id="submit" type="submit" value="Submit" />
        </form>
    )
}

export default PopUpWindow;