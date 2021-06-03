<template>
  <div class="citrus-bg">
    <div class="citrus-box">
      <!-- 左 -->
      <aside class="citrus-left">
        <!-- top -->
        <header class="citrus-left-t">
          <img src="" alt="" class="portrait-img" />
          <div class="citrus-left-search" @click="clickShow">
            <i class="iconfont icon-sousuo"></i>
          </div>
        </header>
        <section class="citrus-left-c">
          <ul class="citrus-left-list">
            <li class="citrus-left-item">
              <div class="item-left">
                <img src="" alt="" />
              </div>
              <div class="item-center">
                <div class="item-title">
                  <span class="name">大炮哥</span>
                  <span class="time">12：00</span>
                </div>
                <div class="item-content">大炮哥，你好强哦，带飞</div>
              </div>
            </li>
          </ul>
        </section>
      </aside>
      <!-- 右 -->
      <main class="citrus-main">
        <header class="main-top">
          <div class="main-top-img">
            <img src="" alt="" />
            <span>大炮哥</span>
          </div>
          <div class="main-top-set">
            <i class="iconfont icon-shezhi1"></i>
          </div>
        </header>
        <section class="citrus-main-content">
          <ul class="citrus-main-list">
            <li class="citrus-main-item">
              <p class="citrus-main-time">8月1日</p>
              <div class="content">
                <img src="" alt="" class="content-img" />
                <div class="content-txt">
                  xxxxxxxxxxxxx213131312313123131231313131231313131231231231313x
                </div>
              </div>
            </li>
            <li class="citrus-main-item">
              <p class="citrus-main-time">8月1日</p>
              <div class="content reverse">
                <img src="" alt="" class="content-img" />
                <div class="content-txt">
                  王大大无多哇大大无大大大无大无大无大无大无大无大无大无大无大王道哇多
                </div>
              </div>
            </li>
          </ul>
        </section>
        <footer class="citrus-main-footer"></footer>
      </main>
      <!-- 搜索 -->
      <search v-model:searchFlag="searchFlag" />
    </div>
  </div>
</template>

<script >
import { reactive, toRefs } from "vue";
import search from "./components/search.vue";
export default {
  components: {
    search,
  },
  setup() {
    let state = reactive({
      searchFlag: false, // 搜索弹框
    });
    // 搜索显示
    function clickShow() {
      state.searchFlag = true;
    }
    return {
      ...toRefs(state),
      clickShow,
    };
  },
};
</script>

<style lang="scss" scoped>
.citrus-bg {
  display: flex;
  height: 100%;
  width: 100%;
  .citrus-box {
    position: relative;
    display: flex;
    width: 1100px;
    height: 700px;
    margin: auto;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 14px 20px rgba(0, 0, 0, 0.25), 0 8px 8px rgba(0, 0, 0, 0.22);
    // 左
    .citrus-left {
      flex: 0 0 350px;
      height: 100%;
      display: flex;
      flex-direction: column;
      overflow: hidden;
      .citrus-left-t {
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-height: 80px;
        padding: 0 20px;
        background: #303841;
        .portrait-img {
          width: 40px;
          height: 40px;
          background: #fff;
          border-radius: 50%;
          object-fit: cover;
          cursor: pointer;
          transition: all 2s ease;
          &:hover {
            transform: rotate(360deg);
          }
        }
        .citrus-left-search {
          width: 40px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #f4f4f4;
          //   background: #01e777;
          cursor: pointer;
          .iconfont {
            font-size: 26px;
          }
          &:hover {
            color: #01e777;
          }
        }
      }
      .citrus-left-c {
        flex: 1;
        overflow: hidden;
        background: #363e47;
        .citrus-left-list {
          width: 367px;
          height: 100%;
          overflow-y: auto;
          .citrus-left-item {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 10px;
            padding: 0 37px 0 20px;
            min-height: 80px;
            cursor: pointer;
            &:hover {
              background: #3f4953;
            }
            .item-left {
              position: relative;
              margin-right: 20px;
              min-width: 50px;
              height: 50px;
              img {
                display: block;
                width: 100%;
                height: 100%;
                border-radius: 50%;
                background: #fff;
                object-fit: cover;
              }
            }
            .item-center {
              flex: 1;
              overflow: hidden;
              .item-title {
                display: flex;
                justify-content: space-between;
                .name {
                  font-size: 16px;
                  color: #fff;
                  font-weight: bold;
                }
                .time {
                  padding: 4px;
                  font-size: 12px;
                  color: #fff;
                  background: #303841;
                }
              }
              .item-content {
                margin-top: 4px;
                font-size: 12px;
                color: #b3b3b3;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
              }
            }
          }
        }
      }
    }
    // 右
    .citrus-main {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #f4f4f4;
      .main-top {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0px 40px;
        min-height: 80px;
        border-bottom: 1px solid #d6d6d6;
        background: #fff;
        .main-top-img {
          display: flex;
          align-items: center;
          font-size: 23px;
          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 20px;
            background: #fff;
            object-fit: cover;
          }
        }
        .main-top-set {
          width: 50px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          cursor: pointer;
          .iconfont {
            font-size: 26px;
          }
          &:hover {
            color: #01e777;
          }
        }
      }
      .citrus-main-content {
        flex: 1;
        overflow: hidden;
        .citrus-main-list {
          width: 767px;
          height: 100%;
          padding-right: 17px;
          overflow-y: auto;
          .citrus-main-item {
            margin: 16px;
            .citrus-main-time {
              margin-bottom: 10px;
              font-size: 14px;
              color: #afafaf;
              text-align: center;
            }
            .content {
              display: flex;
              .content-img {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                background: #fff;
                object-fit: cover;
              }
              .content-txt {
                flex: 0 0 50%;
                background-color: #fff;
                padding: 15px;
                border-radius: 10px;
                margin-left: 16px;
                color: #626c76;
                word-break: break-all;
              }
            }
            .reverse {
              flex-direction: row-reverse;
              .content-txt {
                margin-left: 0;
                margin-right: 16px;
                background: #01e777;
              }
            }
          }
        }
      }
      .citrus-main-footer {
        min-height: 120px;
        background: #fff;
      }
    }
  }
}
</style>