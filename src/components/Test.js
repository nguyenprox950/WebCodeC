import React, { useState } from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import '../css/Test.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/mode/cmake/cmake';
import 'codemirror/theme/material.css';
var c;


const Test = (props) => {
  const [source, setSource] = useState();
  console.log(source);
    const codeMirrorOptions = {
      theme: 'material',
      lineNumbers: true
    };

    return (
      <div className="App">
          <div className="code-editor html-code">
            <div className="editor-header">HTML</div>
            <CodeMirror
              value={source}
              options={{
                mode: 'cmake',
                ...codeMirrorOptions,
              }}
              onBeforeChange={(editor, data, source) => {
                setSource(source)
              }}
            />
          </div>
      </div>
    );
}

export default Test;