import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { useClerk } from '@clerk/clerk-react';
import { userAuthorContextObj } from '../../contexts/UserAuthCont';
import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

function Header() {
  const {isSignedIn,user,isLoaded}=useUser()
  const navigate=useNavigate()
  const {signOut}=useClerk()
  const {currentuser,setcurrentuser}=useContext(userAuthorContextObj)
  
  //function to sign out
  async function handleSignout(){
    await signOut();
    setcurrentuser(null)
    navigate('/')


  }
  return (
    <nav className=" header py-3 d-flex justify-content-between">
      <div className="d-flex justify-content-center ms-3">
        <Link to="/" className='text-decoration-none'>
        <img src="https://s3.us-east-1.amazonaws.com/cdn.designcrowd.com/blog/70-purple-logos-for-a-powerful-brand/roundwolf-logo-design-by-lelevien-dribbble.png" width="40px" className='rounded-5' alt="" /></Link>
      </div>
      <ul className="d-flex list-unstyled gap-4 m-0 header-links me-4">
        {
          isSignedIn===false ? <>
          <li>
          <Link to="" className="text-decoration-none">Home</Link>
        </li>
        <li>
          <Link to="signin" className="text-decoration-none">SignIn</Link>
        </li>
        <li>
          <Link to="signup" className="text-decoration-none">SignUp</Link>
        </li>
        </> : 
        <div className='user-button d-flex justify-content-around ' >
          <div className="me-4">
              <img src={user?.imageUrl} width="30px" className='rounded-circle ms-1' alt="" />
              <p className='user-name me-5' style={{position:'absolute'}}>{user?.firstName}</p>
          </div>
          <div className="">
          <button className="btn  signout-btn" onClick={handleSignout}>Signout</button>
          </div>
        </div>
        }
        
      </ul>
    </nav>
  );
}

export default Header;
