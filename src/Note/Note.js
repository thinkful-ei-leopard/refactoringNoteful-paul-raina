import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ApiContext from '../ApiContext';
import './Note.css';

export default class Note extends React.Component {
  static contextType = ApiContext;
  //handle delete function with fetch request using delete method

  render() {
    const { handleDelete } = this.context;
    const { id, name, modified } = this.props;
    return (
      <div className="Note">
        <h2 className="Note__title">
          <Link to={`/note/${id}`}>{name}</Link>
        </h2>
        <button
          onClick={() => handleDelete(id)}
          className="Note__delete"
          type="button">
          <FontAwesomeIcon icon="trash-alt" /> remove
        </button>
        <div className="Note__dates">
          <div className="Note__dates-modified">
            Modified{' '}
            <span className="Date">{format(modified, 'Do MMM YYYY')}</span>
          </div>
        </div>
      </div>
    );
  }
}
