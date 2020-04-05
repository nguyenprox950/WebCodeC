import React from 'react'
import '../css/Compiler.css'
import * as yup from "yup";
import { Formik, Form } from "formik";
import { MyInput } from "./MyInput";
import { ButtonToggle } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import axios from 'axios';
var defaultUrl = "https://api.judge0.com";
var apiUrl = defaultUrl;

const data = {
  source_code: '',
  language_id: 50,
  stdin:''
}

const Compiler = (props) => {

  const getCode = (token) => {
    axios.request ({
        url: apiUrl + "/submissions/" + token + "?base64_encoded=true",
        method: 'GET',
        async: true,
        }).then (result => {
          console.log(result.data)
          if(result.data.status.id <= 2){
            document.getElementById('output').value = result.data.status.description
            setTimeout(getCode.bind(null, result.data.token));
          } else  {
            document.getElementById('output').value = decode(result.data.stdout)
          } 
        }).catch(error => {
          console.log(error)
        })
    }

  const sendCode = (dataCode) => {
    axios.request ({
        url: apiUrl + `/submissions?base64_encoded=true&wait=false`,
        method: 'POST',
        async: true,
        contentType: "application/json",
        data: dataCode
        }).then (result => {
          console.log(result.data)
          getCode(result.data.token)
        }).catch(error => {
          console.log(error)
        })
    }

    const decode = (bytes) => {
      var escaped = escape(atob(bytes || ""));
      try {
          return decodeURIComponent(escaped);
      } catch {
          return unescape(escaped);
      }
  }
  const handelSubmit = () => {
    data.source_code = document.getElementById('source_code').value;
    data.stdin = document.getElementById('stdin').value;
    var code = btoa(unescape(encodeURIComponent(data.source_code || "")));
    var input = btoa(unescape(encodeURIComponent(data.stdin || "")));
    console.log("ngôn ngữ:"+data.language_id +'\n'+"souce_code:"+code)

    var dataSubmit = {
      source_code: code,
      language_id: 50,
      stdin: input,
      compiler_options: '',
      command_line_arguments: '',
    };
    sendCode(dataSubmit)
  }

  return (
      <div>
            <div className = "formikCode">
            <div className='language_id_form'>
              {/* Ngôn ngữ */}
            </div>
              <div className='compiler'>
              <label>Write Your Code</label>
              <textarea class="form-control"  id='source_code' name="source_code" rows="10" cols="50"/>
              <label>Input</label>
              <textarea class="form-control"  id='stdin' name="stdin" rows="3" cols="50"/>
              <label>Output</label>
              <textarea class="form-control" id='output' name="output" rows="2" cols="50"></textarea>
              </div>
              <ButtonToggle id="runCode" type='submit' color="primary" onClick={handelSubmit}>Chạy code</ButtonToggle>
            </div> 
          </div>                 
  )
}
export default Compiler;

