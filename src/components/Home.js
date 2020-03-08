import React, { Component } from 'react'
import Carousel from './Carousel'
import Welcome from './Welcome'
import Service from './Service'

export default class Home extends Component {
    render() {
        return (
            <div>
                <Carousel/>
                <Welcome/>
                <Service/>
            </div>
        )
    }
}
