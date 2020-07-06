import React from 'react';

import ToDo from './components/todo/todo.js';
import Header from './components/header.js'
export default function App() {
  return (
    <>
      <Header></Header>
      <ToDo />
    </>
  );
}