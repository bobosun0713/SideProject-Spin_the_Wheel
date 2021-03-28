<template>
  <div class="roulette-setting">
    <div class="setting-content">
      <!-- <ul class="setting-list"> -->
      <transition-group tag="ul" class="setting-list" name="list" mode="out-in">
        <li v-for="(item, idx) in db" :key="item.id" class="setting-list__item">
          <div class="setting-list__block">
            <p class="setting-list__block-title">獎品{{ idx + 1 }} :</p>
            <input
              v-model.trim="item.price"
              class="setting-list__input"
              type="text"
            />
          </div>
          <div class="setting-list__block"
          >
            <p class="setting-list__block-title">背景 :</p> 
            <div class="setting-list__color-content">
              <input
                v-model.trim="item.background"
                class="setting-list__color"
                type="color"
              />
            </div>
          
          </div>
          <div class="setting-list__block">
            <p class="setting-list__block-title">文字 :</p>  
            <div class="setting-list__color-content">
              <input
                v-model.trim="item.fontColor"
                class="setting-list__color"
                type="color"
              />
            </div>
          </div>

          <button
            class="setting-list__del"
            href="javascript:;"
            @click="clickDelete(idx)"
          >刪除</button>
        </li>
      </transition-group>
      <!-- </ul> -->
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
      this.db.push({ id: idx, price: null ,background:"#75485e" , fontColor:"#ffffff"})
      this.resetDegree()
    },

    resetDegree() {
      this.$emit('reset-degree')
    },
  },


  
}
</script>

<style lang="scss" >
.roulette-setting {
  position: fixed;
  z-index: 5;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  padding: 10px;
  width: 800px;
  height: 60vh;
  background: linear-gradient(60deg, #313f49, #131e26);
  border-radius:0 0 10px 10px;
  transition: left 0.5s;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &::before{
    content: '轉盤設定';
    position: absolute;
    top: -40px;
    left: 0;
    background-color: #ff9519;
    border-radius: 10px 10px 0 0;
    box-shadow: 0 0 4px rgb(165, 162, 162);
    color:white;
    text-shadow: 1px 1px 2px black;
    font-size: 1.25rem;
    font-weight: 600;
    text-align: center;
    line-height: 40px;
    width: 100%;
    height: 40px;
    // display: block;
  }

  // RWD
   @include RWD_991px {
    width: 90%;
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
    position: relative;
    overflow: hidden;
    

    &__item {
      display: flex;
      justify-content: space-between;
      background-color: #0e171d;
      margin-bottom: 10px;
      border-left: 4px solid #ff9519;

        // RWD
      @include RWD_991px {
        width: 100%;
         justify-content: unset;
        flex-direction: column;
        flex-wrap: wrap;
      }
    }

    // 獎品名稱
    &__block {
      display: flex;
      align-items: center;
      color: #ff9519;
      font-weight: bold;
      line-height: 40px;

      
      &-title{
        width: 100px;
        text-align: right;
        padding-right: 10px;
        // flex: 0.5;
      }
    }
    // 獎品數量
    &__input {
      border: 1px solid #5f5244;
      outline: none;
      padding:0 10px;
      background-color: transparent;
      color: #ff9519;
      font-size: 1.125rem;
      text-align: right;
    }
    // 顏色
    &__color-content{
     border: 1px solid #5f5244;
      position: relative;
      overflow: hidden;
      width: 60px;
      height: 25px;


    }
    &__color{
      position:absolute;
      top: -10px;
      left: -10px;
      width: 80px;
      height: 50px;
    }
    // 刪除
    &__del {
      display: inline-block;
      width: 50px;
      line-height: 40px;
      text-decoration: none;
      color: red;

        @include RWD_991px {
        margin:  0 auto;
        }
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
