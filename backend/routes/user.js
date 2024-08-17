const express = require('express')
const querystring = require('querystring')
const axios = require('axios')

// Controller Functions
const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router()
const config = {
    client_id: 'Ov23liQXNGCyDF6pFsXs',
    client_secret: '4d554128c95a7955126106b1d207d66b22fd50cf'
}

// Login Route
router.post('/login', loginUser)

// Signup Route
router.post('/signup', signupUser)

router.get('/github/login', async ctx => {
    let path = 'https://github.com/login/oauth/authorize?client_id=' + config.client_id
    ctx.redirect(path)
});

router.get('/github/callback', async ctx => {
    console.log('callback...')

    // 服务器认证成功，回调带回认证状态code
    const code = ctx.query.code
    const params = {
        client_id: config.client_id,
        client_secret: config.client_secret,
        code: code
    }

    // 申请令牌token
    let res = await axios.post('https://github.com/login/oauth/access_token', params)
    const access_token = querystring.parse(res.data).access_token

    res = await axios.get(`https://api.github.com/user`, {
        headers: {
            'Authorization': 'token ' + access_token
        }
    })

    // 渲染页面
    ctx.body = `
    <h1>Hello ${res.data.login}</h1>
    <img src="${res.data.avatar_url}" alt="">
  `
});

module.exports = router