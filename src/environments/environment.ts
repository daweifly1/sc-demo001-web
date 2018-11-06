/*****
 开发环境配置
 开发构建命令(以下命令等效)：
 ng build --target=development --environment=dev
 ng build --dev --e=dev
 ng build --dev
 ng build
 ****/

export const webServerUrl = 'http://192.168.1.157:4202/site';
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
  production: false,
  baseUrl: {
    ius: `${webServerUrl}/ius`,
    web: `${webServerUrl}/web`,
    bs: `${webServerUrl}/bs`,
    ps: `${webServerUrl}/ps`,
    ss: `${webServerUrl}/ss-cdw`
  },
  otherData: {
    sysRole: 0,
    sysSite: '0',
    fileUrl: `${webServerUrl}/fileService`,
    fileServiceUrl: `${webServerUrl}/img/`,    // 文件服务器
    defaultPath: '/main/workBoard'                  // 门户地址
  }
};
export const localDataKeyObj = {
  barcodePrinterKey: 'jx_copper_selected_barcode_printer',
  invoicePrinterKey: 'jx_copper_selected_invoice_printer',
  invoiceContactPrintDir: 'invoice_contact_print_Dir'
};
