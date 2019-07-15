import React from 'react';
import './App.css';
import tweet from './parakeet-alt.png'
import TextInput from './TextInput'
import NamePicker from './NamePicker'
import Camera from 'react-snap-pic'
import * as firebase from "firebase/app"
import "firebase/firestore"
import "firebase/storage"

class App extends React.Component {

  state = {
    messages: [],
    name: 'Miles',
    editName: false,
    showCamera: false,
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
  
  takePicture = (img) => {
    console.log(img)
    this.setState({showCamera: false})
  }

  /* <===========================> */

  render() {
    var { name, messages} = this.state
    return (
      <div className="App">
        <title>Parakeet App</title>
        <header className="header">
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
        {this.state.showCamera && <Camera takePicture={this.takePicture} />}
        <TextInput sendMessage={this.gotMessage} showCamera={() => this.setState({showCamera: true})} />
      </div>
    );
  }
}

export default App;