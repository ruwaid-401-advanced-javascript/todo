import React, { useState, useEffect, useContext } from 'react';
import TodoForm from './form.js';
import TodoList from './list.js';
import useAjax from '../hooks/ajax.js';

import './todo.scss';

import { SettingsContext } from '../../context/site.js';

function ToDo(props) {
  const siteContext = useContext(SettingsContext);

  const [list, setList] = useState([]);
  const [getElement, postElement, putElement, deleteElement] = useAjax(setList);

  const addItem = (item) => {
    item.complete = false;
    let url = `https://lab32-401.herokuapp.com/todo`
    postElement(url, item);
  };

  const toggleComplete = id => {

    let item = list.filter(i => i._id === id)[0] || {};

    if (item._id) {
      item.complete = !item.complete;
      let z = list.map(listItem => listItem._id === item._id ? item : listItem);
      setList([...z])


      let data = item;
      let url = `https://lab32-401.herokuapp.com/todo`


      putElement(url, data)
    }
  };

  useEffect(() => {
    document.title = `TO DO LIST ${list.filter(item => !item.complete).length}`
  }, [list]);


  useEffect(() => {
    let url = `https://lab32-401.herokuapp.com/todo`

    getElement(url);
  }, [list]);


  const togglehandleDelete = id => {
    let idx = list.findIndex(i => i._id === id);
    list.splice(idx, 1);
    setList([...list])
    let url = `https://lab32-401.herokuapp.com/todo`

    deleteElement(url, id)
  }

  return (
    <main>
      <header className="header-TODO">
        <h2>TO DO LIST Manager ({list.filter(item => !item.complete).length}) </h2>
      </header>
      <button className='show' onClick={e => siteContext.setShow(!siteContext.show)}>
          complete/pending
      </button>
      <section className="todo">

        <div>
          <form onChange={e => siteContext.changeSort(e.target.value)}>
            <label class="radio">
              <input type="radio" name="sort" value='difficulty' />
            difficulty
              </label>
            <label class="radio">
              <input type="radio" name="sort" value='complete' />
            complete
          </label>
          <label class="radio">
              <input type="radio" name="sort" value='assignee' />
            assignee
          </label>
          <label class="radio">
              <input type="radio" name="sort" value='none' />
            none
          </label>
          </form>

        </div>
        <div>
          <TodoForm handleSubmit={addItem} />
        </div>

        <div>
          <TodoList
            list={list}
            handleComplete={toggleComplete}
            handleDelete={togglehandleDelete}
          />
        </div>
      </section>
    </main>
  );
}

export default ToDo;