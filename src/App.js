
import './App.css';
import React from 'react';
import ToDo from './components/todo/ToDo';
import 'bootstrap/dist/css/bootstrap.min.css'

// import Price from './components/Price';



function App() {
  return (
    <div className="App">
     {/* <Price price='10'/>
     <Price price='500'/> */}
<ToDo/>
    </div>
  );
}

export default App;
