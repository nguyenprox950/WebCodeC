import React, { useState } from 'react'
import {firebaseApp} from '../components/Firebase'
import { Controlled as CodeMirror } from 'react-codemirror2';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import axios from 'axios';
import Swal from 'sweetalert2'
import '../css/HomeWorkStudent.css'
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/cmake/cmake';
import 'codemirror/theme/material.css';

var defaultUrl = "https://api.judge0.com";
var apiUrl = defaultUrl;

var stop;

var historyTime;

var date;

var Title, Introduct;

var Right = 0, Wrong = 0, Error = 0;

var Step , Input = '', Output = '';

var codeHistory;

var cSource = "\
#include <stdio.h>\n\
\n\
int main() {\n\
    \n\
    return 0;\n\
}\n\
";


const decode = (bytes) => {
    var escaped = escape(atob(bytes || ""));
    try {
        return decodeURIComponent(escaped);
    } catch {
        return unescape(escaped);
    }
  }

const saveCode = (code) => {
    var today = new Date();
    var date = today.getDate()+'-'+(today.getMonth()+1)+'-'+today.getFullYear();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    var dateTime = date+' '+time;
    firebaseApp.database().ref('homeWork/CodeHistory(student)/' + localStorage.getItem('emailID')).set ({
        history: code,
        time : dateTime,
     })
  }

const getDate = () => {
    firebaseApp.database().ref('homeWork/deadLine/date').on('value', function(snapshot) {
        if (snapshot.exists){
          date = snapshot.val()
        }
        else {
          date = new Date().getTime()
        }
      })
    return date
}

const setStop = (stop) => {
    firebaseApp.database().ref('homeWork/Stop').set ({
        stop : stop
     })
}

const getStop = () => {
    firebaseApp.database().ref('homeWork/Stop/stop').on('value', function(snapshot) {
        if (snapshot.exists){
          stop = snapshot.val()
        }
    })
    return stop
}

const getInform = () => {
    firebaseApp.database().ref('homeWork/Test/Title').on('value', function(snapshot) {
      if (snapshot.exists) {
      Title = snapshot.val()
      }
    })
    firebaseApp.database().ref('homeWork/Test/Introduct').on('value', function(snapshot) {
      if (snapshot.exists) {
      Introduct = snapshot.val()
      }
    })
    firebaseApp.database().ref('homeWork/Test/Step_test').on('value', function(snapshot) {
      if (snapshot.exists) {
      Step = parseInt(snapshot.val())
      }
    })
  }

  const getTestInform = (Step) => {
    firebaseApp.database().ref('homeWork/Test').child("Expected_Output/Expect"+ Step + "/Input").on('value', function(snapshot) {
      if (snapshot.exists){
        Input = snapshot.val()
      }
    })
    firebaseApp.database().ref('homeWork/Test').child("Expected_Output/Expect"+ Step + "/Output").on('value', function(snapshot) {
      if (snapshot.exists){
        Output = snapshot.val()
      }
    })
  }

  const setRight = (Right) => {
    firebaseApp.database().ref('homeWork/CodeHistory(student)/' + localStorage.getItem('emailID')+ "/Right").set ({
      isRight : Right
   })
  }

  const getHistory = () => {
    firebaseApp.database().ref('homeWork/CodeHistory(student)/'+ localStorage.getItem('emailID') + "/history").on('value', function(snapshot) {
      if (snapshot.exists){
        codeHistory = decode(snapshot.val())
      }
    })
    firebaseApp.database().ref('homeWork/CodeHistory(student)/'+ localStorage.getItem('emailID') + "/time").on('value', function(snapshot) {
      if (snapshot.exists){
        historyTime = snapshot.val()
      }
    })
  }

export const HomeWorkStudent = () => {

    getHistory()

    getInform()

    getTestInform(1)

    const clear = () => {
        setSource(cSource)
        document.getElementById('output').hidden = true;
      }

    const [modal, setModal] = useState(false);

    const toggle = () => {
        setModal(!modal);
    }

    const [source, setSource] = useState();

    const codeMirrorOptions = {
        theme: 'material',
        lineNumbers: true,
    };

    const [time, setTime] = useState(0 + "ngày " + 0 + "giờ "+ 0 + "phút " + 0 + "giây ");

    var x = setInterval(function() {
        if (getStop() === 1) {

            var countDownDate = new Date(getDate()).getTime();
            // Get today's date and time
            var now = new Date().getTime();
        
            // Find the distance between now and the count down date
            var distance = countDownDate - now;
        
            // Time calculations for days, hours, minutes and seconds
            var days = Math.floor(distance / (1000 * 60 * 60 * 24));
            var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
            // Display the result in the element
            setTime(days + "ngày " + hours + "giờ "+ minutes + "phút " + seconds + "giây ")
            // console.log(time)
        
            // If the count down is finished, write some text 
            if (distance < 0) {
              setStop(2)
              setTime(0 + "ngày " + 0 + "giờ "+ 0 + "phút " + 0 + "giây ")
          }
        }    
      }, 1000);

      const getCode = (token, step) => {
        axios.request ({
            url: apiUrl + "/submissions/" + token + "?base64_encoded=true",
            method: 'GET',
            async: true,
            }).then (result => {
              // console.log(result.data)
              if(result.data.status.id <= 2){
                // document.getElementById('output').value = result.data.status.description
                setTimeout(getCode.bind(null, result.data.token, step));
              } else if (result.data.status.id === 3) {
                Right = Right+1;
                console.log(step + " " + Step + " "+ Right)
                if (Right === Step) {
                  setRight(true);
                  document.getElementById('output').value = "Chính xác"
                  document.getElementById('output').hidden = true;
                  Swal.fire(
                    'Chính xác',
                    '',
                    'success'
                  )
                } else {
                  setRight(false);
                }
              } else if (result.data.status.id === 4){
                setRight(false);
                document.getElementById('output').value = result.data.status.description
                document.getElementById('output').hidden = false;
              }
              else {
                document.getElementById('output').value = result.data.status.description
                document.getElementById('output').hidden = false;
                setRight(false);
                if (step === Step){
                  Swal.fire({
                    icon: 'error',
                    title: 'Code lỗi'
                  })
                  }
              }
            }).catch(error => {
              console.log(error)
            })
        }

      const sendCode = (dataCode, step) => {
        localStorage.setItem("stateHomeWork", step);
        axios.request ({
            url: apiUrl + `/submissions?base64_encoded=true&wait=false`,
            method: 'POST',
            async: true,
            contentType: "application/json",
            data: dataCode
            }).then (result => {
              console.log(result.data)
              getCode(result.data.token, step)
            }).catch(error => {
              console.log(error)
            })
        }

    const checkCode = () => {
        var code = btoa(unescape(encodeURIComponent(source || "")));
        saveCode(code);
        // console.log("ngôn ngữ:"+data.language_id +'\n'+"souce_code:"+code)
        for (var i=1; i <= Step; i++) {
        getTestInform(i);
        var dataSubmit = {
        source_code: code,
        language_id: 54,
        stdin: btoa(unescape(encodeURIComponent(Input || ""))),
        expected_output: Output
        };
        console.log(dataSubmit)
        sendCode(dataSubmit, i)
        }
        Right = 0;
    }

    return (
        <div>
        <div className="homeWorkStudent">
            <h3 style ={{color : "red"}}>{time}</h3>
            {getStop() === 1 ? (
            <div className = "checkCodeTitle">
                <div className ="title">
                    <h3>{Title}</h3>
                </div>
                <div className="require">
                    <p>Đề bài:</p>
                </div>
                <div className="test">
                    <p>{Introduct}</p>
                </div>
            </div>
            ) : (
                <div></div>
            )}
            </div>
            <div className='checkCodeHomeWork'>
            {getStop() === 1 ? (
                <h6>Nhập code của bạn</h6>
            ) : (
                    <div></div>
            )}
            {getStop() === 1 ? (
                <CodeMirror
                id = 'source_code'
                value={source}
                options={{
                    mode: 'cmake',
                    ...codeMirrorOptions,
                    value: cSource
                }}
                onBeforeChange={(editor, data, source) => {
                    setSource(source)
                }}
                />
            ) : (
                    <h2>Thời gian làm bài đã hết</h2>
            )}  
                {getStop() === 1 ? (          
                <textarea className="form-control" id='output' name="output" rows="2" cols="50" hidden></textarea>
                ) : (
                    <div></div>
                )}  
            </div>
                {getStop() === 1 ? (
                <Button id="checkHomeWork" type='submit' color="primary" onClick={checkCode}>Chấm code</Button>
                ) : (
                    <div></div>
                )}
                {getStop() === 1 ? (
                <Button id ="historyHomeWork" color="info" onClick={toggle}>Lịch sử</Button>
                ) : (
                    <div></div>
                )}
                {getStop() === 1 ? (
                <Button id ="clearHomeWork" color="danger" onClick={clear}>Xoá code</Button>
                ) : (
                    <div></div>
                )}
                <div>
                <Modal isOpen={modal} toggle={toggle} className='modalHistory'>
                <ModalHeader toggle={toggle}>{historyTime}</ModalHeader>
                <ModalBody>
                <CodeMirror
                id = 'codeHistory'
                value={codeHistory}
                options={{
                    mode: 'cmake',
                    ...codeMirrorOptions,
                }}
                />              
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
                </Modal>
                {/* <div className="text-center">{min+"/"+max}</div>
                <Progress value={localStorage.getItem("state")} max={max} /> */}
                </div>
        </div>
    )
}

export default HomeWorkStudent