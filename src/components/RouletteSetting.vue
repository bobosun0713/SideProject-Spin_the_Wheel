<template>
  <div class="roulette-setting">
    <div class="setting-content">
      <ul class="setting-list">
        <li v-for="(item, idx) in db" :key="item.id" class="setting-list__item">
          <span class="setting-list__text">獎品{{ idx + 1 }} </span>
          <input
            v-model.trim="item.price"
            class="setting-list__input"
            type="text"
          />
          <a
            class="setting-list__del"
            href="javascript:;"
            @click="clickDelete(idx)"
            >&#10007;</a
          >
        </li>
      </ul>
    </div>
    <button class="setting-save" @click="clickSave">新 增</button>
  </div>
</template>

<script>
export default {
  name: 'RouletteSetting',
  props: {
    db: {
      type: Array,
      default() {
        return {}
      },
    },
  },
  methods: {
    clickDelete(idx) {
      this.db.splice(idx, 1)
      this.resetDegree()
    },

    clickSave() {
      let idx = this.db.length + 1 + ''
      this.db.push({ id: idx, price: 0 })
      this.resetDegree()
    },

    resetDegree() {
      this.$emit('reset-degree')
    },
  },
}
</script>

<style lang="scss" scoped>
.roulette-setting {
  position: fixed;
  z-index: 5;
  top: 0;
  left: -300px;
  width: 300px;
  height: 100%;
  background: linear-gradient(60deg, #313f49, #131e26);
  box-shadow: 2px 0 10px rgb(165, 162, 162);
  transition: left 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  // RWD
  @include RWD_499px {
    width: 200px;
  }
}

// 獎品內容
.setting-content {
  height: calc(100% - 100px);
  overflow-y: scroll;

  .setting-list {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    text-align: center;
    list-style: none;

    &__item {
      display: flex;
      justify-content: space-between;
      background-color: #0e171d;
      height: 40px;
      margin-bottom: 10px;
    }

    // 獎品名稱
    &__text {
      border-left: 4px solid #ff9519;
      display: inline-block;
      width: calc(100% / 3);
      color: #ff9519;
      font-weight: bold;
      line-height: 40px;
    }
    // 獎品數量
    &__input {
      width: calc(100% / 3);
      outline: none;
      border: 0;
      padding-left: 10px;
      background-color: transparent;
      color: #ff9519;
      font-size: 1.125rem;
    }
    // 刪除
    &__del {
      display: inline-block;
      width: calc(100% / 3);
      line-height: 40px;
      text-decoration: none;
      color: red;
    }
  }
}
// 新增按鈕
.setting-save {
  width: 150px;
  height: 50px;
  border-radius: 50px;
  margin: 0 auto 25px;
  font-size: 1.25rem;
  font-weight: bold;
  background-color: #ff9519;
  color: white;
}

// scoll bar樣式
.setting-content::-webkit-scrollbar {
  width: 8px;
  height: 50px;
}
.setting-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 10px;
}
</style>
