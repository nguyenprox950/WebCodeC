import React, { useState, useEffect } from 'react'
import { firebaseApp } from "./Firebase";
import axios from "axios";
import * as workerTimers from 'worker-timers';

var countDown, countDownDate, number;

var x, i=0;

const getCurrentTime = () => {
    axios
      .request({
        url:"http://worldtimeapi.org/api/timezone/Asia/Ho_Chi_Minh",
        method: "GET",
        async: true,
      })
      .then((result) => {
        countDown = result.data.unixtime * 1000;
      });
};

const getDate = (number) => {
    firebaseApp
      .database()
      .ref("Homework/Test/Homework" + number + "/Deadline")
      .on("value", function (snapshot) {
        if (snapshot.exists) {
        countDownDate = snapshot.val();
        }
      });
};

const setStop = (stop, number) => {
    firebaseApp
      .database()
      .ref("Homework/Test/Homework" + number)
      .update({
        Stop: stop,
      });
};

const getStop = (number) => {
    var stop;
    firebaseApp
      .database()
      .ref("Homework/Test/Homework" + number + "/Stop")
      .on("value", function (snapshot) {
        if (snapshot.exists) {
          stop = snapshot.val();
        }
      });
    return stop;
  };

export const CountDownTime = () => {

    number = localStorage.getItem("homeworkKey")

    const [activeTab, setActiveTab] = useState("0");
    
    const [count, setCount] = useState(
        0 + "ngày " + 0 + "giờ " + 0 + "phút " + 0 + "giây "
    );
  
    if (activeTab !== number) {
      workerTimers.clearInterval(x);
        setActiveTab(number)
        getCurrentTime();
        getDate(number)
        x = workerTimers.setInterval(function() {

            // Get today's date and time
            var now = countDown;

            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            // Display the result in the element with id="demo"
            setCount(
                days + "ngày " + hours + "giờ " + minutes + "phút " + seconds + "giây "
            );
            countDown = countDown + 1000;
            // If the count down is finished, write some text
            if (distance < 0) {
                if(getStop(number) === 1) setStop(2, number)
                setCount(
                    "Thời gian làm bài đã hết"
                );
            }
        }, 1000);
    }

    useEffect(() => {
      workerTimers.clearInterval(x);
        getCurrentTime();
        getDate(number);
        // Update the count down every 1 second
        x = workerTimers.setInterval(function() {

            // Get today's date and time
            var now = countDown;

            // Find the distance between now and the count down date
            var distance = countDownDate - now;
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            // Display the result in the element with id="demo"
            setCount(
                days + "ngày " + hours + "giờ " + minutes + "phút " + seconds + "giây "
            );
            countDown = countDown + 1000;
            // If the count down is finished, write some text
            if (distance < 0) {
                if(getStop(number) === 1) setStop(2, number)
                setCount(
                    "Thời gian làm bài đã hết"
                );
            }
        }, 1000);
    }, []);

    return (
        <div style={{ marginLeft: "286px"}}>
            <h3 style={{ color: "red", textAlign: "center"}}>{count}</h3>
        </div>
    )
}

export default CountDownTime
