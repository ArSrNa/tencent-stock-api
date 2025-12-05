import { StockData } from "./type";

const APIEP = 'https://qt.gtimg.cn'

/**
 * @description 获取股票信息（不转换）
 * @param stocks 股票代码数组
 * @example GetStockInfo(['sh600000','sh600001'])
 * @returns v_s_sh000001="1~上证指数~000001~3905.18~29.39~0.76~424321166~61120011~~634351.39~ZS";
 */
export async function GetStockInfo(stocks: string[]) {
    const stocksStr = stocks.join(',');
    const buffer = await fetch(APIEP + `/q=${stocksStr}`).then(res => res.arrayBuffer());
    //转换编码
    const decoder = new TextDecoder("gbk");
    const text = decoder.decode(buffer);
    return text;
}

export async function GetInfo(stocks: string[]) {
    const text = await GetStockInfo(stocks);
    // const info = text.split('\n').filter(Boolean);
    const regex = /"([^"]*)"/g;
    const results: string[] = [];
    let temp: RegExpExecArray | null;
    while ((temp = regex.exec(text)) !== null) {
        results.push(temp[1]); // 收集所有捕获的内容
    }
    console.log(results.map(parseStockData))
}


/**
 * 解析股票数据字符串
 * @param dataStr - 以~分隔的股票数据字符串
 * @returns 结构化的股票数据对象
 */
function parseStockData(dataStr: string) {
    const arr = dataStr.split('~');
    const [_, name, code] = arr
    /**买卖盘数据（买1-买5） */
    const buyOrders = [];
    /**买卖盘数据（卖1-卖5） */
    const sellOrders = [];
    // 买1-买5：索引9-18（买1价、买1量、买2价、买2量...买5价、买5量）
    for (let i = 0; i < 5; i++) {
        const priceIndex = 9 + i * 2;
        const volumeIndex = 10 + i * 2;
        buyOrders.push({
            price: Number(arr[priceIndex] || 0),
            volume: Number(arr[volumeIndex] || 0)
        });
    }
    // 卖1-卖5：索引19-28（卖1价、卖1量、卖2价、卖2量...卖5价、卖5量）
    for (let i = 0; i < 5; i++) {
        const priceIndex = 19 + i * 2;
        const volumeIndex = 20 + i * 2;
        sellOrders.push({
            price: Number(arr[priceIndex] || 0),
            volume: Number(arr[volumeIndex] || 0)
        });
    }

    /** 解析价格/成交量/成交额字段 */
    const priceVolumeAmount = (arr[35] || '').split('/');

    // 结构化数据对象
    const stockData: StockData = {
        name,
        code,
        currentPrice: Number(arr[3] || 0),
        preClose: Number(arr[4] || 0),
        openPrice: Number(arr[5] || 0),
        volume: Number(arr[6] || 0),
        outerVolume: Number(arr[7] || 0),
        innerVolume: Number(arr[8] || 0),
        buyOrders: buyOrders,                // 9-18: 买1-买5
        sellOrders: sellOrders,              // 19-28: 卖1-卖5
        lastTrade: arr[29],                  // 29: 最近逐笔成交
        time: arr[30],                       // 30: 时间
        priceChange: Number(arr[31] || 0), // 31: 涨跌
        priceChangePercent: Number(arr[32] || 0), // 32: 涨跌%
        highest: Number(arr[33] || 0),   // 33: 最高
        lowest: Number(arr[34] || 0),    // 34: 最低
        tradeInfo: {                         // 35: 价格/成交量（手）/成交额
            price: Number(priceVolumeAmount[0] || 0),
            volume: Number(priceVolumeAmount[1] || 0),
            amount: Number(priceVolumeAmount[2] || 0)
        },
        volume2: Number(arr[36] || 0),  // 36: 成交量（手）
        turnover: Number(arr[37] || 0),  // 37: 成交额（万）
        turnoverRate: Number(arr[38] || 0), // 38: 换手率
        pe: Number(arr[39] || 0),       // 39: 市盈率
        highest2: Number(arr[41] || 0),  // 41: 最高
        lowest2: Number(arr[42] || 0),   // 42: 最低
        amplitude: Number(arr[43] || 0), // 43: 振幅
        circulateMarketValue: Number(arr[44] || 0), // 44: 流通市值
        totalMarketValue: Number(arr[45] || 0), // 45: 总市值
        pb: Number(arr[46] || 0),        // 46: 市净率
        limitUpPrice: Number(arr[47] || 0), // 47: 涨停价
        limitDownPrice: Number(arr[48] || 0) // 48: 跌停价
    };

    return stockData;
}