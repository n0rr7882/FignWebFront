$('#submit').click(() => { // 로그인하기 버튼 클릭시
    var data = new FormData($('#status-form')[0]); // form data 겟
    $.ajax({
        url: 'http://n0rr.iptime.org:4000/status',
        type: 'post',
        data: data,
        processData: false,
        contentType: false,
        success: function (data) {
            if (data.success === 'true') {
                alert('상태 업로드 성공!');
                location.href = '/families';
            } else {
                alert('알 수 없는 오류');
            }
        }
    });
});