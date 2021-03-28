<template>
  <div class="roulette-content">
    <!-- 圓盤 ( 用雙長方形，條角度產生圓弧 )-->
    <div
      v-for="(item, idx) in db"
      :key="item.id"
      :style="{ transform: panelOutside(idx) }"
      class="panel-item"
    >
      <div class="panel-item__inside" :style="{ transform: panelInside , backgroundColor:item.background }">
      </div>
      <div class="panel-item__text" :style="{ transform: panelPrice , color:item.fontColor }">
        {{ item.price }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    db: {
      type: Array,
      default() {
        return {}
      },
    },
  },
  computed: {
    // 產生圓弧(外長方形)
    panelOutside() {
      return (idx) => {
        let deg =
          (360 / this.db.length) * idx + 90 / (this.db.length / 2).toFixed(2)
        return `rotate(${deg}deg)`
      }
    },
    // 產生圓弧(內長方形)
    panelInside() {
      let deg = (180 - 360 / this.db.length).toFixed(2)
      return `rotate(${deg}deg)`
    },

    // 獎品角度
    panelPrice() {
      let outDeg = Number(
        (360 / this.db.length) * 1 + 90 / (this.db.length / 2).toFixed(2)
      )

      let inDeg = Number((180 - 360 / this.db.length).toFixed(2))
      return `rotate(-${outDeg + inDeg - 180}deg)`
    },
  },
}
</script>

<style lang="scss" scoped>
.roulette-content {
  width: 500px;
  height: 500px;
  position: relative;
  transition: transform 10s cubic-bezier(0.25, 0, 0, 1);

  @include RWD_676px {
    width: 470px;
    height: 470px;
  }
  @include RWD_576px {
    width: 425px;
    height: 425px;
  }
  @include RWD_499px {
    width: 341px;
    height: 341px;
  }
  @include RWD_411px {
    width: 290px;
    height: 290px;
  }
}

// 圓弧形
.panel-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 250px;
  height: 100%;
  transform-origin: 100% 50%;
  overflow: hidden;

  @include RWD_676px {
    width: 235px;
  }
  @include RWD_576px {
    width: 212.5px;
  }
  @include RWD_499px {
    width: 170.5px;
  }
  @include RWD_411px {
    width: 145px;
  }

  &__inside {
    width: 100%;
    height: 100%;
    background-color: brown;
    border-radius: 252.5px 0 0 252.5px;
    transform-origin: 100% 50%;
    position: relative;

    @include RWD_576px {
      border-radius: 212.5px 0 0 212.5px;
    }
    @include RWD_499px {
      border-radius: 170.5px 0 0 170.5px;
    }
    @include RWD_411px {
      border-radius: 145px 0 0 145px;
    }
  }


  // 獎品
  &__text {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 50%;
    margin-right: calc(-50% / 2);
    padding-top: 15px;
    text-align: center;
    font-size: 2rem;
    font-weight: bold;
    color: white;

    transform-origin: 50% 100%;

    @include RWD_576px {
      font-size: 1.5rem;
    }
    @include RWD_499px {
      font-size: 1.25rem;
    }
    @include RWD_411px {
      font-size: 1rem;
    }
  }
}
</style>
