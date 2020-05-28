import React, { useState, useEffect } from "react";
import HomeworkStudents from './HomeworkStudents'
import CountDownTime from './CountDownTime'

export const Homework = () => {

    const [rend, setRend] = useState(
        0 + "ngày " + 0 + "giờ " + 0 + "phút " + 0 + "giây "
    );

    useEffect(() => {
        var countDownDate = new Date("Jan 5, 3021 15:37:25").getTime();

        // Update the count down every 1 second
        var x = setInterval(function() {

            // Get today's date and time
            var now = new Date().getTime();

            // Find the distance between now and the count down date
            var distance = countDownDate - now;

            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Display the result in the element with id="demo"
            setRend(
                days + "ngày " + hours + "giờ " + minutes + "phút " + seconds + "giây "
            );

            // If the count down is finished, write some text 
            if (distance < 0) {
                clearInterval(x);
            }
        }, 1000);
    }, []);

    return (
        <div>
            <p hidden>{rend}</p>
            <CountDownTime/>
            <HomeworkStudents/>
        </div>
    )
}

export default Homework
