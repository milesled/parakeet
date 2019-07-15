import React from 'react'
import sendButton from './send.png'; 
import {FiCamera} from 'react-icons/fi'

class TextInput extends React.Component {

    state={
        text:"",
    }

    send = (e) => {
        if (this.state.text !== "") {
        this.props.sendMessage(this.state.text)
        this.setState({ text: "" })
        }
    }

    keyPress = (e) => {
        
        if(e.key==='Enter'){
            this.send()
        }
    }

    render() {
        var {text} = this.state
        return(<div>
            <input className = "text-input" value={text}
                placeholder = "Write your message here!"
                onChange={e=> this.setState({text: e.target.value})}
                onKeyPress = {this.keyPress}
            />
            <button className = "send" onClick={this.send}>
                <img src={sendButton} className='sendButton' alt='send'/> 
            </button>  
            <button className = "pic-button" onClick={ this.props.showCamera }> <FiCamera className="cam-button"/> </button>
        </div>)
    }
}

export default TextInput