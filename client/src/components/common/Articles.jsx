import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Articles() {
  const navigate=useNavigate()
  const [articles, setarticles] = useState([])
  const [err, seterror] = useState('')
  async function getallarticles() {
    let res = await axios.get('http://localhost:3000/author-api/articles')
    if (res.data.message === 'articles') {
      setarticles(res.data.payload)
    } else {
      seterror(res.data.message)
    }
  }
  function gotoArticleById(articleObj){
    navigate(`../${articleObj.articleId}`,{state:articleObj})
  }
  useEffect(() => {
    getallarticles()
  }, [])
  console.log(articles)
  return (
    <div>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3">
        {
          articles.map(articleObj => (
            <div className="col" key={articleObj.articleId}>
              <div className="card article-card h-100">
                <div className="card-body article-card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title article-card-title mt-4">{articleObj.title}</h5>
                    <div className="author-details text-end">
                      <img src={articleObj.authorData.profileImageUrl} width="40px" className='rounded-circle' alt="" />
                      <p>{articleObj.authorData.nameOfAuthor}</p>
                    </div>
                    
                  </div>
                  <p className="card-text">{articleObj.content.substring(0,80)+"...."}</p>
                  <button className="btn btn-4 article-btn" onClick={()=>gotoArticleById(articleObj)}>Read more</button>
                </div>
                <div className="card-footer article-footer">
                  <small className='text-body-secondary'>
                    Last updated on {articleObj.dateOfModification}
                  </small>
                </div>
              </div>

            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Articles