require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const https = require('https');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static('pages/login'));
app.use(express.static('assets'));
app.use(express.static('.'));

// 根路由重定向到login.html
app.get('/', (req, res) => {
    res.redirect('/login.html');
});

// 显式处理/login.html路由
app.get('/login.html', (req, res) => {
    res.sendFile('login.html', { root: './pages/login' });
});

// 数据库连接
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/course-schedule', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// 课程模型
const Course = mongoose.model('Course', {
    name: String,
    teacher: String,
    location: String,
    weekDay: Number,
    timeSlot: Number,
    weeks: [Number]
});

// API路由
app.get('/api/courses', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.post('/api/courses', async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// HTTP服务
app.listen(PORT, '0.0.0.0', () => {
    console.log(`HTTP服务运行在 http://0.0.0.0:${PORT}`);
});

// HTTPS服务
const httpsOptions = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH || 'path/to/privkey.pem'),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH || 'path/to/fullchain.pem')
};

const HTTPS_PORT = process.env.HTTPS_PORT || 443;
https.createServer(httpsOptions, app).listen(HTTPS_PORT, '0.0.0.0', () => {
    console.log(`HTTPS服务运行在 https://0.0.0.0:${HTTPS_PORT}`);
});