import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Route } from 'react-router-dom'

const UserAuth = ({component: Component, ...props }) => {
    return (
        <Route {...props}
        render = {routerProps => {
            const userInform = JSON.parse(localStorage.getItem('user'))
            if(userInform){
                return <Component {...routerProps}/>
            }
        return <Redirect to = "/mustsignin"/>
        }}
        />
    )
}

export default UserAuth
