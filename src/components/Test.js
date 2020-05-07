import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import { MyInput } from "./MyInput";
import { Formik, Form } from "formik";
import { Button } from "reactstrap";

const Test= () =>{
  const [name, setName] = useState('Cat in the Hat');
  const handleChange = (event) => {
    setName(event.target.value);
  };

  return (
    <Formik
        initialValues={{
          title: "",
          introduct: "",
          input1: "",
          output1: "",
          input2: "",
          output2: "",
          input3: "",
          output3: "",
          input4: "",
          output4: "",
          input5: "",
          output5: "",
          deadLine: "",
        }}
      >
        {({ handelSubmit }) => (
          <Form className="FormikHomeWork">
            <MyInput type="text" name="title" label="Tiêu đề" />
            <MyInput type="text" name="introduct" label="Yêu cầu" />
            <MyInput
              type="datetime-local"
              name="deadLine"
              label="Deadline"
              format="dd/MM/yyyy"
              InputLabelProps={{ shrink: true }}
            />
            <MyInput hidden = {false} type="text" name="input1" label="Input1" />
            <MyInput hidden = {false} value={name} onChange={handleChange} type="text" name="output1" label="Output1" />
            <MyInput hidden = {false} type="text" name="input2" label="Input2" />
            <MyInput hidden = {false} value={name} onChange={handleChange} type="text" name="output2" label="Output2" />
            <Button
              id="createHomeWork"
              color="primary"
              type="submit"
              name="createHomeWork"
              onClick={handelSubmit}
            >
              Tạo bài tập
            </Button>
          </Form>
          // <Modal isOpen={modal} toggle={toggle} className="modalHistory">
          //   <ModalHeader toggle={toggle}>{"Output"+localStorage.getItem("Output")}</ModalHeader>
          //   <ModalBody>
          //     <CodeMirror
          //       id="source_code"
          //       value={source}
          //       options={{
          //         mode: "cmake",
          //         ...codeMirrorOptions
          //       }}
          //       onBeforeChange={(editor, data, source) => {
          //         setSource(source);
          //       }}
          //     />
          //   </ModalBody>
          //   <ModalFooter>
          //     <Button color="primary" onClick={(values)=>setOutput(values)}>
          //       Chấp nhận
          //     </Button>
          //   </ModalFooter>
          // </Modal>
        )}
      </Formik>
  );
}

export default Test
