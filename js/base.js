export const elements = {
  searchInput: document.getElementById("marketsearch-input"),
  instruments: document.querySelector(".instruments"),
  niftyAndSensex: document.querySelector(".header-left"),
}

export const elementStrings = {
  loader: 'loader',
  error: 'error'
}

export const renderLoader = parent => {
  const loader = `
    <div class=${elementStrings.loader}>
      Loading...
    </div>
  `;

  parent.insertAdjacentHTML('afterbegin', loader);
} 

export const renderError = parent => {
  const error = `
    <div class=${elementStrings.error}>
      Error...
    </div>
  `
  parent.insertAdjacentHTML('afterbegin', error);
}

export const clearLoader = parent => {
  if(parent) parent.innerHTML = "";
}