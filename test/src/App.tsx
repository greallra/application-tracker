import { useState } from 'react'
import Nav from './components/Nav'
import './App.css'
// Public
import Home from './routes/Home'
import Login from './routes/Login'
import SignUp from './routes/SignUp'
import Users from './routes/Users'
// Private / Protected
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./hooks/useAuth";
import Exchanges from './routes/Exchanges'
import ExchangeView from './routes/ExchangeView'
import { db } from "./firebaseConfig";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css';
import { MantineProvider } from '@mantine/core';
// react libraries: https://www.robinwieruch.de/react-libraries/
// import {
//   createBrowserRouter,
//   RouterProvider,
//   Route,
//   Link,
// } from "react-router-dom";
import {
  BrowserRouter, Routes, Route
} from "react-router-dom";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <div><SignUp /></div>
//   },
//   {
//     path: "exchanges",
//     element: <div><Nav /><Exchanges /></div>,
//   },
//   {
//     // it renders this element
//     element: <ExchangeView />,
//     // when the URL matches this segment
//     path: "exchanges/:exchangeId"
//   },

//   {
//     path: "profile",
//     element: <div><Nav />Profile</div>,
//   },
//   {
//     path: "settings",
//     element: <div><Nav />settings</div>,
//   },
// ]);

const collectionRef = collection(db, 'users')
getDocs(collectionRef)
  .then((snapshots) => {
    snapshots.docs.forEach((doc) => {
      console.log('snapshots', doc.data());
    })
   
    
  })


//https://blog.logrocket.com/handling-user-authentication-redux-toolkit/
function App() {
  return (
    <MantineProvider>
         {/* <FirebaseProvider> */}
          <BrowserRouter>
            <AuthProvider>
              {window.localStorage.user && <Nav></Nav>}
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/users" element={<Users />} />
                <Route
                  path="/exchanges"
                  element={
                    <ProtectedRoute>
                      <Exchanges />
                    </ProtectedRoute>
                  }
                />
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        {/* </FirebaseProvider> */}
    </MantineProvider>
  )
}

export default App
