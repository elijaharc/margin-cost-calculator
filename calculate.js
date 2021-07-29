// Calculation logic here

const risked_amount_result = document.getElementById("risked-amount");
const trade_amount_result = document.getElementById("trade-size");
const margin_cost_result = document.getElementById("margin-cost");

$("form").submit(function (e) {
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
  risked_amount_result.innerHTML = `Risked Amount ($): ${parseFloat(
    riskedAmount
  ).toFixed(2)}`;
  trade_amount_result.innerHTML = `Trade Amount ($): ${parseFloat(
    tradeSize
  ).toFixed(2)}`;
  margin_cost_result.innerHTML = `Margin Cost ($): ${parseFloat(
    marginCost
  ).toFixed(2)}`;

  // prevents page refresh
  e.preventDefault();
});
