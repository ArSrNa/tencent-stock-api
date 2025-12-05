import GetInfo, { GetStockInfo } from '../src/index'

(async () => {
    const res = await GetInfo(['sh000001', 'sz399001', 'sh688795', "hkHSI", 'hk00700'])
    console.log(res)
})()