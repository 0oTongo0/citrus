<template>
  <div class="login-box">
    <div class="container" :class="{ active: flag }">
      <!-- 注 册 -->
      <div class="container__form container--signup">
        <form action="#" class="form" id="form1">
          <h2 class="form__title">注 册</h2>
          <input type="text" placeholder="用户名" class="input" />
          <div class="err">请输入用户名</div>
          <input type="email" placeholder="邮箱" class="input" />
          <div class="err">请输入邮箱</div>
          <input type="password" placeholder="密码" class="input" />
          <div class="err">请输入密码</div>
          <button class="btn">注 册</button>
        </form>
      </div>

      <!-- 登 录 -->
      <div class="container__form container--signin">
        <form action="#" class="form" id="form2">
          <h2 class="form__title">登 录</h2>
          <input
            placeholder="用户名"
            class="input"
            autofocus="autofocus"
            @blur="changeName"
            v-model="userName"
          />
          <div class="err">{{ errName }}</div>
          <input
            placeholder="密码"
            class="input"
            v-model="passWord"
            @blur="changePassWord"
          />
          <div class="err">{{ errPassWord }}</div>
          <a href="#" class="link">忘记密码?</a>
          <button class="btn" @click="submitSignin">登 录</button>
        </form>
      </div>

      <!-- 遮罩 -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left">
            <button class="btn" id="signIn" @click="clickShow">登 录</button>
          </div>
          <div class="overlay__panel overlay--right">
            <button class="btn" id="signUp" @click="clickShow">注 册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
export default {
  setup() {
    let state = reactive({
      flag: false,
      userName: "", // 用户名
      passWord: "", // 密码
      errName: "", // 错误提示 用户名
      errPassWord: "", // 错误提示 密码
    });
    // 登录 用户名
    function changeName(e) {
      if (!e.target.value) {
        state.errName = "请输入用户名";
      } else {
        state.errName = "";
      }
    }

    // 登录 密码
    function changePassWord(e) {
      if (!e.target.value) {
        state.errPassWord = "请输入密码";
      } else {
        state.errPassWord = "";
      }
    }

    // 提交 登录
    function submitSignin() {
      if (!state.userName || !state.passWord) return;
      console.log(state.userName, "=====登录====", state.passWord);
    }

    // 切换 点击
    function clickShow() {
      state.flag = !state.flag;
      state.userName = "";
      state.passWord = "";
      state.errPassWord = "";
      state.errName = "";
    }
    return {
      ...toRefs(state),
      clickShow,
      changeName,
      submitSignin,
      changePassWord,
    };
  },
};
</script>

<style lang="scss" scoped>
.login-box {
  width: 100%;
  height: 100%;
  display: flex;
  background: url("../../assets/img/bg.jpg") no-repeat fixed center/ cover;
  .container {
    position: relative;
    width: 760px;
    height: 420px;
    margin: auto;
    border-radius: 14px;
    box-shadow: 0 14px 20px rgba(0, 0, 0, 0.25), 0 8px 8px rgba(0, 0, 0, 0.22);
    overflow: hidden;
    .container__form {
      position: absolute;
      height: 100%;
      width: 50%;
      left: 0;
      transition: all 0.4s ease-in-out;
      .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100%;
        padding: 0 48px;
        background: var(--bg);
        .form__title {
          font-weight: 500;
          margin-bottom: 20px;
        }
        .input {
          padding: 14px;
          margin: 0;
          width: 100%;
          background: #fff;
          border: 1px solid transparent;
          outline: none;
          &:focus {
            border: 1px solid rgba(255, 151, 0, 1);
          }
        }
        .err {
          width: 100%;
          height: 20px;
          line-height: 20px;
          padding: 0 4px;
          color: red;
          font-size: 12px;
          text-align: left;
        }
        .btn {
          position: relative;
          margin-top: 24px;
          width: 130px;
          height: 40px;
          color: #fff;
          border-radius: 5px;
          padding: 10px 25px;
          background: rgb(255, 151, 0);
          z-index: 1;
          overflow: hidden;
          cursor: pointer;
          border: none;
          user-select: none;
          transition: all 0.4s ease-in-out;
          &::before {
            content: "";
            position: absolute;
            width: 100%;
            height: 0;
            top: 0;
            left: 0;
            z-index: -1;
            background: linear-gradient(
              0deg,
              rgba(255, 151, 0, 1) 0%,
              rgba(251, 75, 2, 1) 100%
            );
            transition: all 0.4s ease-in-out;
          }
          &:hover {
            color: #333;
            &::before {
              height: 100%;
              top: auto;
              bottom: 0;
            }
          }
        }
        .link {
          margin: 24px 0;
          font-size: 14px;
          color: #464646;
          text-decoration: none;
        }
      }
    }
    .container--signup {
      z-index: 0;
    }
    .container--signin {
      z-index: 1;
    }
    .container__overlay {
      position: absolute;
      height: 100%;
      width: 50%;
      left: 50%;
      overflow: hidden;
      transition: transform 0.6s ease-in-out;
      z-index: 3;
      .overlay {
        position: absolute;
        width: 200%;
        height: 100%;
        left: -100%;
        background: url("../../assets/img/bg.jpg") no-repeat fixed center/ cover;
        transition: transform 0.6s ease-in-out;
        .overlay__panel {
          position: absolute;
          display: flex;
          width: 50%;
          height: 100%;
          .btn {
            margin: auto;
            position: relative;
            width: 130px;
            height: 40px;
            color: #fff;
            border-radius: 5px;
            padding: 10px 25px;
            font-size: 14px;
            background: rgb(255, 151, 0);
            color: #fff;
            border: none;
            cursor: pointer;
            overflow: hidden;
            z-index: 1;
            &::before {
              content: "";
              position: absolute;
              width: 100%;
              height: 0;
              top: 0;
              left: 0;
              z-index: -1;
              background: linear-gradient(
                0deg,
                rgba(255, 151, 0, 1) 0%,
                rgba(251, 75, 2, 1) 100%
              );
              transition: all 0.4s ease-in-out;
            }
            &:hover {
              color: #333;
              &::before {
                height: 100%;
                top: auto;
                bottom: 0;
              }
            }
          }
        }
        .overlay--right {
          right: 0;
        }
      }
    }
  }
  .active {
    .container__form {
      transform: translateX(100%);
    }
    .container--signup {
      z-index: 2;
    }
    .container__overlay {
      transform: translateX(-100%);
    }
    .overlay {
      transform: translateX(50%);
    }
  }
}
</style>