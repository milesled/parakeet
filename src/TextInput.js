import React from 'react'
import sendButton from './send.png'; 

class TextInput extends React.Component {

    state={
        text:"",
    }

    send = (e) => {
        this.props.sendMessage(this.state.text)
        this.setState({ text: "" })
    }

    keyPress = (e) => {
        if(e.key==='Enter'){
            this.send()
        }
    }

    render() {
        var {text} = this.state
        return(<div>
            <input value={text}
                placeholder = "Write your message here!"
                onChange={e=> this.setState({text: e.target.value})}
                onKeyPress = {this.keyPress}
            />
            <button className = "send" onClick={this.send}>
                <img src={sendButton} className='sendButton' alt='send'/> 
            </button>    
        </div>)
    }
}

export default TextInput