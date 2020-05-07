import React, { Component } from "react";
import "../css/Introduction.css";
import { Controlled as CodeMirror } from "react-codemirror2";
import "codemirror/lib/codemirror.css";
import "codemirror/mode/cmake/cmake";
import "codemirror/theme/material.css";
import AppHeader from "./AppHeader";

var cSource =
  "\
#include <stdio.h>\n\
\n\
int main() {\n\
    int a, b;\n\
    scanf(\"%d\", &a);\n\
    scanf(\"%d\", &b);\n\
    printf(\"%d\", a + b);\n\
    return 0;\n\
}";

const Introduction = () => {
  const codeMirrorOptions = {
    theme: "material",
    lineNumbers: true,
  };
    return (
      <div>
        <div>
          <AppHeader />
        </div>
        <div id="mainIntroduction">
          <div id="leftIntroduction">
            <h2>Hướng dẫn làm bài tập</h2>
            <h5>Code ví dụ cho bài tính tổng 2 số theo ngôn ngữ C:</h5>
            <CodeMirror
              className="exampleCode"
              id="exampleCode"
              value={cSource}
              options={{
                mode: "cmake",
                ...codeMirrorOptions,
              }}
            />
            <h5>Để nộp bài các bạn thực hiện theo các bước sau:</h5>
            <ul>
              <li><strong>Bước 1:</strong> Đăng ký và đăng nhập.</li>
              <li><strong>Bước 2:</strong> Mở trang "Bài tập" và chọn bài tập muốn thực hiện (<strong><span style={{color: "#ff0000"}}>Lưu ý</span></strong>: Hãy đợi bài tập load xong yêu cầu và đề bài mới thực hiện bài tập. Nếu không thấy hiện hãy ấn vào bài tập một lần nữa).</li>
              <li><strong>Bước 3:</strong> Code. Các bạn có thể code trực tiếp trên web hoặc code trên máy mình rồi copy code vào khung soạn thảo (màu đen than).</li>
              <li><strong>Bước 4:</strong> Khi code xong nhấn vào nút "Chấm code" và đợi trang web trả về kết quả. Hệ thống sẽ có các test cho mỗi bài, test nào đúng sẽ hiện chữ <strong><span style={{color: "#008000"}}>màu xanh</span></strong>. Nếu test nào sai sẽ hiện chữ <strong><span style={{color: "#ff0000"}}>màu đỏ</span></strong>.</li>
            </ul>
            <h5><span style={{color: "#ff0000"}}>Lưu ý quan trọng:</span></h5>
            <ul>
              <li>Trong code của bạn chỉ đọc và xuất ra kết quả mà đề bài yêu cầu, <strong>không thừa</strong>, <strong>không thiếu</strong>. Ví dụ bài tổng 2 số như trên, bạn chỉ xuất ra kết quả, không xuất bất kỳ cái gì khác như: printf(“Nhap a = “); như vậy sẽ thừa.</li>
              <li>Trong code của bạn <strong><span style={{color: "#ff0000"}}>không dùng</span></strong> các lệnh để dừng màn hình hoặc các lệnh hệ thống đặc biệt như system(“pause”), getch().</li>
              <li>Trong code <strong><span style={{color: "#ff0000"}}>không dùng</span></strong> thư viện conio.h.</li>
              <li>Với các bài về chuỗi ký tự, các bạn <strong><span style={{color: "#ff0000"}}>không dùng fflush(stdin)</span></strong> để xoá bộ đệm, nếu phải xoá bộ đệm hãy dùng fgets 2 lần để nhập xâu.</li>
            </ul>
          </div>
          <div id="rightIntroduction">
            <h2>Quảng cáo</h2>
          </div>
        </div>
      </div>
    );
}

export default Introduction
