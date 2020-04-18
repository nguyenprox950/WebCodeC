import React from 'react'
import { ButtonToggle } from "reactstrap";

export const Translate = (props) => {
    const handelSubmit = () => {  
        var code = btoa(unescape(encodeURIComponent(document.getElementById('source_code').value || "")));
        document.getElementById('output').value =  code;
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
              <label>Encode</label>
              <textarea class="form-control" id='output' name="output" rows="2" cols="50"></textarea>
              </div>
              <ButtonToggle id="runCode" type='submit' color="primary" onClick={handelSubmit}>Chạy code</ButtonToggle>
            </div> 
          </div>                 
    )
}

export default Translate
