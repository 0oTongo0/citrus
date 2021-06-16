<template>
  <transition name="list">
    <div class="search" v-if="searchFlag">
      <div class="search-bg" @click="clickHide"></div>
      <div class="search-box">
        <div class="search-top">
          <i class="iconfont icon-sousuo"></i>
          <input
            type="text"
            v-model="userName"
            placeholder="搜索用户"
            @input="inputMsg"
          />
        </div>
        <div class="content">
          <ul class="content-list">
            <li class="content-item" v-for="item in listData" :key="item.id">
              <img :src="imgPath + item.imgUrl" class="img" />
              <div class="name" v-html="item.userName"></div>
              <span class="item-but">添加好友</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { reactive, toRefs } from "vue";
import { searchUser } from "@/api/user";
import { debounce } from "@/utils/debounceOrthrottle";
let imgPath = "http://127.0.0.1:3000";
export default {
  props: {
    searchFlag: Boolean,
  },
  //   methods: {
  //     clickHide() {
  //       this.$emit("update:searchFlag", false);
  //       console.log(this, "===============");
  //     },
  //   },

  setup(props, context) {
    let state = reactive({
      userName: "",
      listData: [],
      imgPath,
    });

    // 点击bg 隐藏
    function clickHide() {
      context.emit("update:searchFlag", false);
      state.listData = [];
      state.userName = "";
    }

    // 搜索
    let inputMsg = debounce(async () => {
      try {
        let data = {
          userName: state.userName,
        };
        let exp = eval("/" + data.userName + "/g");
        let res = await searchUser(data);
        if (res && res.code != 200) return;
        res.results.forEach((item) => {
          item.userName = item.userName.replace(
            exp,
            "<span style='color:#01e777'>" + data.userName + "</span>"
          );
        });
        state.listData = res.results;
      } catch (err) {
        console.log(err, "=====搜索==错误==");
      }
    }, 500);

    return {
      ...toRefs(state),
      clickHide,
      inputMsg,
    };
  },
};
</script>

<style lang="scss" scoped>
.search {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .search-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
  }
}
.search-box {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 350px;
  padding: 0 20px;
  background: #f4f4f4;
  box-shadow: 3px 0px 6px 0px #ccc;
  z-index: 1;
  .search-top {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 80px;
    .iconfont {
      position: absolute;
      left: 15px;
      top: 50%;
      font-size: 20px;
      transform: translateY(-50%);
    }
    input {
      width: 100%;
      height: 40px;
      border-radius: 4px;
      padding-left: 50px;
      border: none;
      outline: none;
    }
  }
  .content {
    flex: 1;
    overflow: hidden;
    .content-list {
      height: 100%;
      //   width: 327px;
      overflow-y: auto;
      font-size: 14px;
    }
    .content-item {
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .img {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
        object-fit: cover;
      }
      .name {
        flex: 1;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      .item-but {
        min-width: 60px;
        padding: 4px 0;
        border-radius: 4px;
        font-size: 12px;
        text-align: center;
        color: #fff;
        background: #01e777;
        cursor: pointer;
        user-select: none;
        &:hover {
          background: #09ef7f;
        }
      }
    }
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  transform: translateX(-350px);
}
</style>