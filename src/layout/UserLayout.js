import React from 'react'
import AppHeader from '../components/AppHeader'

const UserLayout = (props) => {
    return (
        <React.Fragment>
            <AppHeader/>
            {props.children}
        </React.Fragment>
    )
}

export default UserLayout
