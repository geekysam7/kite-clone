import { elements, renderLoader } from "./base";

export const clearInstruments = () => {
  elements.instruments.innerHTML = '';
}

const renderInstrument = (instrument) => {

  const color = Number(instrument.per) > 0 ? "text-green" : "text-red";

  const markup = `
  <div class="instruments-item">
    <div class="instruments-item--caption ${color}">${instrument.symbol}</div>
    <div class="instruments-item--change">${instrument.per}</div>
    <div class="change-percentage">%</div>
    <div class="fas instruments-item--arrow fa-chevron-down ${color}"></div>
    <div class="instruments-item--value ${color}">${instrument.ltp}</div>
  </div>
  `

  elements.instruments.insertAdjacentElement('beforeend', markup);
} 

export const renderInstruments = (instruments) => {
  instruments.forEach(renderInstrument);
}

export const renderAllLoaders = () => {
  renderLoader(elements.instruments);
  renderLoader(elements.niftyAndSensex);
} 

export const clearAllElements = () => {
  elements.instruments.innerHTML = "";
  elements.niftyAndSensex.innerHTML = "";
}