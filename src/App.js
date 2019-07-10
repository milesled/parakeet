import React from 'react';
import './App.css';
import tweet from './parakeet-alt.png'
import TextInput from './TextInput'
import NamePicker from './NamePicker'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

class App extends React.Component {

  state = {
    messages: [],
    /* this is for the namepicker */
    name: 'Miles',
    editName: false,
  }

  /* <===========================> */

  componentWillMount() {
    var name = localStorage.getItem('name')
    if (name)
      this.setState({ name })

    firebase.initializeApp({
      apiKey: "AIzaSyDtusB7wM5VMEnmSHBDzlBPA3kJXMR9X3Y",
      authDomain: "parakeet-uw.firebaseapp.com",
      projectId: "parakeet-uw",
      storageBucket: "parakeet-uw.appspot.com"
    });

    this.db = firebase.firestore();

    this.db.collection("messages").onSnapshot((snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === "added") {
          //console.log(change.doc.data())
          this.receive(change.doc.data())
        }
      })
    })
  }

  /* <===========================> */

  gotMessage = (m) => {
    const message = {
      text: m,
      from: this.state.name
    }
    var newMessagesArray = [message, ...this.state.messages]
    this.setState({ messages: newMessagesArray })
  }

  setEditName = (editName) => {
    if (!editName) {
      localStorage.setItem('name', this.state.name)
    }
    this.setState({ editName })
  }

  /* <=========================> */

  receive = (m) => {
    const messages = [m, ...this.state.messages]
    messages.sort((a, b) => b.ts - a.ts)
    this.setState({ messages })
  }
  send = (m) => {
    this.db.collection("messages").add({
      ...m,
      from: this.state.name || 'No name',
      ts: Date.now()
    })
  }

  /* <===========================> */

  render() {
    var { name, messages } = this.state
    return (
      <div className="App">
        <header className="header">
          <link href="favicon.ico" rel="shortcut icon" type="image/x-icon" />
          <img src={tweet} className="logo" alt="" />
          Parakeet
      <div className="namePicker">
            <NamePicker
              name={this.state.name}
              editName={this.state.editName}
              changeName={name => this.setState({ name })}
              setEditName={this.setEditName} />
          </div>
        </header>
        <main className="messages">
          {messages.map((m, i) => {
            return <div key={i} className="bubble-wrap"
              from={m.from === name ? "me" : "you"} >
              {m.from !== name && <div className="bubble-name">{m.from}</div>}
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