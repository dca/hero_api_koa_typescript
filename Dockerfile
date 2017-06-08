# Dockerfile

# 從 [Docker Hub](https://hub.docker.com/) 安裝 Node.js image。
FROM node:8.0

# 設定 container 的預設目錄位置
WORKDIR /app-src

# 將專案根目錄的檔案加入至 container
# 安裝 npm package
ADD . /app-src
RUN yarn install

# 開放 container 的 9001 port
EXPOSE 5555
CMD npm run dev
