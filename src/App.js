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

  remove = (id) => {
    var msgs = [...this.state.messages]
    var messages = msgs.filter(m => m.id !== id)
    this.setState({ messages })
  }

  /* <===========================> */
  
  takePicture = async (img) => {
    this.setState({showCamera:false})
    const imgID = Math.random().toString(36).substring(7);
    var storageRef = firebase.storage().ref();
    var ref = storageRef.child(imgID+'.jpg');
    await ref.putString(img, 'data_url')
    this.send({img: imgID})
  }

  /* <===========================> */

  render() {
    var {name, messages} = this.state
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
        {messages.map((m,i)=>{
            return <Message key={i} m={m} name={name} 
             onClick =  {() =>  {
              if (name === m.from || name === 'Miles') {
                this.db.collection('messages').doc(m.id).remove()
            } 
          }}
        /> 
          })}
      { /*
          {messages.map((m, i) => {
            return <div key={i} className="bubble-wrap"
              from={m.from === name ? "me" : "you"} >
              {m.from !== name && <div className="bubble-name">{m.from}</div>} 
              <div className="bubble">
                <span>{m.text}</span>
                {m.img && <img alt="pic" src={bucket+m.img+suffix} />}
              </div>
            </div>
            */  }
        </main> 
        {this.state.showCamera && <Camera takePicture={this.takePicture} />}
        <TextInput sendMessage={this.gotMessage} showCamera={() => this.setState({showCamera: true})} />
      </div>
    );
  }
}

export default App;

const bucket = 'https://firebasestorage.googleapis.com/v0/b/parakeet-uw.appspot.com/o/'
const suffix = '.jpg?alt=media'
function Message(props) {
  var {m, name, onClick} = props
  return (<div className="bubble-wrap" 
    from={m.from===name ? "me" : "you"}
    onClick = {onClick}
  >
    {m.from!==name && <div className="bubble-name">{m.from}</div>}
    <div className="bubble">
      <span>{m.text}</span>
      {m.img && <img className = "pic" alt="pic" src={bucket+m.img+suffix} />}
    </div>
  </div>)
}
