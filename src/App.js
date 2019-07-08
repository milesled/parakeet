import React from 'react';
import './App.css';
import tweet from './parakeet-alt.png'
import TextInput from './TextInput'
import NamePicker from './NamePicker'

class App extends React.Component {

  state = {
    messages: [],
    /* this is for the namepicker */
    name: 'Miles',
    editName: false,
  }

  gotMessage = (l) => {
    const message = {
      text: l,
      from: this.state.name
    }
    var newMessagesArray = [message, ...this.state.messages]
    this.setState({ messages: newMessagesArray })
  }

  render() {
    var { messages } = this.state
    return (
      <div className="App">
        <header className="header">
          <img src={tweet} className="logo" alt="" />
          Parakeet
      <div className="namePicker">
            <NamePicker
              name={this.state.name}
              editName={this.state.editName}
              changeName={name => this.setState({ name })}
              setEditName={editName => this.setState({ editName })} />
          </div>
        </header>
        <main className="messages">
          {messages.map((m, i) => {
            return <div key={i} className="bubble-wrap">
                {m.from}
              <div className="bubble">
                <span>{m.text}</span>
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