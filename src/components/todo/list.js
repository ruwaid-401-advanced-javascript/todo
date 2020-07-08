/* eslint-disable array-callback-return */
import React, { useState, useContext } from 'react';

import { Card } from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';
import './list.scss'
import { SettingsContext } from '../../context/site.js';
var arr;

function TodoList(props) {


  const siteContext = useContext(SettingsContext);

  const [buttonIdx, setbuttonIdx] = useState(0);

  const buttonIndex = (pageNumber) => {
    let newArr = props.list.filter(element => {
      return !siteContext.show ? true : !element.complete;
    });
    let btns = Math.floor(newArr.length / pageNumber + (newArr.length % pageNumber > 0 ? 1 : 0));
    arr = new Array(btns).fill(0);
  };


  buttonIndex(siteContext.elementPerPage);


  function compare(a, b) {
    a = a[siteContext.sort];
    b = b[siteContext.sort];

    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  }

  return (
    <>
      <div>
        {arr.map((element, idx) => (<button key={idx} onClick={e => setbuttonIdx(idx)}>{idx}</button>))}
      </div>

      <ul>
        {props.list
          .filter(element => !siteContext.show ? true : !element.complete)
          .sort(compare)
          .slice(buttonIdx * siteContext.elementPerPage, buttonIdx * siteContext.elementPerPage + siteContext.elementPerPage)
          .map(item => (
            <li
              key={item._id}
            >
              <Card style={{ width: '18rem', padding: '5px' }} >
                <p onClick={() => props.handleDelete(item._id)} className='btnDelete'>X</p>
                <Card.Title className='card-title'>
                  <p className={`status status-${item.complete.toString()}`} onClick={() => props.handleComplete(item._id)}>
                    {`${item.complete ? 'complete' : 'pending'}`}
                  </p>
                  {item.assignee}
                </Card.Title>
                <Card.Body >
                  {item.text}
                  <div className="diff">Difficulty: {item.difficulty}</div>
                </Card.Body>
              </Card>
            </li>
          )
          )
        }
      </ul>

    </>
  )
}

export default TodoList;