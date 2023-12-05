<script setup>
import { ref } from 'vue'
import EluneInfoCard from '@/components/elune/EluneInfoCard.vue'

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
  }
])
</script>

<template>
  <div class="flex flex-col gap-10 items-center bg-main">
    <div class="lg:w-[60%]">
      <EluneInfoCard />
    </div>
    <div class="py-10 flex flex-col gap-10 items-center lg:w-[60%]">
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
.bg-main {
  background:
    linear-gradient(
      rgba(255, 255, 255, 0.95),
      rgba(255, 255, 255, 0.65),
      rgba(255, 255, 255, 0.98)
    ),
    url('/src/assets/background.svg') no-repeat;
  background-size: cover;
}
</style>
