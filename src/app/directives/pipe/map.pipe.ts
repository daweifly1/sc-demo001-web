import {Pipe, PipeTransform} from '@angular/core';
import {DatePipe} from '@angular/common';

@Pipe({
  name: 'map'
})
export class MapPipe implements PipeTransform {
  private datePipe: DatePipe = new DatePipe('en-US');
  private mapObj = {
    sex: {
      0: '女',
      1: '男'
    },
    lockedStatus: {
      0: '启用',
      1: '锁定'
    },
    businessType: {
      1: '生产商',
      2: '贸易商',
      3: '综合'
    },
    type: {
      1: '材设新闻',
      2: '采购文化',
      3: '政策法规',
      4: '图文欣赏',
      5: '公告',
      6: '废旧物资信息公示',
      7: '轮播图',
      8: '江铜采购指数',
      9: '公司动态',
      10: '招标公告',
      11: '中标公示',
      12: '优秀供应商',
      13: '帮助中心',
      14: '导航轮播图',
    },
    isPlan: {
      0: '否',
      1: '是'
    },
    state: {
      0: '未入库',
      1: '部分入库',
      2: '全部入库',
      3: '强制结单',
    },
    isSynsap: {
      0: '未同步',
      1: '同步'
    },
    entranceDevice: {
      0: '否',
      1: '是'
    },
    crucialDevice: {
      0: '否',
      1: '是'
    },
    invoiceState: {
      APPROVED: 'ERP已审批',
      APPROVEDPR: 'ERP业务批准',
      CANCEL: 'ERP已取消',
      CREATED: 'ERP已生成发票',
      NEW: 'ERP新建',
      PROCESSING: 'ERP审批中',
      RECREATE: 'ERP重新生成发票',
      REJECT: 'ERP已拒绝',
      SUBMIT: '已提交',
      SAVED: '保存',
      CHECKING: '审批中',
      PAID: '已做付款凭证',
      PREPAY: '已预付款核销'
    },
    erpSync: {
      0: '未同步',
      1: '同步中',
      2: '同步失败',
      3: '同步完成'
    },
    erpSyncOther: {
      0: '未同步',
      1: '已同步'
    },
    erpSyncOtherRes: {
      0: '同步失败',
      1: '同步成功'
    },
    // 出库状态
    stockOutStatus: {
      0: '未出库',
      1: '部分出库',
      2: '全部出库',
      3: '强制结单',
    },
    inventoryState: {
      0: '未盘点',
      1: '盘点启动',
      2: '盘点结束'
    },
    InOrOutType: {
      0: '入库类型',
      1: '出库类型',
    },
    InOutType: {
      1: '入库',
      2: '出库',
    },
    barcodeStatus: {
      0: '已打印',
      1: '全部入库',
      2: '已出库',
      3: '已拆分'
    },
    checkType: {
      0: '根据仓库',
      1: '根据保管员',
      2: '根据库区',
      3: '根据物料'
    },
    barcodeFlag: {
      0: '总条码',
      1: '分条码'
    },
    // 包装条码打印打印标志
    printState: {
      0: '未打印',
      1: '部分打印',
      2: '已打印',
    },
    // 包装条码打印操作标志
    packageCodeStatus: {
      0: '未完成',
      1: '部分完成',
      2: '已完成',
    },
    contractType: {
      1: '采购订单',
      2: '年度协议'
    },
    deliverGoodsType: {
      1: '采购订单发货',
      2: '年度协议发货'
    },
    stockInType: {
      1: '采购订单入库',
      2: '年度协议入库'
    },
    deliverGoodsStatus: {
      0: '待提交',
      1: '待发货',
      10: '已发货'
    },
    warehouseType: {
      0: '普通仓库',
      1: '协议仓库'
    },
    /*物料相关开始*/
    materialType: {
      0: '材料',
      1: '设备/备件'
    },
    materialType2: {
      1: '材料',
      2: '备件',
      3: '设备'
    },
    materialClassStatus: {
      'true': '失效',
      'false': '有效'
    },
    materialClassLevel: {
      '1': '一级',
      '2': '二级',
      '3': '三级'
    },
    unit: {
      '0': '吨',
      '1': '个',
      '2': '套'
    },
    auditStatus: {
      0: '待审核',
      1: '审核通过',
      2: '审核拒绝'
    },
    auditApproveStatus: {
      0: '待审批',
      1: '审批通过',
      2: '审批拒绝'
    },
    materialSettingStatus: {
      0: '正常',
      1: '冻结'
    },
    /*物料相关结束*/
    agreementFlag: {
      1: '采购订单',
      2: '年度协议'
    },
    inventoryType: {
      0: '待入库',
      1: '部分入库',
      2: '全部入库',
      3: '强制结单'
    },
    billType: {
      0: '发货单',
      1: '收货单'
    },
    documentState: {
      0: '暂存',
      1: '待收货',
      2: '部分验收',
      3: '全部验收',
      4: '部分入库',
      10: '全部入库',
      11: '强制结单'
    },
    // 是否条码管理
    barcodeManage: {
      0: '否',
      1: '是'
    },
    factoryMineStatus: {
      0: '正常',
      1: '冻结'
    },
    importOrDomestic: {
      0: '进口',
      1: '国产'
    },
    // 厂矿物资分类
    materialClassification: {
      0: '保险件',
      1: '一般件',
      2: '常耗件',
    },
    // erp过账
    erpFlag: {
      0: '未过账',
      1: '成功',
      2: '失败'
    },
    agreementType: {
      0: '代储代销',
      1: '单耗承包'
    },
    assemblyOrPart: {
      0: '总成',
      1: '部装'
    },
    shortDress: {
      0: '是',
      1: '否'
    },
    // 分工管理
    divideWorkId: {
      1: '风机',
      2: '空压机',
      3: '汞',
      4: '阀',
      5: '铲运机',
    },
    assigned: {
      0: '未分配',
      1: '已分配'
    },
    nameMatchStatus: {
      0: '未冻结',
      1: '已冻结'
    },
    billTypeShow: {
      'XGFR': '其它入库',
      'XGFC': '其它出库',
      'XGQR': '期初入库',
      'CK20': '领料出库',
      'CK': '领料出库',
      'RK': '入库单',
    },
    checkResultState: {
      0: '正常',
      1: '盘亏',
      2: '盘盈',
    },
    billStatus: {
      '1': '已提交',
      '2': '审核通过',
      '3': '审核拒绝'
    },
    inOutState: {
      0: '未完成',
      1: '部分完成',
      2: '已完成'
    },
    returnState: {
      1: '创建',
      2: '待出库',
      3: '部分出库',
      4: '全部出库',
      5: '强制结单'
    }
  };

  transform(value: any, arg?: any): any {
    if (arg === undefined) {
      return value;
    }
    let type: string = arg;
    let param = '';

    if (arg.indexOf(':') !== -1) {
      type = arg.substring(0, arg.indexOf(':'));
      param = arg.substring(arg.indexOf(':') + 1, arg.length);
    }

    switch (type) {
      case 'date':
        return this.datePipe.transform(value, param);
      default:
        return this.mapObj[type][value];
    }
  }

}
