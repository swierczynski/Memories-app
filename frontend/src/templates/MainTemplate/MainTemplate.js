import React from 'react';
import {HashRouter as Router} from 'react-router-dom'

const MainTemplate = ({children}) => {
  return ( 
    <Router>
      {children}
    </Router>
   );
}
 
export default MainTemplate;