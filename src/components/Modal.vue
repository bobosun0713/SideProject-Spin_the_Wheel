<template>
  <div class="modal">
    <div class="modal-content">
      <div class="modal-content__text">恭喜獲得 {{ message }}</div>
      <button class="modal-content__cancel" @click="closeModal">關 閉</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    message: {
      type: String,
      default: '',
    },
  },
  methods: {
    closeModal() {
      this.$emit('close-Modal', false)
    },
  },
}
</script>

<style lang="scss" scoped>
.modal {
  position: absolute;
  background-color: rgba(0, 0, 0, 0.3);
  width: 100%;
  height: 100%;
  z-index: 5;
  top: 0;
  left: 0;

  justify-content: center;
  align-items: center;

  &-content {
    width: 600px;
    height: 600px;
    background-color: rgba(255, 255, 255, 0.7);
    border-radius: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;

    @include RWD_676px {
      width: 565px;
      height: 565px;
    }
    @include RWD_576px {
      width: 515px;
      height: 515px;
    }
    @include RWD_499px {
      width: 415px;
      height: 415px;
    }
    @include RWD_411px {
      width: 355px;
      height: 355px;
    }

    // 中獎金額
    &__text {
      margin-top: 200px;
      font-size: 3rem;
      font-weight: bold;

      @include RWD_676px {
        font-size: 2.5rem;
      }
      @include RWD_576px {
        margin-top: 170px;
        font-size: 2rem;
      }
      @include RWD_499px {
        margin-top: 130px;
        font-size: 1.875rem;
      }
      @include RWD_411px {
        margin-top: 120px;
        font-size: 1.5rem;
      }
    }

    // 關閉
    &__cancel {
      padding: 8px 30px;
      border: 2.5px solid white;
      border-radius: 30px;
      font-size: 2rem;
      font-weight: bold;
      background-color: #fc5000;
      color: white;
      transition: background-color 0.3s ease;
      animation: btn 1s infinite linear;
      text-shadow: 0.5px 0.5px 1px rgb(85, 84, 84);

      &:hover {
        background-color: orange;
      }

      @include RWD_576px {
        font-size: 1.5rem;
      }
      @include RWD_411px {
        font-size: 1rem;
      }

      @keyframes btn {
        0% {
          transform: scale(1.05);
        }
        50% {
          transform: scale(1);
        }
        100% {
          transform: scale(1.05);
        }
      }
    }
  }
}
</style>
