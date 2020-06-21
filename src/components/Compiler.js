import React, { useState } from "react";
import "../css/Compiler.css";
import Swal from "sweetalert2";
import { Controlled as CodeMirror } from "react-codemirror2";
import { ButtonToggle } from "reactstrap";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/clike/clike"
import "codemirror/theme/material.css";

const data = {
  source_code: "",
  language_id: 50,
  stdin: "",
};

const Compiler = (props) => {
  const [source, setSource] = useState();

  const codeMirrorOptions = {
    theme: "material",
    lineNumbers: true,
  };

  const getCode = (token) => {
    axios
      .request({
        url:"https://judge0.p.rapidapi.com/submissions/"+token,
        method: "GET",
        async: true,
        headers:{
          "content-type":"application/octet-stream",
          "x-rapidapi-host":"judge0.p.rapidapi.com",
          "x-rapidapi-key":"d91c2aed13msh035902c0588fa98p11a2b6jsnf3929baa4508",
          "useQueryString":true
          },
        params:{
          "fields":"*",
          "base64_encoded":"true"
          }
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.status.id <= 2) {
          document.getElementById("output").value =
            result.data.status.description;
          setTimeout(getCode.bind(null, result.data.token));
        } else if (result.data.status.id === 3){
          console.log(decode(result.data.compile_output));
          document.getElementById("output").value =
            "Code của bạn đã được chạy trong " +
            result.data.time +
            "s\n" +
            decode(result.data.stdout);
        }
        else {
          document.getElementById("output").style.color = "red"
          document.getElementById("output").value = decode(result.data.compile_output)
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendCode = (dataCode) => {
    axios
      .request({
        method:"POST",
        url:"https://judge0.p.rapidapi.com/submissions",
        headers:{
          "content-type":"application/json",
          "x-rapidapi-host":"judge0.p.rapidapi.com",
          "x-rapidapi-key":"d91c2aed13msh035902c0588fa98p11a2b6jsnf3929baa4508",
          "accept":"application/json",
          "useQueryString":true
        },
        data: dataCode,
      })
      .then((result) => {
        getCode(result.data.token);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const decode = (bytes) => {
    var escaped = escape(atob(bytes || ""));
    try {
      return decodeURIComponent(escaped);
    } catch {
      return unescape(escaped);
    }
  };
  const handelSubmit = () => {
    data.source_code = source;
    if (data.source_code === "") {
      Swal.fire({
        icon: "error",
        title: "Thất bại",
        text: "Code không được bỏ trống",
      });
    } else {
      data.stdin = document.getElementById("stdin").value;
      var dataSubmit = {
        source_code: data.source_code,
        language_id: 54,
        stdin: (data.stdin || ""),
        compiler_options: "",
        command_line_arguments: "",
      };
      sendCode(dataSubmit);
    }
  };

  return (
    <div>
      <div className="formikCode">
        <div className="language_id_form">{/* Ngôn ngữ */}</div>
        <div className="compiler">
          <label>Write Your Code</label>
          <CodeMirror
            id="source_code"
            value={source}
            options={{
              mode: "text/x-csrc",
              ...codeMirrorOptions,
            }}
            onBeforeChange={(editor, data, source) => {
              setSource(source);
            }}
          />
          <label>Input</label>
          <textarea
            class="form-control"
            id="stdin"
            name="stdin"
            rows="3"
            cols="50"
          />
          <label>Output</label>
          <textarea
            class="form-control"
            id="output"
            name="output"
            rows="2"
            cols="50"
          ></textarea>
        </div>
        <ButtonToggle
          id="runCode"
          type="submit"
          color="primary"
          onClick={handelSubmit}
        >
          Chạy code
        </ButtonToggle>
      </div>
    </div>
  );
};
export default Compiler;
