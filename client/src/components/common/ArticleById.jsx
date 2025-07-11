import React, { useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { FaRegCalendarAlt, FaRegClock } from 'react-icons/fa';
import { userAuthorContextObj } from '../../contexts/UserAuthCont'
import { FaEdit } from 'react-icons/fa';
import {MdDelete, MdRestore} from 'react-icons/md'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function ArticleById({ article }) {
  const navigate=useNavigate()
  const {register,handleSubmit}=useForm()
  const { state } = useLocation()
  const { currentuser, setcurrentuser } = useContext(userAuthorContextObj)
  const [editarticlestatus,seteditarticlestatus]=useState(false)
  const [currentarticle,setcurrentarticle]=useState(state)
  const [commentstatus,setcommentstatus]=useState('')
  //function to change edit status of article
  function enabledit(){
    seteditarticlestatus(true)
  }
  async function onsave(modifiedArticle){
    const articleAfterChanges={...state,...modifiedArticle} //will replace old state with new one(whatever got updated)
    const currentDate=new Date()
    articleAfterChanges.dateOfModification=currentDate.getDate()+"-"+currentDate.getMonth()+"-"+currentDate.getFullYear()
    let res=await axios.put(`http://localhost:3000/author-api/article/${articleAfterChanges._id}`,articleAfterChanges)
    if(res.data.message==='article modified'){
      seteditarticlestatus(false)
      navigate(`/author-profile/articles/${state.articleId}`,{state:res.data.payload})
    }
  }
  //add comment by user
  async function addcomment(commentObj){
    commentObj.nameOfUser=currentuser.firstName;
    //modifying article object so its put req
    let res= await axios.put(`http://localhost:3000/user-api/comment/${currentarticle.articleId}`,commentObj)
    if(res.data.message==='comment added'){
      setcommentstatus(res.data.message)
    }
  }
  //delete article
  async function ondelete(){
    state.isArticleActive=false;
    let res=await axios.put(`http://localhost:3000/author-api/articles/${state.articleId}`,state)
    if(res.data.message==='article deleted or restored'){
      setcurrentarticle(res.data.payload)

    }


  }
  //restore article
  async function onrestore(){
    state.isArticleActive=true;
    let res=await axios.put(`http://localhost:3000/author-api/articles/${state.articleId}`,state);
    if(res.data.message==='article deleted or restored'){
      setcurrentarticle(res.data.payload)

    }
  }
  return (
    <div className="">
      {
        editarticlestatus===false ? <>
              <div className="article-container d-flex justify-content-between ">
        <div className=" w-100 px-4 py-2 rounded-2 d-flex justify-content-between align-items-center">
          <div className="">
            <p class="article-title">{state.title}</p>
            <FaRegCalendarAlt size={20} color="#8546d4" className='me-2 mb-1' /><small className='created'>Created on: {state.dateOfCreation} <br></br> </small>
            <FaRegClock size={20} color="#8546d4" className='me-2 mb-1' /><small className='created'>Updated on: {state.dateOfCreation}</small>
          </div>
          <div className="">
            <img src={state.authorData.profileImageUrl} width="50px" className='rounded-circle' alt="" />
            <p>{state.authorData.nameOfAuthor}</p>
          </div>
        </div>
      </div>
      
      <div className="article-content" style={{whiteSpace:"pre-line"}}>
        <p>{state.content}</p>
      </div>

      {
        currentuser?.role === 'author' && (
          <div className="d-flex justify-content-end">
            <button className='btn btn-light me-2' onClick={enabledit}>
              <FaEdit className='text-warning' />
            </button>
            {
              state.isArticleActive===true ? (
                <button className="btn btn-light me-2" onClick={ondelete} >
                    <MdDelete className='text-danger' fs-4/>
                </button>
              ) : (
                <button className="btn btn-light me-2" onClick={onrestore}>
                    <MdRestore className='text-info' fs-4/>
                </button>
              )
            }
          </div>

        )
      }
      <div className="">
        <div className="comments my-2">
          {
            state.comments.length===0 ? (
              <p className=''>No comments yet..</p> 
            ) :(
              state.comments.map(commentObj=>{
                return <div key={commentObj._id} className='comment-box'>
                  <p className='comment-user-name'>{commentObj?.nameOfUser}</p>
                  <p className='comment-body'>{commentObj?.comment}</p>
                  
                 </div>
              })
            )
          }
        </div>
      </div>
      <h5>{commentstatus}</h5>
      {
        currentuser.role==='user' && <form onSubmit={handleSubmit(addcomment)}>
          <input type="text" className="form-control mb-4" {...register("comment")} />
          <button className="btn btn-success">Add comment</button>
        </form>
      }
        
        </> : <form onSubmit={handleSubmit(onsave)} >
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input type="text" className="form-control" defaultValue={state.title} {...register("title")} />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category:</label>
              <select className="form-select"defaultValue={state.category} id="category" {...register("category")}   >
                <option disabled>Select a category</option>
                <option value="technology">Technology</option>
                <option value="health">Health</option>
                <option value="fashion">Fashion</option>
                <option value="travel">Travel</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="content" className="form-label">Content:</label>
              <textarea className="form-control" id="content" rows="10" placeholder="Write your article content here..."  defaultValue={state.content} {...register("content")} ></textarea>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn d-block mx-auto post-btn">Save</button>
            </div>
          </form>
      }


    

    </div>
  );
}

export default ArticleById
