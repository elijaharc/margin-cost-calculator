// Calculation logic here

// margin cost calculator
const risked_amount_result = document.getElementById("risked-amount");
const trade_amount_result = document.getElementById("trade-size");
const margin_cost_result = document.getElementById("margin-cost");

// risk management calculator
const cash_at_risk_result = document.getElementById("cash-at-risk");
const quantity_of_shares_result = document.getElementById("quantity-of-shares");
const cutloss_price_result = document.getElementById("cutloss-price");
const port_allocation_size = document.getElementById("port-allocation-size");

// margin cost
$("#margin-cost-calculator").submit(function (e) {
  // gets values
  let accountSize = parseFloat($("#accountSize").val());
  let leverage = parseFloat($("#leverage").val());
  let riskRatio = parseFloat($("#riskRatio").val()) / 100;
  let stopLoss = parseFloat($("#stopLoss").val()) / 100;

  // form logic
  let riskedAmount = accountSize * riskRatio;
  let tradeSize = riskedAmount / stopLoss;
  let marginCost = tradeSize / leverage;

  // displays result
  $("#result-display").removeAttr("style");
  risked_amount_result.innerHTML = `Risked Amount ($): ${numberWithCommas(
    parseFloat(riskedAmount).toFixed(2)
  )}`;
  trade_amount_result.innerHTML = `Trade Amount ($): ${numberWithCommas(
    parseFloat(tradeSize).toFixed(2)
  )}`;
  margin_cost_result.innerHTML = `Margin Cost ($): ${numberWithCommas(
    parseFloat(marginCost).toFixed(2)
  )}`;

  // prevents page refresh
  e.preventDefault();
});

// risk management
$("#risk-calculator").submit(function (e) {
  // gets values
  let portfolioAmount = parseFloat($("#portfolioAmount").val());
  let riskRatio = parseFloat($("#risk-ratio-percent").val());
  let entryPrice = parseFloat($("#entry-price").val());
  let stopLoss = parseFloat($("#stop-loss").val()) / 100;
  let maxPortAllocation = parseFloat($("#max-port-allocation").val());

  // form logic
  let cashAtRisk = portfolioAmount * riskRatio;
  let maxAmount = portfolioAmount * maxPortAllocation;
  let quantityOfShares = cashAtRisk / stopLoss / entryPrice;
  let cutlossPrice = entryPrice - stopLoss * entryPrice;
  if (quantityOfShares * entryPrice > maxAmount) {
    quantityOfShares = maxAmount / entryPrice;
    console.log("max");
  }
  let portAllocationPercent =
    ((quantityOfShares * entryPrice) / portfolioAmount) * 100;

  // displays result
  $("#result-display").removeAttr("style");
  quantity_of_shares_result.innerHTML = `Quantity of Shares: ${numberWithCommas(
    parseFloat(quantityOfShares).toFixed(0)
  )}`;
  cutloss_price_result.innerHTML = `Cutloss Price (₱): ${parseFloat(
    cutlossPrice
  ).toFixed(4)}`;
  cash_at_risk_result.innerHTML = `Cash at Risk (₱): ${numberWithCommas(
    parseFloat(cashAtRisk).toFixed(2)
  )}`;
  port_allocation_size.innerHTML = `Portfolio Allocation Size (%): ${parseFloat(
    portAllocationPercent
  ).toFixed(2)}`;

  // prevents page refresh
  e.preventDefault();
});

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
