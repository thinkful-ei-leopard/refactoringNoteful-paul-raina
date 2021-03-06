import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import NoteListNav from '../NoteListNav/NoteListNav';
import NotePageNav from '../NotePageNav/NotePageNav';
import NoteListMain from '../NoteListMain/NoteListMain';
import NotePageMain from '../NotePageMain/NotePageMain';
import {getNotesForFolder, findNote, findFolder} from '../notes-helpers';
import './App.css';
import ApiContext from '../ApiContext'

class App extends Component {
    state = {
        notes: [],
        folders: []
    };

    static contextType = ApiContext

    componentDidMount() {
        const API_ENDPOINT = 'http://localhost:9090'

        fetch(`${API_ENDPOINT}/folders`)
        .then(res => {
            if (!res.ok) {
              // get the error message from the response,
              throw new Error('there was an error');
            }
            return res.json()
          })
          .then((data) => {
              this.setState({
                  folders: data
              })
          })
          .catch(err => {
            console.error()
        })

        fetch(`${API_ENDPOINT}/notes`)
        .then(res => {
            if (!res.ok) {
              // get the error message from the response,
              throw new Error('there was an error');
            }
            return res.json()
          })
          .then((data) => {
              this.setState({
                  notes: data
              })
          })
          .catch(err => {
            console.error()
        })

        


        // fake date loading from API call
        // setTimeout(() => this.setState(dummyStore), 600);
    }


    renderNavRoutes() {
        const {notes, folders} = this.state;
        
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => (
                            <NoteListNav
                                folders={folders}
                                notes={notes}
                                {...routeProps}
                            />
                        )}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId) || {};
                        const folder = findFolder(folders, note.folderId);
                        return <NotePageNav {...routeProps} folder={folder} />;
                    }}
                />
                <Route path="/add-folder" component={NotePageNav} />
                <Route path="/add-note" component={NotePageNav} />
            </>
        );
    }

    deleteNote = noteId => {
            const newNotes = this.state.notes.filter(note =>
              note.id !== noteId
            )
            this.setState({
              notes: newNotes
            })
          }

    handleDeleteNote = (noteId) => {
        const API_ENDPOINT = 'http://localhost:9090'

        fetch(`${API_ENDPOINT}/notes/${noteId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json"
            }
        } )
        .then(res => {
            if (!res.ok) {
              // get the error message from the response,
              return res.json().then(error => {
                // then throw it
                throw error
              })
            }
            return res.json()
          })
          .then(() => {
              this.deleteNote(noteId)
          })
          .catch(err => {
              console.error()
          })
    }   

    renderMainRoutes() {
        const {notes, folders} = this.state;
        return (
            <>
                {['/', '/folder/:folderId'].map(path => (
                    <Route
                        exact
                        key={path}
                        path={path}
                        render={routeProps => {
                            const {folderId} = routeProps.match.params;
                            const notesForFolder = getNotesForFolder(
                                notes,
                                folderId
                            );
                            return (
                                <NoteListMain
                                    {...routeProps}
                                    notes={notesForFolder}
                                />
                            );
                        }}
                    />
                ))}
                <Route
                    path="/note/:noteId"
                    render={routeProps => {
                        const {noteId} = routeProps.match.params;
                        const note = findNote(notes, noteId);
                        return <NotePageMain {...routeProps} note={note} />;
                    }}
                />
            </>
        );
    }

    render() { 
        return (
            <ApiContext.Provider value={{
                notes: this.state.notes,
                folders: this.state.folders,
                addFolders: this.handleAddFolders,
                addNotes: this.handleAddNotes,
                deleteNote: this.deleteNote,
                handleDeleteNote: this.handleDeleteNote
            }}>
                <div className="App">
                    <nav className="App__nav">{this.renderNavRoutes()}</nav>
                    <header className="App__header">
                        <h1>
                            <Link to="/">Noteful</Link>{' '}
                            <FontAwesomeIcon icon="check-double" />
                        </h1>
                    </header>
                    <main className="App__main">{this.renderMainRoutes()}</main>
                </div>
            </ApiContext.Provider>
        );
    }
}

export default App;
