import React from "react";

import AllRoutes from "./routes/Routes";

import { configureFakeBackend } from "./helpers";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS

// For Default import Default.scss
import './assets/scss/Default.scss';

// Other
import './assets/scss/Landing.scss';
import "./assets/scss/Icons.scss";

// configure fake backend
configureFakeBackend();

const App = () => {
  return (
    <>
    
      <React.Fragment>
        <AllRoutes />
        <ToastContainer />
      </React.Fragment>
    </>
  );
};

export default App;
