/*
- Fetch nifty index stocks onload event.
- Render them inside instruments class.
- Now onhover of the item show Buy, Sell Option.
- Hide marketwatch below 900px, instead of hover use onclick event on it and 
- Change Buy Sell window to full screen 
*/

/*
- User Profile: Average price of stock.
- State Structure:
{
  userStocks: {
    currentValue: 12000,
    investment: 10000,
    pL: 2000,
  }, // symbol: {}
  pendingTransactions: [],
  completedTransactions: [],
  userBalance: {
    marginUsed: 0,
    openingBalance: 10000,
    marginAvailable: 10000,
  },
}
*/

const state = {
  userStocks: {},
  userBalance: {
    margin: 100000,
    currentValue: 12000,
    investment: 0,
    pL: 2000,
  },
  pendingTransactions: [],
  completedTransactions: [],
};

const elements = {
  searchInput: document.querySelector("#marketsearch-input"),
  instruments: document.querySelector(".instruments"),
  niftyAndSensex: document.querySelector(".header-left"),
  pendingTransactions: document.querySelector('.pending-transactions'),
  completedTransactions: document.querySelector('.completed-transactions'),
  pageContent: document.querySelector('.dashboard'),
  potfolioTransactions: document.querySelector('.portfolio-transactions'),
  searchResults: document.querySelector('.marketsearch-results'),
  searchResultsInstruments: document.querySelector('.marketsearch-results--instruments')
}

const elementStrings = {
  loader: 'loader',
  error: 'error'
}

const renderLoader = parent => {
  const loader = `
    <div class=${elementStrings.loader}>
    </div>
  `;

  parent.insertAdjacentHTML('afterbegin', loader);
} 

const renderError = parent => {
  const error = `
    <div class=${elementStrings.error}>
      Error...
    </div>
  `
  parent.insertAdjacentHTML('afterbegin', error);
}

const clearLoader = parent => {
  if(parent) parent.innerHTML = "";
}

const clearInstruments = () => {
  elements.instruments.innerHTML = '';
}

const floatParser = (str) => parseFloat(str.replace(/,/g, '')).toFixed(2);

const flattenArray = (instruments) => {
  let flattenInstruments = {};

  instruments.forEach((instrument) => {
    flattenInstruments[instrument.symbol] = instrument;
  })

  return flattenInstruments;
}

const buyInstrument = (e) => {
  console.log(e);
}

const sellInstrument = (e) => {
  console.log(e);
}

const renderInstrument = (instrument) => {

  const color = Number(instrument.per) > 0 ? "text-green" : "text-red";

  const markup = `
    <div class="instruments-item" data-symbol=${instrument.symbol}>
      <div class="instruments-item--caption ${color}">${instrument.symbol}</div>
      <div class="instruments-item--change">${instrument.per}</div>
      <div class="change-percentage">%</div>
      <div class="fas instruments-item--arrow ${instrument.per[0] === "-" ? "fa-chevron-down": "fa-chevron-up"} ${color}"></div>
      <div class="instruments-item--value ${color}">${instrument.ltP}</div>
      <div class="instruments-item--options" data-symbol=${instrument.symbol} data-ltP=${instrument.ltP}>
        <button class="buy-button">Buy</button>
        <button class="sell-button">Sell</button>
      </div>
    </div>
  `;

  elements.instruments.insertAdjacentHTML('beforeend', markup);
}

const renderInstruments = (instruments) => {
  elements.instruments.innerHTML = "";
  instruments.forEach(renderInstrument);
}

const renderNiftyAndSensex = (nifty50, sensex) => {
  elements.niftyAndSensex.innerHTML = "";
  const markup = `
  <div class="pinned-instrument">
    <span class="pinned-instrument--caption">${nifty50.indexName}</span>
    <span class="pinned-instrument--value">${nifty50.last}</span>
    <span class="pinned-instrument--change">${nifty50.percChange}</span>
    <span class="pinned-instrument--percentage">%</span>
  </div>
  <div class="pinned-instrument">
    <span class="pinned-instrument--caption">${sensex.indexName}</span>
    <span class="pinned-instrument--value">${sensex.last}</span>
    <span class="pinned-instrument--change">${sensex.percChange}</span>
    <span class="pinned-instrument--percentage">%</span>
  </div>
  `

  elements.niftyAndSensex.insertAdjacentHTML("afterbegin", markup);
}

const renderAllLoaders = () => {
  renderLoader(elements.instruments);
  renderLoader(elements.niftyAndSensex);
} 

const clearAllElements = () => {
  elements.instruments.innerHTML = "";
  elements.niftyAndSensex.innerHTML = "";
}

const renderPendingTransaction = (transaction) => {
  console.log(transaction);

  let d = new Date(transaction.timestamp);
  let time = d.toLocaleTimeString();
  let date = d.toLocaleDateString();

  const markup = `
  <tr>
    <td>${transaction.symbol}</td>
    <td>
      <span class="date">${date}</span>
      <span class="time">${time}</span>
    </td>
    <td>
      <span class="${transaction.type}">${transaction.type.toUpperCase()}</span></td>
    <td>${transaction.quantity}</td>
    <td>${transaction.triggerPrice}</td>
  </tr>
  `;

  elements.pendingTransactions.insertAdjacentHTML("afterbegin", markup);
}

const renderPendingTransactions = () => {

  elements.pendingTransactions.innerHTML = "";

  state.pendingTransactions.forEach((transaction) => renderPendingTransaction(transaction));
}

const renderCompletedTransaction = (transaction) => {

  console.log(transaction);

  let d = new Date(transaction.timestamp);
  let time = d.toLocaleTimeString();
  let date = d.toLocaleDateString();

  const markup = `
  <tr>
    <td>${transaction.symbol}</td>
    <td>
      <span class="date">${date}</span>
      <span class="time">${time}</span>
    </td>
    <td>
      <span class="${transaction.type}">${transaction.type.toUpperCase()}</span></td>
    <td>${transaction.quantity}</td>
    <td>${transaction.triggerPrice}</td>
  </tr>
  `;

  elements.completedTransactions.insertAdjacentHTML("afterbegin", markup);
}

const renderCompletedTransactions = () => {
  elements.completedTransactions.innerHTML = "";
  state.completedTransactions.forEach((transaction) => renderCompletedTransaction(transaction));
}

const renderBuySellForm = (type, data) => {

  const TYPE = type === "buy" ? "Buy" : "Sell";

  const markup = `
    <form class="transaction-window" id="${type}-form">
    <div class="transaction-window--header">
      <div class="transaction-window--header-left">
        <div class="flex-row">
          <div class="transaction-caption">${TYPE} <span class="${type}-symbol">${data.symbol}</span></div>
          <div class="transaction-market">NSE</div>
          <div class="transaction-quantity"> x <span class="${type}-quantity-top">1</span>Qty</div>
        </div>
        <div class="flex-row">
          <div class="transaction-window--header-radio">
            <span for="NSE">NSE: <span class="${type}-price-top">${data.ltP}</span></span>
          </div>
        </div>
      </div>
    </div>
    <div class="transaction-window--main">
      <div class="transaction-window--input">
        <div>
          <label for="${type}-quantity" class="label" >Quantity</label>
          <input type="number" id="${type}-quantity" required min="1" value="1" placeholder="Qty.">
        </div>
        <div class="price-container" class="label">
          <label for="${type}-price" class="label">Price</label>
          <input type="text" id="${type}-price" value=${data.ltP} disabled placeholder="Price">
        </div>
        <div>
          <label for="${type}-trigger-price" class="label">Trigger Price</label>
          <input type="text" id="${type}-trigger-price" value=${floatParser(data.ltP)} required placeholder="Trigger Price">
        </div>
      </div>
    </div>
    <div class="transaction-window--buttons">
      <div class="flex-row" style="font-size: small">
        <div>Margin required:</div>
        <div style="padding-left: 5px" class="margin ${type}-margin">${data.ltP}</div>
        <div style="padding-left: 5px; cursor: pointer;" class="fa-solid fa-arrows-rotate text-green" class="margin-refresh"></div>
      </div>
      <div>
        <button class='${type === "buy" ? "bg-blue": "bg-orange"}' type="submit" style="padding: 10px 15px; width: 100px;">${TYPE}</button>
        <button class="bg-white" type="button" style="padding: 10px 15px; width: 100px;" onClick="closeForm()">Cancel</button>
      </div>
    </div>
  </form>
  `

  elements.pageContent.insertAdjacentHTML('beforeend', markup);
}

const renderSearchedResults = (results) => {
  elements.searchResults.style.display = "none";
  elements.searchResultsInstruments.innerHTML = "";
  console.log(results);
  if(results.length) {
    elements.searchResults.style.display = "flex";
    results.forEach((result) => {
      let markup = `
        <div class="marketsearch-results--instrument-item">
          <div>${result.name}</div>
          <div>${result.symbol}</div>
        </div>
      `
      elements.searchResultsInstruments.insertAdjacentHTML('beforeend', markup);
    })
  }
}

const URL = "http://localhost:9000/";

const NIFTY_URL = "http://localhost:9000/nse/get_index_stocks?symbol=nifty"

//debounce

function debounce(func, time) {
  let timer;

  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => func(...arguments), time);
  }
}

//Fetch nifty stocks.

const errorResponse = (err) => ({type: "error", message: err.message});

const jsonResponse = (url) => fetch(url).then(res => res.json());

const fetchNifty = async () => {
  try {
    const response = await jsonResponse(NIFTY_URL);
    return {type: "success", data: response.data};
  } catch (err) {
    return errorResponse(err);
  }
}

const fetchSearchedInstrument = async (key) => {

  console.log(key);

  try {
    let response = await jsonResponse(URL + "nse/search_stocks?keyword=" + key);

    if(key === "") {
      response = [];
    }
    renderSearchedResults(response);
  } catch (err) {
    return errorResponse(err);
  }
}

const fetchMarketStatus = async () => {
  try {
    const response = await jsonResponse(URL + "get_market_status");
    return {type: "success", data: response.status};
  } catch (err) {
    return errorResponse(err);
  }
}

//No direct query api as of now.
const fetchNifty50 = async () => {
  try {
    const response = await jsonResponse(URL + "nse/get_indices");
    const nifty50 = response.data.find((indices) => indices.indexName === "NIFTY 50");
    return {type: "success", data: nifty50};
  } catch (err) {
    return errorResponse(err);
  }
}

//hardcoding due to issue in bse api.
const fetchSensex = async () => {
  try {
    return {type: "success", data: {
      last: 58465.97,
      percChange: "1.14",
      indexName: "SENSEX"
    }}
  } catch(err) {
    return errorResponse(err);
  }
}

const fetchNifty50AndSensex = async () => {
  try {
    const nifty50AndSensex = [fetchNifty50(), fetchSensex()];
    const response = await Promise.all(nifty50AndSensex);
    return {type: "success", data: response};
  } catch (err) {
    return errorResponse(err);
  }
}

const renderUserPortfolioTransactions = (transaction) => {
  let markup = `
    <tr>
    <td>${transaction.symbol}</td>
    <td>${transaction.quantity}</td>
    <td>${transaction.average}</td>
  </tr>
  `

  elements.potfolioTransactions.insertAdjacentHTML('beforeend', markup);
}

const renderUserPortfolio = () => {
  elements.potfolioTransactions.innerHTML = "";
  Object.keys(state.userStocks).forEach(key => renderUserPortfolioTransactions(state.userStocks[key]));
  document.querySelector('.investment').innerHTML = "( Investment: " + state.userBalance.investment.toFixed(2) + " )";
  document.querySelector('.margin').innerHTML = "( Margin: " + state.userBalance.margin.toFixed(2) + " )";
}

const initUI = async () => {

  // clearAllElements();
  // renderAllLoaders();
  renderUserPortfolio();

  try {
    const parallelAPICalls = [fetchMarketStatus(), fetchNifty50AndSensex(), fetchNifty()];
    const response = await Promise.allSettled(parallelAPICalls);
    
    console.log(response);

    //render data to dom
    if(response.length) {

      //market status
      if(response[0].status === "fulfilled" && response[0].value.type === 'success') {
        console.log(response[0].value.data);
      }

      if(response[1].status === 'fulfilled' && response[1].value.type === 'success') {
        let nifty50 = response[1].value.data[0].data;
        let sensex = response[1].value.data[1].data;
        // clearLoader(elements.niftyAndSensex);

        renderNiftyAndSensex(nifty50, sensex);
      } else {
        renderError(elements.niftyAndSensex);
      }

      if(response[2].status === 'fulfilled' && response[2].value.type === 'success') {
        // clearLoader(elements.instruments);
        renderInstruments(response[2].value.data);
      } else {
        renderError(elements.instruments);
      }
    }

    console.log(response);
  } catch (err) {
    clearAllElements();
    console.log(errorResponse(err));
  }
}

window.onload = initUI();

// form

const readFormValues = (type) => {
  return {
    quantity: document.querySelector(`#${type}-quantity`).value,
    price: document.querySelector(`#${type}-price`).value,
    triggerPrice: document.querySelector(`#${type}-trigger-price`).value,
  }
}

function closeForm() {
  const buyForm = document.querySelector("#buy-form");
  const sellForm = document.querySelector("#sell-form");

  if(buyForm) {
    elements.pageContent.removeChild(buyForm);
  };

  if(sellForm) {
    elements.pageContent.removeChild(sellForm);
  }
}

function openForm ({type, data}) {

  closeForm();
  renderBuySellForm(type, data);

  const buyForm = document.querySelector("#buy-form");
  const sellForm = document.querySelector("#sell-form");

  if(type === "buy") {
    buyForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const {quantity, price, triggerPrice} = readFormValues(type);
      console.log(quantity, price, triggerPrice, state.currentInstrument);

      transactionsController({
        symbol: state.currentInstrument,
        type,
        quantity,
        price,
        triggerPrice
      })
    });

  } else {
    sellForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const {quantity, price, triggerPrice} = readFormValues(type);
      console.log(quantity, price, triggerPrice, state.currentInstrument);
      transactionsController({
        symbol: state.currentInstrument,
        type,
        quantity,
        price,
        triggerPrice
      })
    })
  }
}

const renderUI = () => {
  renderPendingTransactions();
  renderCompletedTransactions();
  renderUserPortfolio();
}

elements.instruments.addEventListener('click', (e) => {
  if(e.target.matches('.buy-button')) {
    const parentElement = e.target.parentElement;
    openForm({
      type: 'buy',
      data: {
        symbol: parentElement.getAttribute('data-symbol'),
        ltP: parentElement.getAttribute('data-ltP')
      }
    });

    state.currentInstrument = parentElement.getAttribute('data-symbol');
  }

  if(e.target.matches('.sell-button')) {
    const parentElement = e.target.parentElement;
    openForm({
      type: 'sell',
      data: {
        symbol: parentElement.getAttribute('data-symbol'),
        ltP: parentElement.getAttribute('data-ltP')
      }
    });

    state.currentInstrument = parentElement.getAttribute('data-symbol');
  }
});

//input search

const debouncedSearch = debounce(fetchSearchedInstrument, 500);

elements.searchInput.addEventListener('keyup', (e) => debouncedSearch(e.target.value));

const handlePendingTransactions = async () => {
  if(state.pendingTransactions.length) {
    let flattenPendingTransaction = flattenArray(state.pendingTransactions)
    try {
      const response = await fetchNifty();
      if(response.type === "success" && response.data.length) {

        let pendingTransactions = [];
        let completedTransactions = [];

        const nifty50 = flattenArray(response.data);
        console.log(flattenPendingTransaction);
        state.pendingTransactions.forEach((transaction) => {

          let currentTransaction = nifty50[transaction.symbol];

          if(currentTransaction) {
            if(transaction.type === 'buy' && floatParser(transaction.triggerPrice) >= currentTransaction.ltP) {
              completedTransactions.push(transaction);

              let currentInstrumentState = {};
              let previousInstrumentState = state.userStocks[transaction.symbol];
              if(previousInstrumentState) {

                let quantity = Number(previousInstrumentState.quantity) + Number(transaction.quantity);

                currentInstrumentState = {
                  quantity,
                  average: Number(((previousInstrumentState.average * previousInstrumentState.quantity) + (transaction.triggerPrice * transaction.quantity)) / quantity).toFixed(2),
                  symbol: transaction.symbol,
                };
              } else {
                currentInstrumentState = {
                  quantity: transaction.quantity,
                  average: transaction.triggerPrice,
                  symbol: transaction.symbol
                }
              }

              state.userStocks[transaction.symbol] = currentInstrumentState;

            } else if (transaction.type === 'sell' && floatParser(transaction.triggerPrice) <= currentTransaction.ltP) {
              completedTransactions.push(transaction);

              let currentInstrumentState = null;
              let previousInstrumentState = state.userStocks[transaction.symbol]; //guaranteed to be present.

              if(previousInstrumentState) {

                //handle margin

                let quantity = Number(previousInstrumentState.quantity) - Number(transaction.quantity);

                if(quantity === 0) {
                  currentInstrumentState = null;
                } else {
                  currentInstrumentState = {
                    quantity,
                    average: previousInstrumentState.average,
                    symbol: transaction.symbol
                  }
                }

                let sellingPrice = Number(transaction.quantity) * floatParser(transaction.triggerPrice);
                
                state.userBalance = {...state.userBalance, margin: state.userBalance.margin + sellingPrice, investment: state.userBalance.investment - sellingPrice > 0 ? state.userBalance.investment - sellingPrice : 0};
              
                if(currentInstrumentState) {
                  state.userStocks[transaction.symbol] = currentInstrumentState;
                } else {
                  delete state.userStocks[transaction.symbol]
                }
              }
            } else {
              pendingTransactions.push(transaction);
            }
          }
        });

        state.pendingTransactions = pendingTransactions;
        state.completedTransactions = [...state.completedTransactions, ...completedTransactions];
        
        renderUI();
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}

const transactionsController = (data) => {
  console.log(data);
  //update pending state, update completed state, check user stocks.
  if(data.type === 'buy') {
    //check if user has balance.
    //any transaction goes to pending first.
    if(state.userBalance.margin >= (data.quantity * floatParser(data.triggerPrice))) {
      state.pendingTransactions.push({
        ...data,
        timestamp: new Date().getTime()
      });

      state.userBalance = {...state.userBalance, margin: state.userBalance.margin - data.quantity * floatParser(data.triggerPrice), investment: state.userBalance.investment + Number(data.quantity) * floatParser(data.triggerPrice)};
    }
  } else {
    if(state.userStocks[data.symbol] && state.userStocks[data.symbol].quantity >= data.quantity) {
      //stocks can be sold.
      state.pendingTransactions.push({
        ...data,
        timestamp: new Date().getTime()
      })
    } else {
      console.log('Not sufficient stocks present.');
    }
  }

  console.log(state);

  renderUI();
  closeForm();
  state.currentInstrument = "";
}

const initInterval = setInterval(initUI, 4000);

const pendingTransactionInterval = setInterval(handlePendingTransactions, 2000);

window.addEventListener('unload', () => {
  clearInterval(initInterval);
  clearInterval(pendingTransactionInterval);
})