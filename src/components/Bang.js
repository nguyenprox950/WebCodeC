import React from "react";
import { Card, Button, CardTitle, CardText, Row, Col } from "reactstrap";
import "../css/Bang.css";

const Bang = (props) => {
  return (
    <Row className="bang">
      <Col sm="6">
        <Card body>
          <h5>Bạn chưa đăng nhập</h5>
          <h5>Vui lòng đăng nhập để sử dụng dịch vụ.</h5>
          <Button color="primary" onClick={() => props.history.push("/SignIn")}>
            Đăng nhập
          </Button>
        </Card>
      </Col>
    </Row>
  );
};

export default Bang;
