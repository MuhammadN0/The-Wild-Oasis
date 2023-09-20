import { useNavigate } from "react-router-dom"
import { useUser } from "../features/authentication/useUser"
import { useEffect } from "react"
import Spinner from "./Spinner"
import styled from "styled-components"
const FullPage = styled.div`
height: 100vh;
width: 100%;
display:flex;
justify-content:center;
align-items:center;`
function ProtectedRoute({children}) {
  const {user, isLoading} = useUser()
  const navigate = useNavigate()
  useEffect(function(){
    if(!user && !isLoading) navigate('/login')
  },[isLoading,navigate,user])
  if (isLoading) return <FullPage><Spinner/></FullPage>
  return children
}

export default ProtectedRoute
