import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import AppLayout from './layout/appLayout'
import HomePage from './pages/homePage'

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<AppLayout />}>
    <Route index element={<HomePage />} />
  </Route>
));

function App() {

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
