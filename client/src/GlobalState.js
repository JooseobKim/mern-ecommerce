import React, {createContext, useEffect, useState} from 'react'
import ProductAPI from './api/ProductAPI'
import UserAPI from './api/UserAPI'
import CategoriesAPI from './api/CategoriesAPI'
import axios from 'axios'

// ContextAPI 생성자(createContext)
export const GlobalState = createContext()

// ContextAPI 제공자(data)
export const DataProvider = ({children}) => {
  const [token, setToken] = useState(false)

  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin')
    if(firstLogin) {
      const refreshToken = async () => {
        const res = await axios.get('/user/refresh_token') 

        setToken(res.data.accesstoken)

        setTimeout(() => {
          refreshToken()
        }, 10 * 60 * 1000);
      }
      refreshToken()
    }
  }, [])

  const state = {
    token: [token, setToken],
    ProductAPI: ProductAPI(),
    userAPI: UserAPI(token),
    cateogriesAPI: CategoriesAPI()
  }

  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  )
}