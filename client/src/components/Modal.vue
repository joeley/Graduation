<template>
  <transition name="slide">
    <div class="modal" v-show="showModal">  
      <div class="mask"></div>
      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="icon-close" @click="$emit('closeModal')"></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>

        <div class="modal-footer">
          <a href="javascript:;" class="btn" v-if="btnType ==1 " @click="$emit('modalSubmit')">确定</a>
          <a href="javascript:;" class="btn btn-default" v-if="btnType == 2" @click="$emit('cancelModalSubmit')">取消</a>
          <div class="btn-group" v-if="btnType ==3">
            <a href="javascript:;" class="btn" @click="$emit('modalSubmit')">{{sureText}}</a>
            <a href="javascript:;" class="btn btn-default" @click="$emit('cancelModalSubmit')">{{cancelText}}</a>
          </div>
          
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "modal",
  props: {
    // 弹框类型：小small 中middl 大large 表单form
    modalType: {
      type: String,
      default: "form",
    },
    title: String,
    // 按钮类型：1确定按钮 2取消按钮 3确定取消
    btnType: String,
    sureText: {
      type: String,
      default: "确定",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    showModal: Boolean,
    // modalSubmit:{
      
    // }
  }

};
</script>
<style lang="scss" coped>
@import "../assets/scss/config.scss";
@import "../assets/scss/btn.scss";

@mixin position($pos: absolute, $top: 0, $left: 0, $w: 100%, $h: 100%) {
  position: $pos;
  top: $top;
  left: $left;
  width: $w;
  height: $h;
}

.modal {
  @include position(fixed);
  z-index: 11;
  .mask {
    @include position(fixed);
    opacity: 0.5;
    background-color: $colorI;
  }
  .modal-dialog {
    @include position(absolute, 40%, 50%, 660px, auto);
    background-color: $colorG;
    transform: translate(-50%, -50%);
    .modal-header {
      height: 60px;
      background-color: $colorJ;
      padding: 0 25px;
      line-height: 60px;
      font-size: $fontI;
      .icon-close {
        position: absolute;
        top: 23px;
        right: 25px;
        width: 14px;
        height: 14px;
        background: url("/imgs/icon-close.png") no-repeat center;
        background-size: contain;
        transition: transform 0.2s;
        &:hover {
          transform: scale(1.3);
        }
      }
    }
    .modal-body {
      padding: 42px 40px 54px;
      font-size: 14px;
    }
    .modal-footer {
      height: 82px;
      line-height: 82px;
      text-align: center;
      background-color: $colorJ;
    }
  }

  &.slide-enter-active,&.slide-leave-active{
    transition: all .3s;
  }
  &.slide-enter,&.slide-leave-to{
    top:-100%;
  }
  &.slide-enter-to,&.slide-leave{
    top:0;
  }
}

</style>
