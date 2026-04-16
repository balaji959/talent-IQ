import React from 'react'
import toast from 'react-hot-toast'
import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react'
import axios from 'axios'

const HomePage = () => {
  
  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Home Page</h1>
      <button className="btn-secondary" onClick={() => toast.success("This is a success box")}>Check Status</button>
      
      <hr />

      <SignedOut>
        <p>Please log in to continue.</p>
        <SignInButton mode="modal">
          <button style={{ cursor: 'pointer' }}>Login</button>
        </SignInButton>
      </SignedOut>

      <SignedIn>
        <p>You are logged in!</p>
        <UserButton />
      </SignedIn>
    </div>
  )
}

export default HomePage