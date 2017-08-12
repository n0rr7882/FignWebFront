var express = require('express');
var http = require('http');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { title: '/' });
});

router.get('/login', (req, res) => {
  if (!req.session.userId) {
    res.render('login');
  } else {
    res.send(`<script>alert('로그아웃 먼저 해주세요!');history.back()</script>`);
  }
});

router.post('/login', (req, res) => {
  if (!req.session.userId) {
    var data = JSON.stringify(req.body);
    console.log(data);
    var headers = {
      'Content-Type': 'application/json',
      'Content-Length': data.length
    };
    var op = {
      hostname: 'n0rr.iptime.org',
      port: 4000,
      path: '/login',
      method: 'POST',
      headers: headers
    }
    var postReq = http.request(op, (postRes) => {
      postRes.setEncoding('utf8');
      var serverData = '';
      postRes.on('data', (chunk) => {
        serverData += chunk;
      });
      postRes.on('end', () => {
        var result = JSON.parse(serverData);
        if (result.success === true) {
          req.session.userId = result.id;
          req.session.familyKey = result.familyKey;
        }
        res.json(JSON.parse(serverData));
      });
    });
    postReq.write(data);
    postReq.end();
  } else {
    res.send(`<script>alert('로그아웃 먼저 해주세요!');history.back()</script>`);
  }
});

router.get('/register', (req, res) => {
  if (!req.session.userId) {
    res.render('register');
  } else {
    res.send(`<script>alert('로그아웃 먼저 해주세요!');history.back()</script>`);
  }
});

router.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (!err) {
      res.json({ message: "로그아웃 되었습니다." });
    } else {
      console.error(err.stack);
      res.json({ message: "알 수 없는 오류." });
    }
  });
});

router.get('/families', (req, res) => {
  if (req.session.userId) {
    var headers = {
      'Content-Type': 'text/html'
    };
    var op = {
      hostname: 'n0rr.iptime.org',
      port: 4000,
      path: `/status/list/${req.session.familyKey}`,
      method: 'GET',
      headers: headers
    }
    var postReq = http.request(op, (postRes) => {
      postRes.setEncoding('utf8');
      var serverData = '';
      postRes.on('data', (chunk) => {
        serverData += chunk;
      });
      postRes.on('end', () => {
        var result = JSON.parse(serverData);
        res.render('families', { data: result });
      });
    });
    postReq.end();
  } else {
    res.send(`<script>alert('로그인 먼저 해주세요!');location.href='/login'</script>`);
  }
});

router.get('/status/:userId', (req, res) => {
  if (req.session.userId) {
    var headers = {
      'Content-Type': 'text/html'
    };
    var op = {
      hostname: 'n0rr.iptime.org',
      port: 4000,
      path: `/status/${req.params.userId}`,
      method: 'GET',
      headers: headers
    }
    var postReq = http.request(op, (postRes) => {
      postRes.setEncoding('utf8');
      var serverData = '';
      postRes.on('data', (chunk) => {
        serverData += chunk;
      });
      postRes.on('end', () => {
        var result = JSON.parse(serverData);
        var headers = {
          'Content-Type': 'text/html'
        };
        var op2 = {
          hostname: 'n0rr.iptime.org',
          port: 4000,
          path: `/comment/${req.params.userId}`,
          method: 'GET',
          headers: headers
        }
        var postReq2 = http.request(op2, (postRes2) => {
          postRes2.setEncoding('utf8');
          var serverData2 = '';
          postRes2.on('data', (chunk) => {
            serverData2 += chunk;
          });
          postRes2.on('end', () => {
            var result2 = JSON.parse(serverData2);
            console.log(result2);
            res.render('status', { data: result, comm: result2 });
          });
        });
        postReq2.end();
      });
    });
    postReq.end();
  } else {
    res.send(`<script>alert('로그인 먼저 해주세요!');location.href='/login'</script>`);
  }
});

router.get('/user', (req, res) => {
  if (req.session.userId) {
    res.render('user', { userId: req.session.userId });
  } else {
    res.send(`<script>alert('로그인 먼저 해주세요!');location.href='/login'</script>`);
  }
});

router.get('/profile', (req, res) => {
  if (req.session.userId) {
    res.render('profile');
  } else {
    res.send(`<script>alert('로그인 먼저 해주세요!');location.href='/login'</script>`);
  }
});

module.exports = router;
