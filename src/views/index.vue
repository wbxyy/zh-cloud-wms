<template>
  <div class="app-container home">
    <div>
      <el-row :gutter="10">
        <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="80px">

          <el-row>
            <el-col v-for="(item,key) in formData.color" :key="key" :span="8" :xl="4" :lg="8" :md="12" :sm="12" :xs="24">
              <el-form-item :label="item.name" prop="field102" required>
                <div class="color_pallet">
                  <el-slider v-model="item.bright" :min="1" :max="100" :step="1" class="color_bar" @input="changePrimaryColorBright" />
                  <div class="color_spot" :style="{backgroundColor:`hsl(${item.hue},${item.sat}%,${item.bright}%)`}" />
                </div>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="默认" prop="field108">
                <el-button size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="主要" prop="field109">
                <el-button type="primary" size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="成功" prop="field110">
                <el-button type="success" size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="消息" prop="field111">
                <el-button type="info" size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="警告" prop="field112">
                <el-button type="warning" size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="危险" prop="field113">
                <el-button type="danger" size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="默认" prop="field108">
                <el-button size="medium" plain> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="主要" prop="field109">
                <el-button type="primary" plain size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="成功" prop="field110">
                <el-button type="success" plain size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="消息" prop="field111">
                <el-button type="info" plain size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="警告" prop="field112">
                <el-button type="warning" plain size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="危险" prop="field113">
                <el-button type="danger" plain size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="默认" prop="field108">
                <el-button size="medium" round> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="主要" prop="field109">
                <el-button type="primary" round size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="成功" prop="field110">
                <el-button type="success" round size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="消息" prop="field111">
                <el-button type="info" round size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="警告" prop="field112">
                <el-button type="warning" round size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="危险" prop="field113">
                <el-button type="danger" round size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="默认" prop="field108">
                <el-button size="medium" icon="el-icon-search" circle />
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="主要" prop="field109">
                <el-button type="primary" circle size="medium" icon="el-icon-edit" />
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="成功" prop="field110">
                <el-button type="success" circle size="medium" icon="el-icon-check" />
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="消息" prop="field111">
                <el-button type="info" circle size="medium" icon="el-icon-message" />
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="警告" prop="field112">
                <el-button type="warning" circle size="medium" icon="el-icon-star-off" />
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="危险" prop="field113">
                <el-button type="danger" circle size="medium" icon="el-icon-star-off" />
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="按钮" prop="field114">
                <el-button type="primary"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="按钮" prop="field115">
                <el-button type="primary" size="medium"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="按钮" prop="field116">
                <el-button type="primary" size="small"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item label="按钮" prop="field117">
                <el-button type="primary" size="mini"> 主要按钮 </el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button type="primary" class="blue-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button type="primary" class="light-blue-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button type="primary" class="red-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button type="primary" class="pink-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button type="primary" class="green-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button type="primary" class="tiffany-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button type="primary" class="yellow-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button type="success" class="blue-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button type="success" class="light-blue-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button type="success" class="red-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button type="success" class="pink-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button type="success" class="green-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button type="success" class="tiffany-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button type="success" class="yellow-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button class="blue-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button class="light-blue-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button class="red-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button class="pink-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button class="green-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button class="tiffany-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
            <el-col :span="4" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button class="yellow-btn">pan-btn</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="10" :xl="2" :lg="3" :md="4" :sm="5" :xs="6">
              <el-form-item>
                <el-button type="primary" @click="drawer = true">点我打开抽屉</el-button>

              </el-form-item>
              <el-drawer
                title="我是标题"
                :visible.sync="drawer"
                direction="rtl"
              >
                <span>我来啦!</span>
              </el-drawer>
            </el-col>
          </el-row>

          <el-row>
            <el-col :span="6">
              <el-popover trigger="click" content="气泡" disabled>
                <span>利用分发取代content信息</span>
                <el-button slot="reference">点击气泡</el-button>
              </el-popover>
            </el-col>
            <el-col :span="6">
              <el-popover trigger="hover" content="气泡">
                <span>利用分发取代content信息</span>
                <span>利用分发取代content信息</span>
                <el-button slot="reference">悬停气泡</el-button>
              </el-popover>
            </el-col>
            <el-col :span="6">
              <el-popover trigger="focus" content="气泡">
                <span>利用分发取代content信息</span>
                <el-button slot="reference">焦点气泡</el-button>
              </el-popover>
            </el-col>
            <el-col :span="6">
              <el-popover v-model="popoverShow" trigger="manual" content="气泡">
                <span>利用分发取代content信息</span>
                <el-button slot="reference" @click="popoverShow=!popoverShow">手动激活</el-button>
              </el-popover>
            </el-col>
            <el-col :span="6">
              {{ Boolean(err.sugar) }}
              {{ err.sugar }}
              <el-popover :value="Boolean(err.sugar)" trigger="manual" content="气泡">
                <el-button slot="reference" @click="$set(err,'sugar','不会')">手动激活</el-button>
              </el-popover>
              <span>{{ err['sugar'] }}</span>
            </el-col>

          </el-row>

          <el-row>
            <el-col :span="10">
              <el-form-item label="单行文本" prop="field120">
                <el-input v-model="formData.field120" type="hidden" placeholder="请输入单行文本" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="单行文本" prop="field121">
                <el-input v-model="formData.field121" placeholder="请输入单行文本" clearable :style="{width: '100%'}" />
              </el-form-item>
            </el-col>
            <el-col :span="10">
              <el-form-item label="密码" prop="field122">
                <el-input
                  v-model="formData.field122"
                  placeholder="请输入密码"
                  clearable
                  show-password
                  :style="{width: '100%'}"
                />
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item size="large">
                <el-button type="primary" @click="submitForm">提交</el-button>
                <el-button @click="resetForm">重置</el-button>
              </el-form-item>
            </el-col>
          </el-row>

          <el-row>
            <el-col>
              <el-select v-model="student" value-key="id">
                <el-option v-for="(item,index) in students" :key="item.id" :label="item.name" :value="item" />
              </el-select>
            </el-col>
          </el-row>

        </el-form>
      </el-row>
    </div>
  </div>
</template>

<script>
// 来首页玩一下mappingField
import { categoryDropdown } from '@api/wms/category'
categoryDropdown().then(res => {
  console.log(res)
})
export default {
  name: 'Index',
  data() {
    return {
      student: {},
      students: [
        {
          id: 123,
          name: '小苏苏'
        },
        {
          id: 124,
          name: '小毅毅'
        },
        {
          id: 125,
          name: '小涛涛'
        }
      ],
      // 版本号
      popoverShow: false,
      err: {
      },
      version: '3.5.0',
      drawer: false,
      formData: {
        color: {
          primary: {
            name: '主色',
            hue: 211,
            sat: 98,
            bright: 84
          },
          second: {
            name: '搭配色',
            hue: 233,
            sat: 90,
            bright: 89
          },
          third: {
            name: '点缀色',
            hue: 218,
            sat: 80,
            bright: 92
          },
          round: {
            name: '环绕色',
            hue: 266,
            sat: 49,
            bright: 85
          },
          item: {
            name: '物件色',
            hue: 267,
            sat: 32,
            bright: 59
          },
          rest: {
            name: '备用色',
            hue: 268,
            sat: 46,
            bright: 92
          }
        },
        primaryColor: '',
        primaryColorHue: 211,
        primaryColorSat: 98,
        primaryColorBright: 84,
        secondColor: '',
        secondColorHue: 211,
        secondColorSat: 98,
        secondColorBright: 84,
        thirdColor: '',
        thirdColorGray: 0,
        itemColor: '',
        itemColorGray: 0,
        roundColor: '',
        roundColorGray: 0,
        restColor: '',
        restColorGray: 0,
        field102: 0,
        field103: 0,
        field104: 0,
        field105: 0,
        field106: 0,
        field107: 0,
        field108: undefined,
        field109: undefined,
        field110: undefined,
        field111: undefined,
        field112: undefined,
        field113: undefined,
        field114: undefined,
        field115: undefined,
        field116: undefined,
        field117: undefined,
        field118: undefined,
        field119: undefined,
        field120: undefined,
        field121: undefined,
        field122: undefined
      },
      rules: {
        field120: [{
          required: true,
          message: '请输入单行文本',
          trigger: 'blur'
        }],
        field121: [{
          required: true,
          message: '请输入单行文本',
          trigger: 'blur'
        }],
        field122: [{
          required: true,
          message: '请输入密码',
          trigger: 'blur'
        }]
      }
    }
  },
  methods: {
    goTarget(href) {
      window.open(href, '_blank')
    },
    submitForm() {
      this.$refs['elForm'].validate(valid => {
        if (!valid) return
        // TODO 提交表单
      })
    },
    resetForm() {
      this.$refs['elForm'].resetFields()
    },
    changePrimaryColorBright(val) {
      this.primaryColorBright = val
    }
  }
}
</script>

<style scoped lang="scss">
.home {

}

.home .color_pallet{
  display: flex;

  .color_bar{
    flex-grow:1;
  }

  .color_spot{
    width: 40px;
    height: 40px;
    background-color: tomato;
    border-radius:50%;
    margin-left: 10px;
  }

}

</style>
