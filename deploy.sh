#!/bin/bash
git pull
# 查找并终止与`go run .`相关的进程，如果没有找到则输出提示
pkill -f 'go run .' || echo 'No Go service running'
# 进入server目录
cd server
# 执行go generate以安装依赖
go generate
# 构建项目，使用-v选项输出详细信息
go build -v .
# 使用nohup后台运行服务，避免阻塞
nohup go run . &

# 查找并终止与`npm run serve`相关的进程，如果没有找到则输出提示
pkill -f 'npm run serve' || echo 'No Node.js service running'
# 进入web目录
cd ../web
# 安装npm依赖
npm install
# 使用nohup后台运行服务，避免阻塞
nohup npm run serve &


