let base_url;
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    // base_url = 'https://acc.aiztb.com/cinghoo/aiztb/'; //正式地址
    base_url = 'http://alpha.aiztb.com/cinghoo/aiztb/'; //测试地址
} else {
    // base_url = 'http://alpha.aiztb.com/cinghoo/aiztb/'; //正式地址
    base_url = 'https://acc.aiztb.com/cinghoo/aiztb/'; //正式地址

}
export { base_url }