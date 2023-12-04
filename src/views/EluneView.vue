<script setup>
import { ref } from 'vue'

const features = ref([
  {
    title: '多环境支持',
    desc: 'Elune支持多种环境：kubernetes/docker(elune-aio)/binary(elune-aio)，安装使用说明见：https://hub.docker.com/repository/docker/toodo/elune-aio'
  },
  {
    title: '多缓存支持',
    desc: 'Elune支持多种缓存：redis/memory(default)，支持通过环境变量<code>ELUNE_CACHE_DRIVER</code>配置缓存驱动，如<code>ELUNE_CACHE_DRIVER=redis</code>，并通过环境变量<code>ELUNE_CACHE_DSN</code>配置缓存地址，如<code>ELUNE_CACHE_DSN="redis://127.0.0.1:6379?protocol=3"></code>'
  },
  {
    title: '多数据库支持',
    desc: 'Elune支持多种数据库：mysql/postgresql/sqlite(default)，支持通过环境变量<code>ELUNE_DB_DRIVER</code>配置数据库驱动，如<code>ELUNE_DB_DRIVER=postgres</code>，并通过环境变量<code>ELUNE_DB_DSN</code>配置数据库地址，如<code>ELUNE_DB_DSN="host=postgresql-hl user=elune password=elune dbname=elune port=5432 sslmode=disable TimeZone=Asia/Shanghai"</code>'
  },
  {
    title: '多种认证方式',
    desc: 'Elune支持多种认证方式，如内建用户库、gitlab/github单点登录、ldap等，<span class="text-red-300">当前仅支持内建用户库登录，后续会支持多种认证</span>'
    // images: ['https://www.dmoe.cc/random.php']
  },
  {
    title: '多主机管理',
    desc: 'Elune支持管理多个主机/虚拟机，支持分组管理等'
  },
  {
    title: '脚本管理',
    desc: 'Elune支持管理脚本，在多个主机/虚拟机上或者按照主机分组一键执行脚本'
  },
  {
    title: '自备份管理',
    desc: 'Elune支持自备份管理，支持备份/恢复导航菜单、脚本等'
  },
  {
    title: '定时任务管理',
    desc: 'Elune支持定时任务管理，支持定时执行脚本'
  }
])
</script>

<template>
  <div class="flex flex-col gap-10 items-center">
    <div class="py-10 flex gap-10 justify-center lg:w-[70%]">
      <div class="flex flex-col gap-4 justify-center w-[60%]">
        <div class="font-bold text-4xl mb-3">Elune运维工具平台</div>
        <div class="flex gap-4">
          <a
            href="//docker.ac.cn"
            target="_blank"
            class="bg-gray-500 hover:animate-pulse text-white rounded-md p-2 px-6 cursor-pointer break-keep select-none"
          >
            在线演示
          </a>
          <div
            class="bg-sky-500 hover:animate-pulse text-white rounded-md p-2 px-6 cursor-pointer break-keep select-none"
          >
            使用文档
          </div>
        </div>
        <div class="flex gap-4">
          <a href="https://github.com/mr5356/elune-aio" target="_blank">
            <img
              src="https://img.shields.io/github/stars/mr5356/elune-aio?style=social"
              alt="github"
            />
          </a>
          <a href="https://hub.docker.com/repository/docker/toodo/elune-aio" target="_blank">
            <img
              src="https://img.shields.io/github/downloads/mr5356/elune-aio/total?style=social"
              alt="docker"
            />
          </a>
        </div>
      </div>
      <div class="flex-col flex justify-center items-center w-[40%]">
        <div
          class="w-[384px] h-[216px] text-center flex flex-col justify-center items-center bg rounded-lg shadow-lg select-none bg-opacity-80"
        >
          <div class="w-fit flex flex-col gap-1">
            <div class="font-medium text-5xl text-white">Elune</div>
            <div class="h-1 bg-white" />
            <div class="bg-white px-2 w-full text-blue-400">一站式运维工具平台</div>
          </div>
        </div>
      </div>
    </div>
    <div class="py-10 flex flex-col gap-10 items-center lg:w-[70%]">
      <div class="font-bold text-3xl">好用的工具，不仅仅是运维</div>
      <div class="flex flex-col gap-4 w-full">
        <div v-for="feature in features" :key="feature.title" class="flex flex-col gap-2 w-full">
          <div class="font-medium">{{ feature.title }}</div>
          <div class="text-gray-500" v-html="feature.desc"></div>
          <div class="w-full" v-for="image in feature.images" :key="image">
            <img class="w-full rounded-lg shadow" :src="image" alt="image" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background:
    linear-gradient(rgba(0, 0, 0, 0.05), rgba(0, 0, 0, 0.02)),
    url('/src/assets/background.svg') no-repeat;
  background-size: cover;
}
</style>
