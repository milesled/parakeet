import React from 'react'
import send from './send.png'

class TextInput extends React.Component {

    render() {
        return(<div contentEditable="true" className="text-input">     
            <img src={send} className="send" alt='send'/>  
        </div>)
    }
}

export default TextInput