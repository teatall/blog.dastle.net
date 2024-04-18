#!/bin/bash
# 为Cloudflare Page 中运行的脚本

# 1. 替换 serviceWorker 版本号
current_cache_version=$(grep -o 'var CACHE_VERSION = "V[0-9]*"' sw.js | grep -o '".*"' | sed 's/"//g')
new_cache_version=V$(date +%s)
awk -v old="$current_cache_version" -v new="$new_cache_version" '{ sub(old, new) } 1' sw.js > sw.js.tmp && mv sw.js.tmp sw.js
echo "New version $new_cache_version"

# 2. 安装依赖并启动
gem install jekyll-sitemap && gem install jekyll-paginate && jekyll build
