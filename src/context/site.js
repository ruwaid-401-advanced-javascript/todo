import React, { useState } from 'react';

export const SettingsContext = React.createContext();

function SettingsProvider(props) {

  const [elementPerPage, setelementPerPage] = useState(3);
  const [sort, setSort] = useState('none');
  const [show, setShow] = useState(false);
  
  // packaging all of state and state methods in one obj
  const state = {
    elementPerPage,
    changePageNumber: setelementPerPage,
    sort,
    changeSort:setSort,
    show,
    setShow,
  };

  return (
    <SettingsContext.Provider value={state}>
      {props.children}
    </SettingsContext.Provider>
  );
}

export default SettingsProvider;