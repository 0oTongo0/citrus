<template>
  <transition name="list">
    <div class="user" v-if="userFlag">
      <div class="user-bg" @click="clickHide"></div>
      <div class="user-box">
        <div class="form">
          <div class="form-item">
            <span>用户名：</span>
            <input
              type="text"
              v-model="userData.userName"
              class="input"
              autocomplete="new-password"
              disabled
            />
          </div>
          <div class="form-item">
            <span>密码：</span>
            <input
              type="password"
              class="input"
              v-model="userData.passWord"
              @blur="changePassWord"
              autocomplete="new-password"
            />
          </div>
          <div class="form-item">
            <span>头像：</span>
            <img :src="imgPath + userData.imgUrl" alt="头像" class="imgUrl" />
            <UploadImage @uploadCallBack="uploadCallBack" />
          </div>
          <div class="form-item">
            <span>性别：</span>
            <div class="sex-box">
              <div class="radio">
                <input
                  type="radio"
                  id="man"
                  name="sex"
                  value="1"
                  v-model="userData.sex"
                />
                <label for="man" class="radio-label">男</label>
              </div>
              <div class="radio">
                <input
                  type="radio"
                  id="girl"
                  name="sex"
                  value="2"
                  v-model="userData.sex"
                />
                <label for="girl" class="radio-label">女</label>
              </div>
            </div>
          </div>
          <div class="form-item">
            <button class="updataBut" @click="submitUpdata">修改信息</button>
          </div>
          <div class="form-item">
            <button class="outBut" @click="clickOutBut">退出登录</button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { reactive, toRefs, watch, onDeactivated } from "vue";
import { userInfo, updataUser } from "@/api/user";
import { debounce } from "@/utils/debounceOrthrottle";
import UploadImage from "@/components/UploadImage";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import Message from "@/components/Message/index.js";
let imgPath = "http://127.0.0.1:3000";
export default {
  components: {
    UploadImage,
  },
  props: {
    userFlag: Boolean,
  },

  setup(props, context) {
    let state = reactive({
      userData: {
        userName: "", // 用户名
        passWord: "", // 密码
        sex: "", // 性别
        imgUrl: "", // 头像
      },
      imgPath,
    });
    const store = useStore();
    const router = useRouter();
    // 用户id
    let { id } = { ...store.getters.userInfo };

    // 点击bg隐藏
    function clickHide() {
      context.emit("update:userFlag", false);
      state.userData = {
        userName: "", // 用户名
        passWord: "", // 密码
        sex: "", // 性别
        imgUrl: "", // 头像
      };
    }

    // 修改信息
    let submitUpdata = debounce(async () => {
      try {
        let data = state.userData;
        data.id = id;
        if (!data.passWord) {
          Message.error("密码不能为空");
          return;
        }
        let res = await updataUser(data);
        if (res && res.code != 200) return;
        Message.success(res.message);
        state.t = setTimeout(() => {
          context.emit("update:userFlag", false);
        }, 500);
      } catch (err) {
        console.log(err, "=====修改信息==错误==");
      }
    }, 500);

    // 上传图片
    function uploadCallBack(res) {
      state.userData.imgUrl = res;
    }

    // 退出登录
    function clickOutBut() {
      store.commit("user/REMOVE_TOKEN");
      store.commit("user/SET_USER_INFO", {});
      router.push("/login");
    }

    // 获取用户信息
    async function getUserInfo() {
      try {
        let data = {
          id,
        };
        let res = await userInfo(data);
        if (res && res.code != 200) return;
        state.userData = {
          userName: res.results.userName,
          passWord: res.results.passWord,
          sex: res.results.sex || "",
          imgUrl: res.results.imgUrl || "",
        };
      } catch (err) {
        console.log(err, "=====获取用户信息==错误==");
      }
    }

    watch(props, (n, o) => {
      if (n.userFlag) {
        getUserInfo();
      }
    });

    // onMounted(() => {
    //   getUserInfo();

    // });

    return {
      ...toRefs(state),
      clickHide,
      submitUpdata,
      uploadCallBack,
      clickOutBut,
    };
  },
};
</script>

<style lang="scss" scoped>
.user {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  .user-bg {
    position: absolute;
    width: 100%;
    height: 100%;
    background: transparent;
  }
}
.user-box {
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
  .form {
    margin-top: 20px;
  }
  .form-item {
    display: flex;
    margin-bottom: 26px;
    font-size: 14px;
    & > span {
      min-width: 70px;
    }
    .imgUrl {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    .input {
      padding: 6px;
      margin: 0;
      width: 100%;
      background: #fff;
      border: 1px solid transparent;
      outline: none;
    }
    .sex-box {
      display: flex;
    }
    .radio {
      margin-right: 16px;
      input[type="radio"] {
        position: absolute;
        opacity: 0;
        &:checked {
          & + .radio-label {
            &::after {
              background: #01e777;
            }
            &::before {
              border-color: #01e777;
            }
          }
        }
      }
      .radio-label {
        position: relative;
        padding-left: 26px;
        cursor: pointer;
        &::before {
          content: "";
          position: absolute;
          left: 0;
          top: 50%;
          width: 16px;
          height: 16px;
          background: #f4f4f4;
          border-radius: 100%;
          border: 1px solid #b4b4b4;
          transform: translateY(-50%);
          transition: all 0.25s ease;
        }
        &::after {
          content: "";
          position: absolute;
          left: 5px;
          top: 50%;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          transform: translateY(-50%);
          transition: all 0.25s ease;
        }
      }
    }
  }
  .updataBut {
    margin: 20px auto auto;
    padding: 8px 0px;
    width: 120px;
    background: #01e777;
    color: #fff;
    border-radius: 6px;
    border: 1px solid transparent;
    cursor: pointer;
    &:hover {
      background: #09ef7f;
    }
  }
  .outBut {
    margin: 20px auto auto;
    width: 120px;
    border: none;
    background: transparent;
    color: red;
    cursor: pointer;
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