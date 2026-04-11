import './App.css'
import { SignIn, SignOutButton, UserButton, useUser } from '@clerk/react'

function App() {
  const { isSignedIn } = useUser()

  return (
    <>
      <h1>Welcome to Talent IQ</h1>

      {!isSignedIn && <SignIn />}

      {isSignedIn && (
        <>
          <UserButton />
          <SignOutButton />
        </>
      )}
    </>
  )
}

export default App