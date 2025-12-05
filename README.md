# 腾讯财经API

声明：**仅作为实验和学习研究用途，不提供投资建议。市场有风险，投资需谨慎！数据并非实时数据，数据来源于腾讯财经，请勿用于任何商业用途！**

# 安装

```
# npm
npm i tencent-stock-api

# yarn
yarn add tencent-stock-api

# pnpm
pnpm add tencent-stock-api

# bun
bun add tencent-stock-api
```

# 使用

## 批量获取股票数据
```js
import { getStockInfo } from 'tencent-stock-api';
GetStockInfo(['sh000001', 'sz399001', "hkHSI"]).then(console.log);

// v_sh000001="1~上证指数~000001~3902.81~3875.79~3873.12~500368768~0~0~0.00~0~0.00~0~0.00~0~0.00~0~0.00~0~0.00~0~0.00~0~0.00~0~0.00~0~0.00~0~~20251205155912~27.02~0.70~3907.78~3863.31~3902.81/500368768/716742448877~500368768~71674245~1.05~16.66~~3907.78~3863.31~1.15~593830.02~633910.23~0.00~-1~-1~1.05~0~3882.07~~~~~~71674244.8877~0.0000~0~ ~ZS~16.44~0.37~~~~4034.08~3040.69~1.77~-2.37~3.64~4753941296203~~-5.40~16.20~4753941296203~~~15.85~0.00~~CNY~0~~0.00~0"; v_sz309001="........; v_hkHSI="........";
```

## 获取股票数据
```js
import { getStockInfo } from 'tencent-stock-api';
GetStockInfo('sh000001').then(console.log);
```

返回结果（可参考`type.ts`）

```js
[
  {
    name: "上证指数",
    code: "000001",
    currentPrice: 3902.81,
    preClose: 3875.79,
    openPrice: 3873.12,
    volume: 500368768,
    outerVolume: 0,
    innerVolume: 0,
    buyOrders: [
      // ...
    ],
    sellOrders: [
      // ...
    ],
    lastTrade: 0,
    time: "20251205155912",
    priceChange: 27.02,
    priceChangePercent: 0.7,
    highest: 3907.78,
    lowest: 3863.31,
    tradeInfo: {
      price: 3902.81,
      volume: 500368768,
      amount: 716742448877,
    },
    volume2: 500368768,
    turnover: 71674245,
    turnoverRate: 1.05,
    pe: 16.66,
    highest2: 3907.78,
    lowest2: 3863.31,
    amplitude: 1.15,
    circulateMarketValue: 593830.02,
    totalMarketValue: 633910.23,
    pb: 0,
    limitUpPrice: -1,
    limitDownPrice: -1,
  }, {
    name: "深证成指",
    code: "399001",
    // ......
  }, {
    name: "N摩尔-U",
    code: "688795",
    // ......
  }, {
    name: "腾讯控股",
    code: "00700",
    // ...
  }
]
```