import React, { Component } from 'react'
import Carousel from './Carousel'
import Welcome from './Welcome'
import AppHeader from './AppHeader'

export default class Home extends Component {
    render() {
        return (
            <div>
                <AppHeader/>
                <Carousel/>
                <Welcome/>
            </div>
        )
    }
}
