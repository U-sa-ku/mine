<template>
  <div class="imageLoading">
    <partsMineLogo
      class="imageLoading__logo"
      :isInitShow="true"
      />
  </div>
</template>

<style lang="scss" scoped>
  .imageLoading {
    width: 20%;
    max-width: 80px;
    height: auto;
    position: absolute;
    left: 50%;
    top: 50%;
    z-index: 0;
    transform: translate(-50%, -50%);
    @media (max-width: 999px) {
      max-width: 60px;
    }
    &__logo {
      opacity: 0.3;
      animation: spin 2s infinite;
    }
  }
  .lazyloaded ~ .imageLoading {
    animation: fadeOut 1s forwards;
  }
  @keyframes spin {
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 0;
      z-index: -1;
    }
  }
</style>
