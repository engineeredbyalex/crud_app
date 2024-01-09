import { BrowserRouter , Routes, Route } from 'react-router-dom';
import Register from "./pages/Register.jsx"
import Login from "./pages/Login.jsx"
import { Toaster } from 'react-hot-toast';
import CreatePost from './pages/CreatePost.jsx';
import EditPost from './pages/EditPost.jsx';
import AllPosts from './pages/AllPosts.jsx';
import Details from './pages/Details.jsx';
import Home from "./pages/Home.jsx"
import Header from './pages/components/Header.jsx';
import ProtectRoute from './pages/components/ProtectRoute.jsx';


function App() {

  return (
    <div className='min-w-screen min-h-screen bg-white'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path='/post/details/:postId' element={<Details />}/>
          {/* <Route path='/register' element={<Register />}/> */}
          <Route path='/login' element={<Login />}/>
          <Route path='/post/create' element={<ProtectRoute><CreatePost/></ProtectRoute>}/>
          <Route path='/post/edit/:postId' element={<ProtectRoute><EditPost/></ProtectRoute>}/>
          <Route path='user/posts' element={<ProtectRoute ><AllPosts/></ProtectRoute>}/>
        </Routes>
      </BrowserRouter>
      <Toaster/>
      </div>
  )
}

export default App
