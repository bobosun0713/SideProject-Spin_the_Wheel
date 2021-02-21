<template>
  <div class="roulette-wrap">
    <!-- 控制go -->
    <div class="roulette-control">
      <button
        class="roulette-control__btn"
        :disabled="isStart"
        @click="clickStart"
      >
        GO
      </button>
    </div>

    <!-- 輪盤內容 -->
    <roulette-content
      ref="roulette"
      :db="dbData"
      :style="{ transform: `rotate(${degree}deg)` }"
    ></roulette-content>

    <!-- 中獎訊息(modal) -->
    <modal
      v-if="isOpenModal"
      :message="message"
      @close-Modal="closeModal"
    ></modal>

    <!-- 設定 -->
    <button class="roulette-button" :disabled="isStart" @click="openSetting">
      設定
    </button>
    <roulette-setting
      :db="dbData"
      :style="{ left: settingLeft }"
      @reset-degree="resetDegree"
    ></roulette-setting>
  </div>
</template>

<script>
import RouletteContent from '@/components/RouletteContent.vue'
import RouletteSetting from '@/components/RouletteSetting.vue'

import Modal from '@/components/Modal.vue'

import db from '@/db/data.json'
export default {
  components: {
    RouletteContent,
    RouletteSetting,
    Modal,
  },
  data() {
    return {
      dbData: db,
      degree: 0,

      isStart: false,
      isOpenModal: false,
      isOpenSetting: false,
      message: '',
    }
  },
  computed: {
    settingLeft() {
      return !this.isOpenSetting || this.isStart ? '-300px' : 0
    },
  },
  watch: {
    // 新增獎品時，重新設定角度
    dbData() {
      this.setDataDeg()
    },
  },
  mounted() {
    this.setDataDeg() // 動態新增旋轉角度
  },
  methods: {
    // 點擊開始
    clickStart() {
      this.isStart = true
      let idx = this.dbData.length - 1
      let db_Deg = this.dbData[this.rand(0, idx)].deg
      this.degree += 2880 + db_Deg - (this.degree % 360)
      this.buttonState()
      this.message = this.getRouletteMsg(db_Deg)
    },

    // 按鈕狀態
    buttonState() {
      let self = this
      this.$refs.roulette.$el.addEventListener('transitionend', function() {
        self.isStart = false
        self.isOpenModal = true
      })
    },

    // 取得獎品資訊
    getRouletteMsg(deg) {
      let price = this.dbData.filter((val) => val.deg === deg)
      return price[0].price
    },

    // 動態計算 旋轉角度
    setDataDeg() {
      this.dbData.forEach((item, idx) => {
        item.deg = (360 / this.dbData.length) * (this.dbData.length - idx)
      })
    },
    // 亂數
    rand(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min)
    },

    // 關閉modal
    closeModal(val) {
      this.isOpenModal = val
    },

    // 開啟設定視窗
    openSetting() {
      this.isOpenSetting = !this.isOpenSetting
    },

    // 重製角度
    resetDegree() {
      clearTimeout(timer)
      this.$refs.roulette.$el.style.transition = 'unset'
      this.degree = 0
      let timer = null
      timer = setTimeout(() => {
        this.$refs.roulette.$el.style.transition =
          'transform 10s cubic-bezier(0.25, 0, 0, 1)'
      }, 1000)
    },
  },
}
</script>

<style lang="scss">
.roulette-wrap {
  box-sizing: border-box;
  width: 605px;
  height: 605px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: url('~@/assets/image/Roulette.gif') no-repeat center center;
  background-size: cover;
  position: relative;
  overflow: hidden;

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
}
.roulette-control {
  position: absolute;
  width: 100px;
  height: 130px;
  background: url('~@/assets/image/Roulette_pointer.svg') no-repeat center
    center;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  cursor: pointer;

  @include RWD_499px {
    height: 80px;
  }

  &__btn {
    position: absolute;
    bottom: 25px;
    left: 0;
    right: 0;
    margin: 0 auto;

    user-select: none;
    font-size: 1.8rem;
    line-height: 30px;
    color: #fff;
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.8),
      0 0 10px rgba(246, 229, 141, 1), 0 0 30px rgba(246, 229, 141, 1),
      0 0 30px rgba(246, 229, 141, 1);

    @include RWD_676px {
      bottom: 25px;
      font-size: 1.5rem;
    }
    @include RWD_499px {
      font-size: 1rem;
      bottom: 10px;
    }
  }
}
.roulette-button {
  position: fixed;
  right: 50px;
  bottom: 50px;
  background-color: #fff;
  height: 50px;
  width: 50px;
  border-radius: 100%;
  font-weight: bold;
  font-size: 1.125rem;
}
</style>
