import React, { useState } from "react";
import "../css/Compiler.css";
import Swal from "sweetalert2";
import { Controlled as CodeMirror } from "react-codemirror2";
import { ButtonToggle } from "reactstrap";
import axios from "axios";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/cmake/cmake";
import "codemirror/theme/material.css";
var defaultUrl = "https://api.judge0.com";
var apiUrl = defaultUrl;

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
    lineWrapping: true,
    scrollbarStyle: null,
  };

  const getCode = (token) => {
    axios
      .request({
        url: apiUrl + "/submissions/" + token + "?base64_encoded=true",
        method: "GET",
        async: true,
      })
      .then((result) => {
        console.log(result.data);
        if (result.data.status.id <= 2) {
          document.getElementById("output").value =
            result.data.status.description;
          setTimeout(getCode.bind(null, result.data.token));
        } else {
          console.log(decode(result.data.stdout));
          document.getElementById("output").value =
            "Code của bạn đã được chạy trong " +
            result.data.time +
            "s\n" +
            decode(result.data.stdout);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const sendCode = (dataCode) => {
    axios
      .request({
        url: apiUrl + `/submissions?base64_encoded=true&wait=false`,
        method: "POST",
        async: true,
        contentType: "application/json",
        data: dataCode,
      })
      .then((result) => {
        console.log(result.data);
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
    console.log(source);
    if (data.source_code === "") {
      Swal.fire({
        icon: "error",
        title: "Thất bại",
        text: "Code không được bỏ trống",
      });
    } else {
      data.stdin = document.getElementById("stdin").value;
      var code = btoa(unescape(encodeURIComponent(data.source_code || "")));
      console.log(data.stdin);
      var input = btoa(unescape(encodeURIComponent(data.stdin || "")));
      console.log("ngôn ngữ:" + data.language_id + "\n" + "souce_code:" + code);

      var dataSubmit = {
        source_code: code,
        language_id: 54,
        stdin: input,
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
              mode: "cmake",
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
