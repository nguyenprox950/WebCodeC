import React, { Component } from 'react'
import '../css/Introduction.css'
import AppHeader from './AppHeader'

export default class Introduction extends Component {
    render() {
        return (
            <div>
                <div>
                <AppHeader/>
                </div>
                <div id="mainIntroduction">
                <div id ="leftIntroduction">
                    <h2>Giới thiệu</h2>
                    <h5>Học code C online</h5>
                    <p>Với mong muốn hỗ trợ các bạn học lập trình online, nhất là những người mới bắt đầu học lập trình về một số ngôn ngữ lập trình như c, c++, java,… Chúng tôi đã xây dựng website chấm code online cho phép các bạn có thể nộp code, chạy code online và đưa ra kết quả đúng sai ngay. Người học sẽ biết được mình đúng hay sai, sai ở những test nào, từ đó có thể rút kinh nghiệm và cải thiện code của mình một cách nhanh chóng, phù hợp.</p>
                    <p>Chúng tôi rất mong được sự góp ý của các bạn về website để ngày càng phục vụ công việc học tập của các bạn tốt hơn. Mọi góp ý, đóng góp bài tập xin gửi về email: ntknguyen19@gmail.com.</p>
                </div>
                <div id ="rightIntroduction">
                    <h2>Quảng cáo</h2>
                    <div id="carouselExampleFade" className="carousel slide carousel-fade" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/img/carousel_1.jpg" className="d-block w-100" alt="..." height = "200px" />
                    </div>
                    <div className="carousel-item">
                        <img src="/img/carousel_2.jpg" className="d-block w-100" alt="..." height = "200px"/>
                    </div>
                    <div className="carousel-item">
                        <img src="/img/carousel_3.jpg" className="d-block w-100" alt="..." height = "200px"/>
                    </div>
                </div>
                <a className="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true" />
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true" />
                    <span className="sr-only">Next</span>
                </a>
            </div>
                </div>
                </div>
            </div>
        )
    }
}
