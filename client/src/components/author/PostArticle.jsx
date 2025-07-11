import React from 'react'
import { useForm } from 'react-hook-form'
import axios from 'axios'
import { useContext } from 'react'
import { userAuthorContextObj } from '../../contexts/UserAuthCont'
import { useNavigate } from 'react-router-dom'

function PostArticle() {
  const navigate=useNavigate()
  const { currentuser } = useContext(userAuthorContextObj)
  const { register, handleSubmit, formState: { errors } } = useForm()
  async function postArticle(articleObj) {
    console.log(articleObj)
    //create article object as per article schema-refer articlemodal.js
    const authorData = {
      nameOfAuthor: currentuser.firstName,
      email: currentuser.email,
      profileImageUrl: currentuser.profileImageUrl
    }
    articleObj.authorData = authorData;
    articleObj.articleId = Date.now()

    let currentDate = new Date()
    articleObj.dateOfCreation = String(currentDate.getDate()).padStart(2, '0') + "-" +
      String(currentDate.getMonth() + 1).padStart(2, '0') + "-" +
      currentDate.getFullYear() + " " +
      currentDate.toLocaleTimeString("en-US", { hour12: true });
    articleObj.dateOfModification =String(currentDate.getDate()).padStart(2, '0') + "-" +
      String(currentDate.getMonth() + 1).padStart(2, '0') + "-" +
      currentDate.getFullYear() + " " +
      currentDate.toLocaleTimeString("en-US", { hour12: true });
    articleObj.comments = []
    articleObj.isArticleActive = true
    console.log(articleObj)
    //make post req to backend
    let res=await axios.post('http://localhost:3000/author-api/article',articleObj)
    if(res.status===201){
        navigate("/author-profile/articles")
    }

  }
  return (
    <div className="">
      <div className="container my-5">
        <div className="form-card mx-auto" style={{ "max-width": "600px" }}>
          <h2 className="text-center mb-4 form-title">Write an Article</h2>
          <form onSubmit={handleSubmit(postArticle)}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title:</label>
              <input type="text" className="form-control" {...register("title")} />
            </div>

            <div className="mb-3">
              <label htmlFor="category" className="form-label">Category:</label>
              <select className="form-select" defaultValue="" id="category" {...register("category")}>
                <option disabled>Select a category</option>
                <option value="technology">Technology</option>
                <option value="health">Health</option>
                <option value="fashion">Fashion</option>
                <option value="travel">Travel</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="content" className="form-label">Content:</label>
              <textarea className="form-control" id="content" rows="10" placeholder="Write your article content here..." {...register("content")}></textarea>
            </div>

            <div className="d-grid">
              <button type="submit" className="btn d-block mx-auto post-btn">Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PostArticle