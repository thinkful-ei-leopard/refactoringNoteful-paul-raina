import React from 'react'

const ApiContext = React.createContext({
  folders: [],
  notes: [],
  addFolders: () => {},
  addNotes: () => {},
  deleteNote: () => {}
})

export default ApiContext