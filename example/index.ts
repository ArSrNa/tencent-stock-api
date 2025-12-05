import GetInfo, { GetStockInfo } from '../src/index'

(async () => {
    const res = await GetInfo(['sh000001', 'sz399001'])
    console.log(res)
})()