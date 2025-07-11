import React from 'react'
import {SignIn} from '@clerk/clerk-react'

function Login() {
  return (
    <div className='d-flex justify-content-center align-items-center mx-auto vh-100'>
       <SignIn
        appearance={{
          variables: {
            colorPrimary: '#c084fc',
            colorBackground: '#ffffff',
            colorText: '#3c2a4d',
            colorTextSecondary: '#7a5f9c',
            colorInputText: '#3c2a4d',
            colorInputBackground: '#faf6ff',
            colorInputBorder: '#d3b8ec',
            colorSuccess: '#81c784',
            colorDanger: '#f48fb1',
          },
          elements: {
            card: {
              boxShadow: '0 0 30px rgba(192, 132, 252, 0.2)',
              borderRadius: '12px',
              padding: '2rem',
              backgroundColor: '#ffffff',
              border: '1px solid #d3b8ec'
            },
            headerTitle: {
              color: '#8e44ad',
              fontWeight: 'bold'
            },
            headerSubtitle: {
              color: '#7a5f9c'
            },
            formFieldLabel: {
              color: '#3c2a4d'
            },
            formFieldInput: {
              borderColor: '#d3b8ec',
              backgroundColor: '#faf6ff',
              borderRadius: '8px',
              color: '#3c2a4d'
            },
            formButtonPrimary: {
              backgroundColor: '#c084fc',
              color: '#ffffff',
              fontWeight: '600',
              borderRadius: '6px'
            },
            formButtonPrimaryHover: {
              backgroundColor: '#8e44ad',
              boxShadow: '0 0 10px 4px rgba(192, 132, 252, 0.4)',
              transition: 'all 0.3s ease-in-out'
            },
            footerActionText: {
              color: '#7a5f9c'
            },
            footerActionLink: {
              color: '#8e44ad'
            },
            footerActionLinkHover: {
              color: '#732d91'
            }
          }
        }}
      />
    </div>
  )
}

export default Login