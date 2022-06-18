<template>
  <div class="app-container">
    <el-form v-show="showSearch" ref="queryForm" :model="queryParams" size="small" :inline="true" label-width="68px">
      <el-form-item label="全称" prop="allname">
        <el-input
          v-model="queryParams.allname"
          placeholder="请输入全称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="简称" prop="abbreviation">
        <el-input
          v-model="queryParams.abbreviation"
          placeholder="请输入简称"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="编号" prop="shopnum">
        <el-input
          v-model="queryParams.shopnum"
          placeholder="请输入编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['zhcloud:shop:add']"
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['zhcloud:shop:edit']"
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['zhcloud:shop:remove']"
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          v-hasPermi="['zhcloud:shop:export']"
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
        >导出</el-button>
      </el-col>
      <right-toolbar :show-search.sync="showSearch" @queryTable="getList" />
    </el-row>

    <el-table v-loading="loading" :data="shopList" @selection-change="handleSelectionChange">
      <af-table-column type="selection" width="55" align="center" />
      <af-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.enterprise_member_status" :value="scope.row.status" />
        </template>
      </af-table-column>
      <af-table-column label="全称" align="center" prop="allname" />
      <af-table-column label="开户银行名" align="center" prop="allbankname" />
      <af-table-column label="银行账户" align="center" prop="allbankaccount" />
      <af-table-column label="省" align="center" prop="alladdr1">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zh_province" :value="scope.row.alladdr1" />
        </template>
      </af-table-column>
      <af-table-column label="市" align="center" prop="alladdr2">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zh_city" :value="scope.row.alladdr2" />
        </template>
      </af-table-column>
      <af-table-column label="区" align="center" prop="alladdr3">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.zh_area" :value="scope.row.alladdr3" />
        </template>
      </af-table-column>
      <af-table-column label="详细地址" align="center" prop="alladdrfull" />
      <af-table-column label="联系电话" align="center" prop="allphone1" />
      <af-table-column label="税号" align="center" prop="qtaxnum" />
      <af-table-column label="证照编号" align="center" prop="qcertnum" />
      <af-table-column label="公司类型" align="center" prop="qcomptype" />
      <af-table-column label="注册资本" align="center" prop="qcapital" />
      <af-table-column label="注册资本币种" align="center" prop="qcapitalbz">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.capital_currency" :value="scope.row.qcapitalbz" />
        </template>
      </af-table-column>
      <af-table-column label="公司法人" align="center" prop="qlegalperson" />
      <af-table-column label="证件类型" align="center" prop="q3is1">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.document_type" :value="scope.row.q3is1" />
        </template>
      </af-table-column>
      <af-table-column label="Logo" align="center" prop="alllogo" />
      <af-table-column label="税务登记证" align="center" prop="qtaxi" />
      <af-table-column label="组织机构代码证" align="center" prop="qorgi" />
      <af-table-column label="简称" align="center" prop="abbreviation" />
      <af-table-column label="编号" align="center" prop="shopnum" />
      <af-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            v-hasPermi="['zhcloud:shop:edit']"
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
          >修改</el-button>
          <el-button
            v-hasPermi="['zhcloud:shop:remove']"
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
          >删除</el-button>
        </template>
      </af-table-column>
    </el-table>

    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改企业会员对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择状态">
            <el-option
              v-for="dict in dict.type.enterprise_member_status"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="全称" prop="allname">
          <el-input v-model="form.allname" placeholder="请输入全称" />
        </el-form-item>
        <el-form-item label="法人身份证/个人身份证" prop="allidcard">
          <el-input v-model="form.allidcard" placeholder="请输入法人身份证/个人身份证" />
        </el-form-item>
        <el-form-item label="${comment}" prop="allbankaddr1">
          <el-input v-model="form.allbankaddr1" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="allbankaddr2">
          <el-input v-model="form.allbankaddr2" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="开户银行名" prop="allbankname">
          <el-input v-model="form.allbankname" placeholder="请输入开户银行名" />
        </el-form-item>
        <el-form-item label="银行账户" prop="allbankaccount">
          <el-input v-model="form.allbankaccount" placeholder="请输入银行账户" />
        </el-form-item>
        <el-form-item label="省" prop="alladdr1">
          <el-select v-model="form.alladdr1" placeholder="请选择省">
            <el-option
              v-for="dict in dict.type.zh_province"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="市" prop="alladdr2">
          <el-select v-model="form.alladdr2" placeholder="请选择市">
            <el-option
              v-for="dict in dict.type.zh_city"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="区" prop="alladdr3">
          <el-select v-model="form.alladdr3" placeholder="请选择区">
            <el-option
              v-for="dict in dict.type.zh_area"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="详细地址" prop="alladdrfull">
          <el-input v-model="form.alladdrfull" placeholder="请输入详细地址" />
        </el-form-item>
        <el-form-item label="联系电话" prop="allphone1">
          <el-input v-model="form.allphone1" placeholder="请输入联系电话" />
        </el-form-item>
        <el-form-item label="开票资料" prop="allinvoicei">
          <el-input v-model="form.allinvoicei" placeholder="请输入开票资料" />
        </el-form-item>
        <el-form-item label="手持身份证" prop="ghandidcardi">
          <el-input v-model="form.ghandidcardi" placeholder="请输入手持身份证" />
        </el-form-item>
        <el-form-item label="身份证正面" prop="gidcardi">
          <el-input v-model="form.gidcardi" placeholder="请输入身份证正面" />
        </el-form-item>
        <el-form-item label="身份证反面" prop="gidcardbacki">
          <el-input v-model="form.gidcardbacki" placeholder="请输入身份证反面" />
        </el-form-item>
        <el-form-item label="税号" prop="qtaxnum">
          <el-input v-model="form.qtaxnum" placeholder="请输入税号" />
        </el-form-item>
        <el-form-item label="证照编号" prop="qcertnum">
          <el-input v-model="form.qcertnum" placeholder="请输入证照编号" />
        </el-form-item>
        <el-form-item label="注册资本" prop="qcapital">
          <el-input v-model="form.qcapital" placeholder="请输入注册资本" />
        </el-form-item>
        <el-form-item label="注册资本币种" prop="qcapitalbz">
          <el-select v-model="form.qcapitalbz" placeholder="请选择注册资本币种">
            <el-option
              v-for="dict in dict.type.capital_currency"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="公司法人" prop="qlegalperson">
          <el-input v-model="form.qlegalperson" placeholder="请输入公司法人" />
        </el-form-item>
        <el-form-item label="营业执照" prop="qbusinesslicence">
          <el-input v-model="form.qbusinesslicence" placeholder="请输入营业执照" />
        </el-form-item>
        <el-form-item label="证件类型" prop="q3is1">
          <el-select v-model="form.q3is1" placeholder="请选择证件类型">
            <el-option
              v-for="dict in dict.type.document_type"
              :key="dict.value"
              :label="dict.label"
              :value="parseInt(dict.value)"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="Logo" prop="alllogo">
          <el-input v-model="form.alllogo" placeholder="请输入Logo" />
        </el-form-item>
        <el-form-item label="授权书" prop="qauthbook">
          <el-input v-model="form.qauthbook" placeholder="请输入授权书" />
        </el-form-item>
        <el-form-item label="开户行图片" prop="qbanki">
          <el-input v-model="form.qbanki" placeholder="请输入开户行图片" />
        </el-form-item>
        <el-form-item label="税务登记证" prop="qtaxi">
          <el-input v-model="form.qtaxi" placeholder="请输入税务登记证" />
        </el-form-item>
        <el-form-item label="组织机构代码证" prop="qorgi">
          <el-input v-model="form.qorgi" placeholder="请输入组织机构代码证" />
        </el-form-item>
        <el-form-item label="-1未选择0个人1企业" prop="belong">
          <el-input v-model="form.belong" placeholder="请输入-1未选择0个人1企业" />
        </el-form-item>
        <el-form-item label="驳回说明" prop="reject">
          <el-input v-model="form.reject" placeholder="请输入驳回说明" />
        </el-form-item>
        <el-form-item label="${comment}" prop="shopname">
          <el-input v-model="form.shopname" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="店铺Logo" prop="shoplogo">
          <el-input v-model="form.shoplogo" placeholder="请输入店铺Logo" />
        </el-form-item>
        <el-form-item label="店铺联系人" prop="shopcontacts">
          <el-input v-model="form.shopcontacts" placeholder="请输入店铺联系人" />
        </el-form-item>
        <el-form-item label="店铺联系方式" prop="shopphone">
          <el-input v-model="form.shopphone" placeholder="请输入店铺联系方式" />
        </el-form-item>
        <el-form-item label="主营品种" prop="mainvarieties">
          <el-input v-model="form.mainvarieties" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="公司介绍" prop="companyintroduce">
          <el-input v-model="form.companyintroduce" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="最低出货量水平线" prop="line">
          <el-input v-model="form.line" placeholder="请输入最低出货量水平线" />
        </el-form-item>
        <el-form-item label="${comment}" prop="vxappid">
          <el-input v-model="form.vxappid" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="vxsecret">
          <el-input v-model="form.vxsecret" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="${comment}" prop="vxtoken">
          <el-input v-model="form.vxtoken" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="${comment}" prop="vxtokentime">
          <el-input v-model="form.vxtokentime" placeholder="请输入${comment}" />
        </el-form-item>
        <el-form-item label="仓储方是否查看用户" prop="wmsstop">
          <el-input v-model="form.wmsstop" type="textarea" placeholder="请输入内容" />
        </el-form-item>
        <el-form-item label="邮箱" prop="allemail">
          <el-input v-model="form.allemail" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="联系人" prop="allpeople">
          <el-input v-model="form.allpeople" placeholder="请输入联系人" />
        </el-form-item>
        <el-form-item label="简称" prop="abbreviation">
          <el-input v-model="form.abbreviation" placeholder="请输入简称" />
        </el-form-item>
        <el-form-item label="店铺关键词" prop="keyword">
          <el-input v-model="form.keyword" placeholder="请输入店铺关键词" />
        </el-form-item>
        <el-form-item label="编号" prop="shopnum">
          <el-input v-model="form.shopnum" placeholder="请输入编号" />
        </el-form-item>
        <el-form-item label="对账日期,与业务开始日期同月时对账单标记已打印" prop="dztime">
          <el-input v-model="form.dztime" placeholder="请输入对账日期,与业务开始日期同月时对账单标记已打印" />
        </el-form-item>
        <el-form-item label="出仓是否审核 0否 1是" prop="issh">
          <el-input v-model="form.issh" placeholder="请输入出仓是否审核 0否 1是" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listShop, getShop, delShop, addShop, updateShop } from '@/api/zh/cloud/shop'

export default {
  name: 'Shop',
  dicts: ['zh_province', 'zh_city', 'document_type', 'capital_currency', 'zh_area', 'enterprise_member_status'],
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      // 企业会员表格数据
      shopList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        allname: null,
        abbreviation: null,
        shopnum: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        status: [
          { required: true, message: '状态不能为空', trigger: 'change' }
        ],
        allname: [
          { required: true, message: '全称不能为空', trigger: 'blur' }
        ],
        allidcard: [
          { required: true, message: '法人身份证/个人身份证不能为空', trigger: 'blur' }
        ],
        allbankaddr1: [
          { required: true, message: '$comment不能为空', trigger: 'blur' }
        ],
        allbankaddr2: [
          { required: true, message: '$comment不能为空', trigger: 'blur' }
        ],
        allbankname: [
          { required: true, message: '开户银行名不能为空', trigger: 'blur' }
        ],
        allbankaccount: [
          { required: true, message: '银行账户不能为空', trigger: 'blur' }
        ],
        alladdr1: [
          { required: true, message: '省不能为空', trigger: 'change' }
        ],
        alladdr2: [
          { required: true, message: '市不能为空', trigger: 'change' }
        ],
        alladdr3: [
          { required: true, message: '区不能为空', trigger: 'change' }
        ],
        alladdrfull: [
          { required: true, message: '详细地址不能为空', trigger: 'blur' }
        ],
        allphone1: [
          { required: true, message: '联系电话不能为空', trigger: 'blur' }
        ],
        qtaxnum: [
          { required: true, message: '税号不能为空', trigger: 'blur' }
        ],
        qcapitalbz: [
          { required: true, message: '注册资本币种不能为空', trigger: 'change' }
        ],
        q3is1: [
          { required: true, message: '证件类型不能为空', trigger: 'change' }
        ],
        alllogo: [
          { required: true, message: 'Logo不能为空', trigger: 'blur' }
        ],
        belong: [
          { required: true, message: '-1未选择0个人1企业不能为空', trigger: 'blur' }
        ],
        shopname: [
          { required: true, message: '$comment不能为空', trigger: 'blur' }
        ],
        openstatus: [
          { required: true, message: '开店状态 0未开通 1已开通不能为空', trigger: 'blur' }
        ],
        shoplogo: [
          { required: true, message: '店铺Logo不能为空', trigger: 'blur' }
        ],
        shopcontacts: [
          { required: true, message: '店铺联系人不能为空', trigger: 'blur' }
        ],
        shopphone: [
          { required: true, message: '店铺联系方式不能为空', trigger: 'blur' }
        ],
        mainvarieties: [
          { required: true, message: '主营品种不能为空', trigger: 'blur' }
        ],
        companyintroduce: [
          { required: true, message: '公司介绍不能为空', trigger: 'blur' }
        ],
        isplat: [
          { required: true, message: '平台不能为空', trigger: 'blur' }
        ],
        isopcer: [
          { required: true, message: '开证公司不能为空', trigger: 'blur' }
        ],
        isagent: [
          { required: true, message: '国外代理不能为空', trigger: 'blur' }
        ],
        ishuodai: [
          { required: true, message: '货代公司不能为空', trigger: 'blur' }
        ],
        isstorage: [
          { required: true, message: '仓储公司不能为空', trigger: 'blur' }
        ],
        iscustom: [
          { required: true, message: '客户不能为空', trigger: 'blur' }
        ],
        isbusiness: [
          { required: true, message: '卖家不能为空', trigger: 'blur' }
        ],
        isbuyer: [
          { required: true, message: '买家不能为空', trigger: 'blur' }
        ],
        line: [
          { required: true, message: '最低出货量水平线不能为空', trigger: 'blur' }
        ],
        iswms: [
          { required: true, message: '旧wms不能为空', trigger: 'blur' }
        ],
        wmsstop: [
          { required: true, message: '仓储方是否查看用户不能为空', trigger: 'blur' }
        ],
        allemail: [
          { required: true, message: '邮箱不能为空', trigger: 'blur' }
        ],
        allpeople: [
          { required: true, message: '联系人不能为空', trigger: 'blur' }
        ],
        servicetype: [
          { required: true, message: '原业务类型不能为空', trigger: 'change' }
        ],
        isservicestatus: [
          { required: true, message: '是否待审核   0否   1待审核  2驳回     审核通过后字段[ServiceType]清空  同时该列状态变为0  驳回不清空不能为空', trigger: 'blur' }
        ],
        abbreviation: [
          { required: true, message: '简称不能为空', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询企业会员列表 */
    getList() {
      this.loading = true
      listShop(this.queryParams).then(response => {
        this.shopList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        status: null,
        allname: null,
        allidcard: null,
        allbankaddr1: null,
        allbankaddr2: null,
        allbankname: null,
        allbankaccount: null,
        alladdr1: null,
        alladdr2: null,
        alladdr3: null,
        alladdrfull: null,
        allphone1: null,
        allinvoicei: null,
        ghandidcardi: null,
        gidcardi: null,
        gidcardbacki: null,
        qtaxnum: null,
        qcertnum: null,
        qcomptype: null,
        qcapital: null,
        qcapitalbz: null,
        qlegalperson: null,
        qbusinesslicence: null,
        q3is1: null,
        alllogo: null,
        qauthbook: null,
        qbanki: null,
        qtaxi: null,
        qorgi: null,
        belong: null,
        reject: null,
        shopname: null,
        openstatus: '0',
        shoplogo: null,
        shopcontacts: null,
        shopphone: null,
        mainvarieties: null,
        companyintroduce: null,
        isplat: null,
        isopcer: null,
        isagent: null,
        ishuodai: null,
        isstorage: null,
        iscustom: null,
        isbusiness: null,
        isbuyer: null,
        line: null,
        vxappid: null,
        vxsecret: null,
        vxtoken: null,
        vxtokentime: null,
        iswms: null,
        wmsstop: null,
        allemail: null,
        allpeople: null,
        servicetype: null,
        isservicestatus: 0,
        abbreviation: null,
        keyword: null,
        shopnum: null,
        issell: null,
        dztime: null,
        issh: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加企业会员'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getShop(id).then(response => {
        this.form = response.data
        this.open = true
        this.title = '修改企业会员'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updateShop(this.form).then(response => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addShop(this.form).then(response => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal.confirm('是否确认删除企业会员编号为"' + ids + '"的数据项？').then(function() {
        return delShop(ids)
      }).then(() => {
        this.getList()
        this.$modal.msgSuccess('删除成功')
      }).catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('zhcloud/shop/export', {
        ...this.queryParams
      }, `shop_${new Date().getTime()}.xlsx`)
    }
  }
}
</script>
