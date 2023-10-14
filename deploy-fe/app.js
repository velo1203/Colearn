const express = require('express');
const path = require('path');
const app = express();

// 리액트 정적 파일 제공
app.use(express.static(path.join(__dirname, './build')));

app.listen(10208, "0.0.0.0", function () {
  console.log('listening on 10208');
}); 

// 모든 경로에 대해 index.html 반환
app.get('*', function (요청, 응답) {
    응답.sendFile(path.join(__dirname, './build/index.html'));
});
