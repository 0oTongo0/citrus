<template>
  <div class="file-box">
    <input
      type="file"
      multiple="false"
      name="imgfile"
      accept="image/*"
      @change="uploadFile"
      id="file"
      title=""
    />
    <label for="file" class="label-file" title="上传图片"></label>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import { useStore } from "vuex";
import { upload } from "@/api/upImg.js";

export default {
  setup(props, context) {
    const store = useStore();
    let { id } = { ...store.getters.userInfo };
    // 上传图片
    async function uploadFile(e) {
      let res = await upload({
        files: e.target.files, //选择文件数组
        fileMaxSize: props.fileMaxSize || 10, //图片最大数(默认10M)
        count: props.count || 1, //最多可以选择的图片张数(默认1)
        userId: id,
      });
      if (res.code != 200) return;
      console.log(res, "======上传图片======");
      context.emit("uploadCallBack", res.results);
    }
    return {
      uploadFile,
    };
  },
};
</script>

<style lang="scss" scoped>
.file-box {
  #file {
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
  .label-file {
    position: relative;
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    line-height: 40px;
    text-align: center;
    cursor: pointer;
    &:hover {
      border-color: #01e777;
    }
    &::before {
      content: "";
      position: absolute;
      width: 16px;
      left: 50%;
      top: 50%;
      height: 2px;
      background: #d9d9d9;
      transform: translate(-50%, -50%);
    }
    &::after {
      content: "";
      position: absolute;
      width: 2px;
      left: 50%;
      top: 50%;
      height: 16px;
      background: #d9d9d9;
      transform: translate(-50%, -50%);
    }
  }
}
</style>