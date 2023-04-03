import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { LoginPage } from './screens/LoginScreen'
import { RegisterUser } from './screens/RegisterUser'

import { AuthGuard, GuestGuard } from './component/AuthGuard'
import { MainPage } from './screens/MainPage'



function ProtectedRoutes() {
  return(
      <AuthGuard>
        <Routes>
          <Route path = "" element = {<MainPage />} />
        </Routes>
      </AuthGuard>
  );


}

function GuestRoutes() {
  return (
    <GuestGuard>
      <Routes>
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterUser />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </GuestGuard>
  );
}



function App() {
  
  return (
    <>
      <Routes>
      <Route path="app/*" element={<ProtectedRoutes />} />
      <Route path="*" element={<GuestRoutes />} />
    </Routes>
    </>
  )
}

export default App
