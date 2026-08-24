#!/bin/bash

# 部署脚本 - deploy.sh
# 用于直接在宿主机（如 CentOS, Ubuntu 等 Linux 服务器）上部署前后端全栈服务

# 遇到错误即停止执行
set -e

# 设置变量
APP_NAME="cotton-cat-web"
PORT=8080 # 网站运行的端口号，可以根据需要修改

echo "=========================================="
echo "🚀 开始部署「再见兄弟第四季」投票网站..."
echo "=========================================="

echo "🧹 0. 清理可能残留的 npm 缓存和 node_modules (防止 ENOTEMPTY 等错误)..."
rm -rf node_modules
npm cache clean --force

echo "📦 1. 正在安装项目依赖 (使用淘宝 npm 镜像加速)..."
npm install --registry=https://registry.npmmirror.com

echo "🔨 2. 正在进行前端生产环境构建..."
npm run build

echo "✨ 3. 构建完成，检查并安装进程管理工具 pm2..."
# 检查是否全局安装了 pm2，如果没有则安装
if ! command -v pm2 &> /dev/null
then
    echo "⚙️ 未检测到 pm2，正在尝试全局安装 pm2..."
    npm install -g pm2
fi

echo "🌐 4. 正在通过 pm2 启动/重载全栈 Node.js 服务..."
# 检查服务是否已经在运行，如果运行则重载服务实现热更新，否则首次启动
if pm2 describe "$APP_NAME" > /dev/null 2>&1; then
    echo "🔄 检测到服务已存在，正在执行重启以应用更新..."
    PORT=$PORT pm2 restart "$APP_NAME"
else
    echo "🚀 首次启动服务..."
    # 使用 pm2 启动 server.js（内含 Express 提供 API 并托管 dist 静态资源）
    PORT=$PORT pm2 start server.js --name "$APP_NAME"
fi

echo "💾 5. 保存 pm2 进程列表，以便开机自启..."
pm2 save

echo "=========================================="
echo "✅ 部署成功！"
echo "👉 网站现已在宿主机后台运行，访问地址: http://localhost:$PORT"
echo "👉 如需查看运行状态，请输入: pm2 status"
echo "👉 如需查看运行日志，请输入: pm2 logs $APP_NAME"
echo "👉 如需停止服务，请输入: pm2 stop $APP_NAME"
echo "=========================================="
