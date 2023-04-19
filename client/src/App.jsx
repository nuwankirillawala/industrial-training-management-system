import {RouterProvider} from 'react-router-dom'
import AuthState from './Context/Auth/AuthState';
import { Fragment } from 'react'
import {router} from './Routes';

function App() {
  return (
    <AuthState>
      <Fragment>
        <RouterProvider router={router} />
      </Fragment>
    </AuthState>
  )
}

export default App;
