# 课程表应用

一个简单的课程表Web应用，支持按周次查看课程安排。

## 功能特点

- 按周次显示课程表
- 支持课程的添加和查看
- 响应式界面设计

## 技术栈

- 前端：原生JavaScript
- 后端：Node.js + Express
- 数据库：MongoDB

## 安装步骤

1. 克隆项目到本地
2. 安装依赖
   ```bash
   npm install
   ```
3. 确保MongoDB服务已启动
4. 创建.env文件并配置环境变量（参考.env.example）

## 运行项目

开发模式：
```bash
 npm run dev
```

生产模式：
```bash
 npm start
```

访问 http://localhost:3000 查看应用

## 项目结构

- `index.html`: 前端页面
- `app.js`: 前端逻辑
- `styles.css`: 样式文件
- `server.js`: 后端服务器
- `package.json`: 项目配置
- `.env`: 环境变量