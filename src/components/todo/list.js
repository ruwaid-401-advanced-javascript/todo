import React from 'react';

import { Card } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './list.scss'
function TodoList(props) {
  return (
    <ul>
      {props.list.map(item => (
        <li
          key={item._id}
        >
            <Card style={{ width: '18rem' , padding:'5px'}} >
              <p onClick={() => props.handleDelete(item._id)} className='btnDelete'>X</p>
              <Card.Title className='card-title'>
                <p className={`status status-${item.complete.toString()}`} onClick={() => props.handleComplete(item._id)}> 
                {`${item.complete?'complete':'pending'}`}
                </p>
                 {item.assignee}
                 </Card.Title>
              <Card.Body >
                {item.text}
                <div className="diff">Difficulty: {item.difficulty}</div>
              </Card.Body>
            </Card>
        </li>
      ))}
    </ul>
  );
}

export default TodoList;