import React from 'react';
import './App.css';
import tweet from './parakeet-alt.png'
import TextInput from './TextInput'
import NamePicker from './NamePicker'

class App extends React.Component {
  
  state = {
    messages:[],
    /* this is for the namepicker */
    name: ' ',
    editName: false,
  }

  gotMessage = (text) => {
    var newMessagesArray = [...this.state.messages, text]
    this.setState({messages: newMessagesArray})
  }

  setEditName = (truefalse) => {
    this.setState({editName: truefalse});
  }

  render() {
  var {messages} = this.state
  var newName
  return (
    <div className="App">
      <header className="header">
      <img src={tweet} className="logo" alt="" />
        Parakeet
      <NamePicker 
        name={this.state.name} 
        editName={this.state.editName}
        changeName={newName}
        setEditName = {this.setEditName} />
      </header>
      <main className = "messages">
        {messages.map((m, i) => {
          return <div key={i} className="bubble-wrap">
          <div className = "bubble">
            <span>{m}</span>
          </div>
          </div>
        })}
      </main>
      <TextInput sendMessage={this.gotMessage} />
    </div>
  );
  }
}

export default App;