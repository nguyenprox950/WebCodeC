import React from "react";
import "../css/Service.css";

const Service = (props) => {
  return (
    <section id="services" className="parallax-section">
      <div className="container">
        <div className="titleServices">
          <div className="titleServices2">
            <h2 className="title-one">Dịch vụ</h2>
            <p>
              Chúng tôi đã xây dựng website chấm code online cho phép các bạn có
              thể nộp code, chạy code online và đưa ra kết quả đúng sai ngay.
              Người học sẽ biết được mình đúng hay sai, sai ở những test nào, từ
              đó có thể rút kinh nghiệm và cải thiện code của mình một cách
              nhanh chóng, phù hợp.
            </p>
          </div>
          <div className="row">
            <div className="our-service">
              <div className="services row">
                <div className="Sell1">
                  <div className="single-service">
                    <i className="fa fa-th"></i>
                    <h2>Chấm code C tự động</h2>
                    <p>
                      Trang web xây dựng hệ thống chấm code tự động để các bạn
                      có thể tự học và thực hành môn lập trình C tại nhà.{" "}
                    </p>
                  </div>
                </div>
                <div className="Sell2">
                  <div className="single-service">
                    <i className="fa fa-html5"></i>
                    <h2>Kiểm tra online</h2>
                    <p>
                      Hệ thống giúp cho giảng viên có thể tạo các bài kiểm tra
                      online trong thời gian quy định để sinh viên có thể làm và
                      nộp bài online.{" "}
                    </p>
                  </div>
                </div>
                <div className="Sell3">
                  <div className="single-service">
                    <i className="fa fa-html5"></i>
                    <h2>Hệ thống kiến thức</h2>
                    <p>
                      Trang web cung cấp những bài giảng cũng như các bài tập cơ
                      bản về môn lập trình C theo chương trình học để các bạn
                      sinh viên dễ học tập và thực hành.{" "}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;
