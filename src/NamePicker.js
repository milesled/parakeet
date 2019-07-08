import React from 'react'
import {FiEdit} from 'react-icons/fi'

function NamePicker({ name, editName, changeName, setEditName }) {
if (editName) {
    return (<div className="edit-username">
      <input placeholder = "Please enter new name" className="name-input"
        onChange={e => changeName(e.target.value)}
      />
      <button style = {{ marginLeft: 10}} className="name-button" 
        onClick={() => setEditName(false)}>
        OK
      </button>
    </div>)
  } else {
    return (<div className="username">
      {name || "Set Username:"}
      <FiEdit className = "icon" style = {{ marginLeft: 10, cursor: 'pointer' } }
        onClick={() => setEditName(true)}
      />
    </div>)
  }
}

export default NamePicker;