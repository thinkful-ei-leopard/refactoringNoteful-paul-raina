import React from 'react'

const ApiContext = React.createContext({
  folders: [],
  notes: [],
  addFolders: () => {},
  addNotes: () => {},
  deleteNote: () => {},
  handleDeleteNote: () => {}
})

export default ApiContext