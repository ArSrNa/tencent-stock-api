import { describe, expect, test } from "bun:test";
import GetInfo, { GetStockInfo, parseStockData } from "../src/index";


describe('批量获取股票数据', async () => {
    const res = await GetStockInfo(['sh000001', 'sz399001', "hkHSI"])
    test("上海证券交易所", async () => {
        expect(res).toInclude('v_sh000001=')
        expect(res).toInclude('上证指数')
    });
    test("深圳证券交易所", async () => {
        expect(res).toInclude('v_sz399001=')
        expect(res).toInclude('深证成指')
    });
    test("香港交易所", async () => {
        expect(res).toInclude('v_hkHSI=')
        expect(res).toInclude('恒生指数')
    });
})

describe('股票数据转换', async () => {
    describe('提取多股数据', async () => {
        const res = await GetInfo(['sh000001', 'sz399001', "hkHSI"])
        test('提取多股数据', () => expect(res).toHaveLength(3))
    })
    describe("大盘信息", async () => {
        const [res] = await GetInfo(['sh000001'])
        test('股票名称', () => expect(res.name).toBe('上证指数'))
        test('股票代码', () => expect(res.code).toBe('000001'))
        test('是真A股吗？（头晕目眩的不是）', () => expect(res.currentPrice).toBeLessThan(4800))
    });

    describe("摩尔线程sh688795个股信息", async () => {
        const res = await GetStockInfo(['sh688795'])
        const data = parseStockData(res);
        test('买盘五档行情', () => expect(data.buyOrders).toBeArray())
        test('卖盘五档行情', () => expect(data.sellOrders).toBeArray())
        test('当前价格', () => expect(data.currentPrice).toBeNumber())
        test('开盘价', () => expect(data.openPrice).toBeNumber())
        test('昨日收盘价', () => expect(data.preClose).toBeNumber())
        test('涨跌', () => expect(data.priceChange).toBeNumber())
        test('涨跌%', () => expect(data.priceChangePercent).toBeNumber())
    });

    describe('腾讯控股hk00700个股信息', async () => {
        const res = await GetStockInfo(['hk00700'])
        const data = parseStockData(res);
        test('买盘五档行情', () => expect(data.buyOrders).toHaveLength(5))
        test('卖盘五档行情', () => expect(data.sellOrders).toHaveLength(5))
        test('当前价格', () => expect(data.currentPrice).toBeNumber())
        test('开盘价', () => expect(data.openPrice).toBeNumber())
        test('昨日收盘价', () => expect(data.preClose).toBeNumber())
    })
})