$('#submit').click(() => { // 로그인하기 버튼 클릭시
    var data = new FormData($('#register-form')[0]); // form data 겟
    $.ajax({
        url: 'http://n0rr.iptime.org:4000/register',
        type: 'post',
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.text === 'true') {
                alert('회원가입에 성공했습니다!');
                location.href = '/login';
            } else {
                alert('알 수 없는 오류');
            }
        }
    });
});