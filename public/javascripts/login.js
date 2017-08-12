$('#submit').click(() => { // 로그인하기 버튼 클릭시
    var data = new FormData($('#login-form')[0]); // form data 겟
    $.ajax({
        url: '/login',
        type: 'post',
        data: data,
        processData: false,
        contentType: false,
        success: (data) => {
            if (data.success === true) {
                alert('로그인에 성공했습니다!');
                location.href = "/families";
            } else {
                alert('아이디나 비밀번호가 틀립니다.');
            }
        }
    });
});
