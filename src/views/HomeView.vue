<script setup></script>

<template>
  <div class="flex flex-col gap-4">
    <div class="head-img w-full max-h-[666px] h-[666px] flex justify-center items-center">
      <div class="flex flex-col gap-10 2xl:w-[70%] xl:w-[70%] md:w-[80%] w-[90%] text-white">
        <div class="text-7xl font-bold font-sans subpixel-antialiased uppercase leading-[1.15]">
          <p>Make</p>
          <p>Cloud native</p>
          <p>convenient</p>
        </div>
        <div>
          <p>一个为云原生服务的工具社区，用于快速搭建云原生应用</p>
        </div>
        <div class="border-b-[1px] border-slate-50"></div>
        <div class="flex gap-20 items-center text-lg">
          <div class="font-bold">关于社区</div>
          <div class="flex flex-col justify-center items-center">
            <div class="tabular-nums font-bold text-2xl">39k</div>
            <div>Projects</div>
          </div>
          <div>Contributors</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.head-img {
  background:
    linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),
    url('https://www.dmoe.cc/random.php') no-repeat;
}
</style>
