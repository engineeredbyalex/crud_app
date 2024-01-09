import React, { useContext } from 'react'
import storeContext from '../../context/storeContext'
import { Navigate } from 'react-router-dom'

const ProtectRoute = ({children}) => {
    const{store} = useContext(storeContext)
    if (store.userInfo) {
        return children
    }
    else {
        return <Navigate to='/login'/>
    }
}

export default ProtectRoute