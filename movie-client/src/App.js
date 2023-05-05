import './App.css';
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import AppLayout from './layout/appLayout'
import HomePage from './pages/homePage'
import LoginPage from './pages/loginPage';
import RegisterPage from './pages/registerPage';
import UserProfile from './pages/userProfile';

const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/' element={<AppLayout />}>
    <Route index element={<HomePage />} />
    <Route path='/login' element={<LoginPage />} />
    <Route path='/register' element={<RegisterPage />} />
    <Route path='/profile' element={<UserProfile />} />
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
