// const API = require('indian-stock-exchange');
const express = require("express");
// const serverless = require("serverless-http");
const cors = require("cors");
const API = require("../index");
const axios = require("axios");

//comment
const PORT = process.env.PORT || 9000;

const BSEAPI = API.BSE;
const NSEAPI = API.NSE;

const app = express();
app.use(express.json());
app.use(cors());

const router = express.Router();

//comment
app.use("/", router);

router.get("/", (req, res) => {
  res.json({ message: "works" });
});

// National Stock Exchange (NSE) APIS

// Get the stock market status (open/closed) - JSON
// Example: http://localhost:3000/get_market_status

router.get("/nse/json", async (req, res) => {
  try {
    const response = await NSEAPI.getJson();
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/nse/test", async (req, res) => {
  try {
    const response = await axios.get(
      "https://www1.nseindia.com/live_market/dynaContent/live_analysis/gainers/niftyGainers1.json"
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/get_market_status", async (req, res) => {
  try {
    const response = await NSEAPI.getMarketStatus();
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get the NSE indexes information (last updated, name, previous close, open, low, high, last, percent change, year high and low, index order) - JSON
// Example: http://localhost:3000/nse/get_indices
router.get("/nse/get_indices", (req, res, next) => {
  NSEAPI.getIndices()
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get the quotes of all indexes in NSE - HTML
// Example: http://localhost:3000/nse/get_quotes
router.get("/nse/get_quotes", (req, res, next) => {
  NSEAPI.getQuotes()
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get the quotation data of the symbol (companyName) from NSE - JSON
// Example: http://localhost:3000/nse/get_quote_info?companyName=TCS
router.get("/nse/get_quote_info", (req, res, next) => {
  NSEAPI.getQuoteInfo(req.query.companyName)
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get the quotation data of the symbols (companyNames) from NSE - JSON
// Example: http://localhost:3000/nse/get_multiple_quote_info?companyNames=TCS,WIPRO
router.get("/nse/get_multiple_quote_info", (req, res, next) => {
  const companyNames = req.query.companyNames.split(",");
  NSEAPI.getMultipleQuoteInfo(companyNames)
    .then((r) => res.json(r))
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get the top 10 gainers of NSE - JSON
// Example: http://localhost:3000/nse/get_gainers
router.get("/nse/get_gainers", (req, res, next) => {
  NSEAPI.getGainers()
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get the top 10 losers of NSE - JSON
// Example: http://localhost:3000/nse/get_losers
router.get("/nse/get_losers", (req, res, next) => {
  NSEAPI.getLosers()
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get advances/declines of individual index, and the value if its changed or not - JSON
// Example: http://localhost:3000/nse/get_incline_decline
router.get("/nse/get_incline_decline", (req, res, next) => {
  NSEAPI.getInclineDecline()
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get the information of all the companies in a single NSE index (slug) JSON
// Example: http://localhost:3000/nse/get_index_stocks?symbol=nifty
router.get("/nse/get_index_stocks", (req, res, next) => {
  NSEAPI.getIndexStocks(req.query.symbol)
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get the list of companies in provided NSE index with matching keyword data - JSON
// Example: http://localhost:3000/nse/search_stocks?keyword=AXIS
router.get("/nse/search_stocks", (req, res, next) => {
  NSEAPI.searchStocks(req.query.keyword)
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get the intra day data of company in NSE - XML
// Example: http://localhost:3000/nse/get_intra_day_data?companyName=TCS&time=1
// Example: http://localhost:3000/nse/get_intra_day_data?companyName=TCS&time=month
router.get("/nse/get_intra_day_data", (req, res, next) => {
  NSEAPI.getIntraDayData(req.query.companyName, req.query.time)
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get 52 weeks all high stocks in NSE - JSON
// Example: http://localhost:3000/nse/get_52_week_high
router.get("/nse/get_52_week_high", (req, res, next) => {
  NSEAPI.get52WeekHigh()
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get 52 weeks all low stocks in NSE - JSON
// Example: http://localhost:3000/nse/get_52_week_low
router.get("/nse/get_52_week_low", (req, res, next) => {
  NSEAPI.get52WeekLow()
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get the NSE stocks whose values are highest - JSON
// Example: http://localhost:3000/nse/get_top_value_stocks
router.get("/nse/get_top_value_stocks", (req, res, next) => {
  NSEAPI.getTopValueStocks()
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get the NSE stocks whose volumes sold are highest - JSON
// Example: http://localhost:3000/nse/get_top_volume_stocks
router.get("/nse/get_top_volume_stocks", (req, res, next) => {
  NSEAPI.getTopVolumeStocks()
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get the futures data for a company stock (symbol) and time - JSON
// Example: http://localhost:3000/nse/get_stock_futures_data?companyName=TCS&time=15
// Example: http://localhost:3000/nse/get_stock_futures_data?companyName=VEDL&time=month
router.get("/nse/get_stock_futures_data", (req, res, next) => {
  NSEAPI.getStockFuturesData(req.query.companyName, req.query.time)
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get chart data of a companyName(symbol) depending on time in NSE - CSV Format (delimiter - |)
// Example: http://localhost:3000/nse/get_chart_data_new?companyName=VEDL&time=5
// Example: http://localhost:3000/nse/get_chart_data_new?companyName=VEDL&time=year
router.get("/nse/get_chart_data_new", (req, res, next) => {
  NSEAPI.getChartDataNew(req.query.companyName, req.query.time)
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Bombay Stock Exchange (NSE) APIS

// Get details of all index in BSE Stock exchange - JSON
// Example: http://localhost:3000/bse/get_indices
router.get("/bse/get_indices", (req, res, next) => {
  BSEAPI.getIndices()
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get the information of only a single index eg. SENSEX (16) - JSON
// Example: http://localhost:3000/bse/getIndexInfo?indexId=16
router.get("/bse/getIndexInfo", (req, res, next) => {
  BSEAPI.getIndexInfo(req.query.indexId)
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get todays closing data and daily data of past time using IndexId and time from BSE  - JSON
// Example: http://localhost:3000/bse/get_index_chart_data?indexId=16
router.get("/bse/get_index_chart_data", (req, res, next) => {
  BSEAPI.getIndexChartData(req.query.indexId, req.query.time)
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get details of all the stocks in an index - JSON
// Example: http://localhost:3000/bse/get_index_stocks?indexId=16
router.get("/bse/get_index_stocks", (req, res, next) => {
  BSEAPI.getIndexStocks(req.query.indexId)
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get details of company (stock) using securityCode - JSON
// 500112 - symbol (securityCode) of SBIN stock BSE
// Example: http://localhost:3000/bse/get_company_info?companyKey=500325
router.get("/bse/get_company_info", (req, res, next) => {
  BSEAPI.getCompanyInfo(req.query.companyKey)
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get chart type details of stocks in BSE using companyKey and time - JSON
// returns(StockValue, Volume) for company in specified past time
// Example: http://localhost:3000/bse/get_stocks_chart_data?companyKey=500325&time=5
// Example: http://localhost:3000/bse/get_stocks_chart_data?companyKey=500325&time=month
router.get("/bse/get_stocks_chart_data", (req, res, next) => {
  BSEAPI.getStocksChartData(req.query.companyKey, req.query.time)
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get BSE stock data of stock info and day chart - HTML
// Example: http://localhost:3000/bse/get_stock_info_and_day_chart_data?companyKey=500325
router.get("/bse/get_stock_info_and_day_chart_data", (req, res, next) => {
  BSEAPI.getStockInfoAndDayChartData(req.query.companyKey)
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get the top gainers of BSE stock exchange - JSON
// Example: http://localhost:3000/bse/get_gainers
router.get("/bse/get_gainers", (req, res, next) => {
  BSEAPI.getGainers()
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get the top losers of BSE stock exchange - JSON
// Example: http://localhost:3000/bse/get_losers
router.get("/bse/get_losers", (req, res, next) => {
  BSEAPI.getLosers()
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

// Get the top turnovers of BSE stock exchange - JSON
// Example: http://localhost:3000/bse/getTopTurnOvers
router.get("/bse/getTopTurnOvers", (req, res, next) => {
  BSEAPI.getTopTurnOvers()
    .then(function (response) {
      res.json(response.data);
    })
    .catch((err) => {
      res.status(500).json({
        message: "Something went wrong",
      });
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = router;

//serverless
// app.use("/.netlify/functions/api", router);

// module.exports.handler = serverless(app);
// "start": "./node_modules/.bin/netlify-lambda serve src",
