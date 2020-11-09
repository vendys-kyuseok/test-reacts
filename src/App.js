import React from 'react';
import Contact from './Conponents/contact'

class App extends React.Component {
  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <Contact />
      </div>
    );
  }
};

export default App;
