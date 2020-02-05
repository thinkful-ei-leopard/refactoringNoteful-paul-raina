import React from 'react'
import Note from '../Note/Note'
import './NotePageMain.css'
import ApiContext from '../ApiContext'

class NotePageMain extends React.Component {
  static defaultProps = {
    note: {
      content: '',
    }
  }
  static contextType = ApiContext


  render() {
    const { note } = this.props
    return (
      <section className='NotePageMain'>
        <Note
          id={note.id}
          name={note.name}
          modified={note.modified}
          deleteNote={this.handleDeleteNote}
          history={this.props.history}
        />
        <div className='NotePageMain__content'>
          {note.content.split(/\n \r|\n/).map((para, i) =>
            <p key={i}>{para}</p>
          )}
        </div>
      </section>
    )
  }
}


export default NotePageMain