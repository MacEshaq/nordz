
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';

// COMPONENTS
import Nav from "./components/Nav";

// PAGES
import Home from './pages/Home';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Login from './pages/Login';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Nav />}>
      <Route path="/" element={<Home />} />
      <Route path="/services" element={<Services />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/admin" element={<Admin />} />
      <Route path='/signup' element={<Signup />} />
      <Route path="/login" element={<Login />} />
      {/* <Route path='/logout' element={<Logout />} /> */}
    </Route>
  )
)

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
