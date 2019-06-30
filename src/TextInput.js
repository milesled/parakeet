import React from 'react'

class TextInput extends React.Component {

    render() {
        return(<div className="text-input">     
            <input/>
            <button onClick = 'onButtonClick()'> SEND </button>        
        </div>)
    }
    
    onButtonClick(){
        alert("boop");
    }

}

export default TextInput