import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { userAuthorContextObj } from '../../contexts/UserAuthCont'
import { useUser } from '@clerk/clerk-react' //gives details about the user
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Home() {
  const navigate=useNavigate()
  const { currentuser, setcurrentuser } = useContext(userAuthorContextObj)
  const { isSignedIn, user, isLoaded } = useUser()
  const [error, seterror] = useState("")
  console.log('isigned in', isSignedIn)
  console.log('user', user)
  console.log('isloaded', isLoaded)
  useEffect(() => {
    setcurrentuser({
      ...currentuser,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.emailAddresses[0].emailAddress,
      profileImageUrl: user?.imageUrl

    })

  }, [isLoaded])


async function onSelectRole(e) {
  seterror('');
  const selectedRole = e.target.id;

  try {
    let res = null;
    const updatedUser = { ...currentuser, role: selectedRole };

    if (selectedRole === 'author') {
      res = await axios.post('http://localhost:3000/author-api/author', updatedUser);
    } else if (selectedRole === 'user') {
      res = await axios.post('http://localhost:3000/user-api/user', updatedUser);
    }
   const { message, payload } = res.data;

    if (payload && message === selectedRole) {
      setcurrentuser(prev => ({ ...prev, ...payload }));
      localStorage.setItem("currentuser",JSON.stringify(payload))
    } else {
      seterror(message);
    }

  } catch (err) {
    console.error("Error while sending role data to server:", err);
    seterror("Something went wrong. Please try again.");
  }
}
useEffect(()=>{
  if(currentuser?.role==='user' && error.length===0){
    navigate(`/user-profile/${currentuser.email}`)
  }
  if(currentuser?.role==='author' && error.length===0){
    navigate(`/author-profile/${currentuser.email}`)
  }

},[currentuser?.role])



  return (
    <div>
      {
        isSignedIn === false && <div className="">
          <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam qui fugit error praesentium aut repellat iure, quae blanditiis mollitia inventore, dolorem doloremque molestias! Dolore provident, laudantium reprehenderit rem qui eligendi?</p>
          <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam qui fugit error praesentium aut repellat iure, quae blanditiis mollitia inventore, dolorem doloremque molestias! Dolore provident, laudantium reprehenderit rem qui eligendi?</p>
          <p className="lead">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam qui fugit error praesentium aut repellat iure, quae blanditiis mollitia inventore, dolorem doloremque molestias! Dolore provident, laudantium reprehenderit rem qui eligendi?</p>
        </div>
      }
      {
        isSignedIn === true &&
        <div className="">
          <div className=" d-flex  justify-content-evenly align-items-center profile-page mx-auto w-75 p-3 rounded-pill">
            <img src={user.imageUrl} width="100px" className='rounded-circle' alt="" />
            <div className="">
              <h3 className="user">{user.firstName}</h3>
              <p className="mail">{user.emailAddresses[0].emailAddress}</p>
            </div>
          </div>
          <div className=" mt-5 role-select mx-auto w-50 p-3 rounded-pill text-white">
            <h5 className='text-center'>Select role:</h5>
            {
              error.length !== 0 && (
                <p className='text-danger fw-3 fs-5'>{error}</p>
              )
            }
            <div className="form-check d-flex  justify-content-center gap-5">
              <div>
                <input type="radio" name="role" id="author" className="form-check-input" onChange={onSelectRole} />
                <label htmlFor="" className="form-check-label">Author</label>
              </div>
              <div>
                <input type="radio" name="role" id="user" className="form-check-input" onChange={onSelectRole} />
                <label htmlFor="" className="form-check-label">User</label>
              </div>
              <div>
                <input type="radio" name="role" id="admin" className="form-check-input" onChange={onSelectRole} />
                <label htmlFor="" className="form-check-label">Admin</label>
              </div>
            </div>
          </div>
        </div>


      }
    </div>
  )
}

export default Home
