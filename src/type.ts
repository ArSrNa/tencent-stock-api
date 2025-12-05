/**
 * 买卖盘单条数据接口（买1-买5/卖1-卖5）
 */
export interface Order {
    /**价格 */
    price: number;
    /**量/手 */
    volume: number;
}

/**
 * 价格/成交量/成交额信息接口
 */
interface TradeInfo {
    /**价格 */
    price: number;
    /**成交量（手） */
    volume: number;
    /**成交额 */
    amount: number;
}

/**
 * 结构化股票数据接口
 */
export interface StockData {
    /** 名字 */
    name: string;
    /** 代码 */
    code: string;
    /** 当前价格 */
    currentPrice: number;
    /** 昨收 */
    preClose: number;
    /** 今开 */
    openPrice: number;
    /** 成交量（手） */
    volume: number;
    /** 外盘 */
    outerVolume: number;
    /** 内盘 */
    innerVolume: number;
    /** 买1-买5 */
    buyOrders: Order[];
    /** 卖1-卖5 */
    sellOrders: Order[];
    /** 最近逐笔成交 */
    lastTrade: number;
    /** 时间 */
    time: string;
    /** 涨跌 */
    priceChange: number;
    /** 32: 涨跌% */
    priceChangePercent: number;
    /** 最高 */
    highest: number;
    /** 最低 */
    lowest: number;
    /** 价格/成交量（手）/成交额 */
    tradeInfo: TradeInfo;
    /** 成交量（手） */
    volume2: number;
    /** 成交额（万） */
    turnover: number;
    /** 换手率 */
    turnoverRate: number;
    /** 市盈率 */
    pe: number;
    /** 最高 */
    highest2: number;
    /** 最低 */
    lowest2: number;
    /** 振幅 */
    amplitude: number;
    /** 流通市值 */
    circulateMarketValue: number;
    /** 总市值 */
    totalMarketValue: number;
    /** 市净率 */
    pb: number;
    /** 涨停价 */
    limitUpPrice: number;
    /** 跌停价 */
    limitDownPrice: number;
}
