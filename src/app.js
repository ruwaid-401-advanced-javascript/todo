import React from 'react';


import SettingsContext from './context/site.js';
import ToDo from './components/todo/todo.js';
import Header from './components/header.js'


export default function App() {
  return (
    <>
        <SettingsContext>
          <Header></Header>
          <ToDo />
        </SettingsContext>
    </>
  );
}