<template>
  <transition-group class="message-list" name="list" tag="ul">
    <li
      :class="`message-item ${setClass(item.type)}`"
      v-for="(item, index) in messageList"
      :key="index"
    >
      {{ item.title }}
    </li>
  </transition-group>
</template>

<script >
import { reactive, toRefs } from "vue";
export default {
  props: {
    messageList: Array,
  },
  setup(props) {
    let state = reactive({
      messageList: props.messageList,
    });
    function setClass(type) {
      if (type === "info") {
        return "message-info-item";
      } else if (type === "wraning") {
        return "message-wraning-item";
      } else if (type === "success") {
        return "message-success-item";
      } else if (type === "error") {
        return "message-error-item";
      }
      return "";
    }
    return { ...toRefs(state), setClass };
  },
};
</script>

<style lang="scss" scoped>
.message-list {
  position: fixed;
  top: 24px;
  right: 24px;
  z-index: 1000;
  margin-bottom: 0;
  text-align: right;
  .message-item {
    padding: 8px;
    border: 1px solid #b3d0cf;
    margin-left: 8px;
    margin-bottom: 12px;
    background-color: #e6f3ff;
    font-size: 14px;
    text-align: left;
    border-radius: 4px;
    border: 1px solid transparent;
  }
  .message-info-item {
    background-color: #edf2fc;
    border-color: #ebeef5;
    color: #909399;
  }
  .message-error-item {
    background-color: #fef0f0;
    border-color: #fde2e2;
    color: #f56c6c;
  }
  .message-success-item {
    background-color: #f0f9eb;
    border-color: #e1f3d8;
    color: #67c23a;
  }
  .message-wraning-item {
    background-color: #fdf6ec;
    border-color: #faecd8;
    color: #e6a23c;
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 1s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>