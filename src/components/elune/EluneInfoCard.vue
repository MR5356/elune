<script setup></script>

<template>
  <div class="flex flex-col gap-10 items-center w-full">
    <div class="py-10 flex gap-10 justify-center w-full">
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
          <a
            href="https://github.com/MR5356/elune-aio/blob/main/README.md"
            target="_blank"
            class="bg-sky-500 hover:animate-pulse text-white rounded-md p-2 px-6 cursor-pointer break-keep select-none"
          >
            使用文档
          </a>
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
              src="https://img.shields.io/badge/charts-elune_aio-blue?style=social&logo=kubernetes"
              alt="charts"
            />
          </a>
        </div>
      </div>
      <div class="flex-col flex justify-center items-center w-[40%]">
        <div
          class="w-[100%] aspect-video text-center flex flex-col justify-center items-center bg rounded-lg shadow-lg select-none bg-opacity-80"
        >
          <div class="w-fit flex flex-col gap-1">
            <div class="font-medium text-3xl xl:text-5xl text-white">Elune</div>
            <div class="h-1 bg-white" />
            <div class="bg-white px-2 w-full text-blue-400 text-sm xl:text-base">
              一站式运维工具平台
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  background:
    linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15)),
    url('/src/assets/background.svg') no-repeat;
  background-size: cover;
}
</style>
