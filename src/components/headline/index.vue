<template>
  <div>
    <div
      v-if="type === 'subTitle'"
      class="head-line-sub"
      :style="{'height':subLineText}">
      <div class="title font">
        <span class="flag" v-show="flagShow"></span>
        <span class="title-text" :style="{'marginLeft': flagShow ? '13px':'0'}">{{title}}</span>
        <!--title右边的说明-->
        <div class="sub-right-text">
          <slot name="sub-right"></slot>
        </div>
        <!--title下面的说明-->
        <div class="sub-bottom-text">
          <slot name="sub-bottom"></slot>
        </div>
      </div>
      <!--right的html-->
      <div class="right-content" :style="{'right':right}">
        <slot name="right-content"></slot>
      </div>
    </div>
    <!--大标题-->
    <div class="headline" :style="{'height':subLine}" v-if="type === 'headline'">
      <div class="title font">
        <!-- <el-page-header content="详情页面" style=" display: inline-block;"></el-page-header>-->
        <!--   <span>{{title}}</span>-->
        <!--title右边的说明-->
        <div class="title-box">
          <!--<span class="header-icon" v-show="titleIconShow" @click="goBack(urlParams)">
            <span class="icon-sty"><i class="el-icon-back"></i></span>
            <span class="icon-text">返回</span>
          </span>
          <el-divider direction="vertical" v-if="titleIconShow"></el-divider>-->
          <span class="title-text">{{title}}</span>
        </div>

        <div class="sub-right-text">
          <slot name="sub-right"></slot>
        </div>
        <!--title下面的说明-->
        <div class="sub-bottom-text">
          <slot name="sub-bottom"></slot>
        </div>
      </div>
      <!--right的html-->
      <div class="right-content">
        <slot name="right-content"></slot>
      </div>
    </div>
    <el-divider></el-divider>
  </div>

</template>

<script>
  export default {
    components: {},
    props: {
      // 返回按钮是否显示
      titleIconShow: {
        type: Boolean,
        default: false
      },
      // 返回时可以自定义参数，例如 String   ?a=b&c=d
      urlParams: {
        type: String,
        default: ''
      },
      // 显示小标题subTitle 大标题 headline
      type: {
        type: String,
        default: 'subTitle'
      },
      // 当right没有时 height-line 只有60 默认是76
      subLine: {
        type: [String, Number],
        default: '76px'
      },
      // 当right没有时 height-line  默认是18
      subLineText: {
        type: [String, Number],
        default: '18px'
      },
      title: {
        type: String,
        default: ''
      },
      flagShow: {
        type: Boolean,
        default: true
      },
      // slot 最右边 跟右边的距离
      right: {
        type: [String, Number],
        default: '0'
      }
    },
    data () {
      return {
        breadcrumbSpecial: []
      }
    },
    created () {
    },
    mounted () {
      this.$nextTick(() => {

      })
    },
    computed: {},
    watch: {
      $route: {
        handler (val) {
          this.breadcrumbSpecial = val.meta.breadcrumbArr
        },
        deep: true,
        immediate: true
      }
    },
    methods: {
      goBack (params = '') {
        let breadcrumbSpecial = this.breadcrumbSpecial
        if (breadcrumbSpecial && breadcrumbSpecial.length > 1) {
          let path = String(breadcrumbSpecial[0].path) + params
          this.$router.push({path})
        }
      }
    },
  }
</script>

<style scoped lang="scss" type="text/scss" rel="stylesheet/scss">
  @import "@/assets/css/base/basicStyle.scss";
  .ext-sub-title-ant { /*88888888*/
    .title-box {
      box-sizing: border-box;
      width: 100%;
      height: 100%;
      display: inline-block;
      margin-top: 0;
      border-bottom: none;
      position: relative;
      .arr {
        display: inline-block;
        width: 6px;
        height: 18px;
        background: #00A2FF;
        border-radius: 3px;
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        -moz-transform: translate(0, -50%);
        -o-transform: translate(0, -50%);
      }
      .title {
        color: rgba(0, 0, 0, 0.85);
        font-size: 16px;
        font-weight: bold;
        position: absolute;
        top: 50%;
        left: 12px;
        transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        -moz-transform: translate(0, -50%);
        -o-transform: translate(0, -50%);
      }
      .status {
        /* display: inline-block;
         margin-left: 20px;*/
        position: absolute;
        top: 50%;
        transform: translate(0, -50%);
        -ms-transform: translate(0, -50%);
        -moz-transform: translate(0, -50%);
        -webkit-transform: translate(0, -50%);
        -o-transform: translate(0, -50%);
        left: 120px;
      }

      .link {
        font-size: 14px;
        float: right;
        // margin-top: -1px;
        a {
          display: inline-block;
          box-sizing: border-box;
          height: 36px;
          padding: 0 15px;
          border-radius: 2px;
          text-align: center;
          line-height: 36px;
          border: 1px solid #00A2FF;
          font-size: 14px;
        }
        .primary {
          color: #ffffff;
          background: #00A2FF;
        }
        .default {
          color: #00A2FF;
          background: #fff;
        }
      }
      .link:after {
        content: "";
        height: 0;
        line-height: 0;
        display: block;
        visibility: hidden;
        clear: both
      }
    }
  }

  .head-line-sub {
    position: relative;
    box-sizing: border-box;
    background: #ffffff;
    width: 100%;
    height: 18px;
    margin-top: 0;
   // margin-bottom: 20px;
    .title {
      @include Absolute(50%, 0, 0, -50%);
      font-size: 0;
      vertical-align: middle;
      .flag {
        display: inline-block;
        width: 6px;
        height: 18px;
        background: $color-subject;
        border-radius: 3px;
        @include Absolute(50%, 0, 0, -50%);
      }
      .title-text {
        @include verticalAlign;
        //    margin-left: 13px;
      }
      .sub-right-text {
        @include verticalAlign;
        margin-left: 10px;
      }
      .sub-bottom-text {
        @include verticalAlign;
        font-size: 12px;
        color: rgba(0, 0, 0, .45);
        font-weight: normal;
      }
    }
    .right-content {
      @include Absolute(50%, 20px, 0, -50%, right);
      box-sizing: border-box;
    }
    .font {
      font-size: 16px;
      color: rgba(0, 0, 0, 0.85);
      font-weight: 700;
    }
  }

  .headline {
    position: relative;
    box-sizing: border-box;
    background: #ffffff;
    width: 100%;
    height: 76px;
    margin-top: 0;
    border-bottom: 1px solid $color-divider;
    .title {
      @include Absolute(50%, 20px, 0, -50%);
      @include verticalAlign;
      font-size: $font-size-0;
      .title-box {
        @include verticalAlign;
        .header-icon {
          cursor: pointer;
          @include verticalAlign(top);
          .icon-sty {
            font-size: 16px;
            margin-right: 6px;
          }
          .icon-text {
            font-size: 16px;
            font-weight: 500;
          }
        }
      }
      .sub-right-text {
        @include verticalAlign;
        margin-left: 10px;
      }
      .sub-bottom-text {
        @include title(12px, normal, rgba(0, 0, 0, .45))
      }
    }
    .font {
      @include title
    }
    .right-content {
      @include Absolute(50%, 20px, 0, -50%, right);
      box-sizing: border-box;
    }
    .sub-line {
      height: 60px !important;
    }
  }

</style>
