import React from 'react'
import { CurrentUserProvider } from './CurrentUserContext'
import { IsLoggedInProvider } from './IsLoggedInContext'
import { TwootsProvider } from './TwootsContext'
import { UsersProvider } from './UsersContext'


const AllContextsProvider = ({ children }) => {
  return (
    <TwootsProvider>
      <UsersProvider>
        <CurrentUserProvider>
          <IsLoggedInProvider>
            {children}
          </IsLoggedInProvider>
        </CurrentUserProvider>
      </UsersProvider>
    </TwootsProvider>
  )
}

export default AllContextsProvider
