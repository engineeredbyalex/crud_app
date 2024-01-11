import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import storeContext from '../../context/storeContext';
import { Button, GoldButton } from './Button';
import { RedButton } from './Button';
import { IoIosMenu } from 'react-icons/io';

const Header = () => {
  const { store, dispatch } = useContext(storeContext);
  const navigate = useNavigate();

  const logout = (e) => {
    localStorage.removeItem('crud_token');
    dispatch({ type: 'logout', payload: '' });
    navigate('/login');
  };

  const [toggle, setToggle] = useState(false);

  return (
    <div className="w-screen h-full bg-[#2B304D] flex items-center justify-center p-2">
      <div className="w-[80%] mx-auto h-full flex flex-col lg:flex-row justify-between items-center">
        <div className="flex flex-row items-center justify-center gap-5">
                   <Link to={'/'}>
          <h3 className="uppercase font-bold text-white">Portfolio</h3>
        </Link>
        {/* Toggleable Menu for Small Screens */}
        <div className="lg:hidden">
          <IoIosMenu color='white' onClick={() => setToggle(!toggle)} size={30} />
        </div>
       </div>

        {/* Menu for Large Screens */}
        <ul
          className={`${
            toggle ? 'flex flex-row' : 'hidden'
          } lg:flex justify-between items-center gap-4 mt-3 mb-5`}
        >
                  {store.userInfo ? (
            <div className='flex gap-5 lg:flex-row flex-col'>
            <Button >
            <Link to="/user/posts">
              <p>My Projects</p>
            </Link>
          </Button>
          <Button >
            <Link to="/post/create">
              <p>Create Project</p>
            </Link>
          </Button>
            <RedButton>
              <Link to="/" onClick={logout}>
                <p>Logout</p>
              </Link>
            </RedButton>
            </div>
                      
          ) : (
            <GoldButton >
              <Link to="/login"><>Login</></Link>
            </GoldButton>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
