import React, { Component } from 'react'
import Carousel from './Carousel'
import Welcome from './Welcome'
import Service from './Service'

export default class Home extends Component {
    render() {
        return (
            <div style = {{  margin: "0 auto", paddingTop: "60px"}}>
                <Carousel/>
                {/* <Service/> */}
                <Welcome/>
            </div>
        )
    }
}
