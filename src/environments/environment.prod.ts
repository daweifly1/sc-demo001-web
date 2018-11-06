/*****
 生产环境配置
 生产环境构建命令(以下命令等效)：
 ng build --target=production --environment=prod
 ng build --prod --env=prod
 ng build --prod
 ****/

// export const webServerUrl = 'http://10.99.102.208:8087';     // 生产
// export const webServerUrl = 'http://192.168.1.196:8087';
 export const webServerUrl = 'http://192.168.2.103:5055';
export const gatewayKey = {
  Ius: 'ius',
  /**
   * 资讯配置
   */
  Web: 'web',
  /**
   * 基础服务
   */
  Bs: 'bs',
  /**
   * 仓储
   */
  Ss: 'ss',
  /**
   * 采购
   * */
  Ps: 'ps'
};

export const environment = {
  production: true,
  baseUrl: {
    ius: `${webServerUrl}/ius`,
    web: `${webServerUrl}/web`,
    bs: `${webServerUrl}/bs`,
    ps: `${webServerUrl}/ps`,
    ss: `${webServerUrl}/ss`
  },
  otherData: {
    sysRole: 0,
    sysSite: '0',
    fileUrl: webServerUrl,
    fileServiceUrl: `${webServerUrl}/img/`,    // 文件服务器
    defaultPath: '/web/index'                  // 门户地址
  }
};
export const localDataKeyObj = {
  barcodePrinterKey: 'jx_copper_selected_barcode_printer',
  invoicePrinterKey: 'jx_copper_selected_invoice_printer',
  invoiceContactPrintDir: 'invoice_contact_print_Dir'
};
