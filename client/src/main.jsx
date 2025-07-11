import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import RootLayout from './components/RootLayout.jsx'
import Home from './components/common/Home.jsx'
import Articles from './components/common/Articles.jsx'
import Login from './components/common/Login.jsx'
import Signup from './components/common/Signup.jsx'
import ArticleById from './components/common/ArticleById.jsx'
import UserProfile from './components/user/UserProfile.jsx'
import AuthorProfile from './components/author/AuthorProfile.jsx'
import PostArticle from './components/author/PostArticle.jsx'
import { Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import UserAuthCont from './contexts/UserAuthCont.jsx'


const browserRouterObj = createBrowserRouter([
  {
    path: "",
    element: <RootLayout />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "signin",
        element: <Login />
      },
      {
        path: "signup",
        element: <Signup />
      },
      {
        path: "user-profile/:email",
        element: <UserProfile />,
        children: [
          {
            path: "articles",
            element: <Articles />
          },
          {
            path: ":articleId",
            element: <ArticleById />
          }, {
            path: "",
            element: <Navigate to="articles" />
          }
        ]
      },
      {
        path: "author-profile/:email",
        element: <AuthorProfile />,
        children: [
          {
            path: "articles",
            element: <Articles />
          },
          {
            path: ":articleId",
            element: <ArticleById />
          },
          {
            path: "article",
            element: <PostArticle />

          },
          {
            path: "",
            element: <Navigate to="articles" />
          }
        ]
      }

    ]
  }
])



createRoot(document.getElementById('root')).render(
  <StrictMode>
      <UserAuthCont>
      <RouterProvider router={browserRouterObj} />
      </UserAuthCont>
   
  </StrictMode>,
)
