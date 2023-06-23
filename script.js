const incomeForm = document.querySelector(".income-place");
const expenseForm = document.querySelector(".expenses-place");
const incomeList = document.querySelector(".transaction-income");
const expenseList = document.querySelector(".transaction-expenses");
const settlement = document.querySelector(".settlement");
const incomeSum = document.querySelector(".income-money");
const expenseSum = document.querySelector(".expense-money");
const balanceMessage = document.querySelector(".balance-message");
const incomeSumElement = document.querySelector(".income-money");
const expenseSumElement = document.querySelector(".expense-money");

let income = 0;
let expenses = 0;

function addTransaction(type) {
  const nameInput = document.getElementById(`${type}-name`);
  const amountInput = document.getElementById(`${type}-amount`);

  const name = nameInput.value;
  const amount = Number(amountInput.value);

  if (name === "" || isNaN(amount) || amount <= 0) {
    alert("Podaj nazwę i kwotę transakcji");
    return;
  }

  if (type === "income") {
    income += amount;

    const incomeItem = document.createElement("div");
    incomeItem.textContent = `${name}: +${amount.toFixed(2)}zł`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Usuń";
    deleteButton.classList.add("button-delete");
    deleteButton.addEventListener("click", function () {
      incomeList.removeChild(incomeItem);
      income -= amount;
      updateBalance();
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edytuj";
    editButton.classList.add("button-edit");
    editButton.addEventListener("click", function () {
      nameInput.value = name;
      amountInput.value = amount.toFixed(2);
      incomeList.removeChild(incomeItem);
      income -= amount;
      updateBalance();
    });

    incomeItem.appendChild(deleteButton);
    incomeItem.appendChild(editButton);
    incomeList.appendChild(incomeItem);
  } else if (type === "expense") {
    expenses += amount;

    const expenseItem = document.createElement("div");
    expenseItem.textContent = `${name}: -${amount.toFixed(2)}zł`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Usuń";
    deleteButton.classList.add("button-delete");
    deleteButton.addEventListener("click", function () {
      expenseList.removeChild(expenseItem);
      expenses -= amount;
      updateBalance();
    });

    const editButton = document.createElement("button");
    editButton.textContent = "Edytuj";
    editButton.classList.add("button-edit");
    editButton.addEventListener("click", function () {
      nameInput.value = name;
      amountInput.value = amount.toFixed(2);
      expenseList.removeChild(expenseItem);
      expenses -= amount;
      updateBalance();
    });

    expenseItem.appendChild(deleteButton);
    expenseItem.appendChild(editButton);
    expenseList.appendChild(expenseItem);
  }

  updateBalance();
  updateIncomeSum();
  updateExpenseSum();

  nameInput.value = "";
  amountInput.value = "";
}

function updateIncomeSum() {
  incomeSumElement.textContent = `${income.toFixed(2)}zł`;
}

function updateExpenseSum() {
  expenseSumElement.textContent = `${expenses.toFixed(2)}zł`;
}

function updateBalance() {
  const balance = income - expenses;
  const settlementMessage = document.createElement("p");

  if (balance > 0) {
    settlementMessage.textContent = `Możesz jeszcze wydać ${balance.toFixed(
      2
    )} złotych.`;
  } else if (balance === 0) {
    settlementMessage.textContent = "Bilans wynosi zero.";
  } else {
    settlementMessage.textContent = `Bilans jest ujemny. Jesteś na minusie ${Math.abs(
      balance
    ).toFixed(2)} złotych.`;
  }

  if (settlement.childNodes.length > 0) {
    settlement.replaceChild(settlementMessage, settlement.childNodes[0]);
  } else {
    settlement.appendChild(settlementMessage);
  }
}

incomeForm.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-transaction")) {
    addTransaction("income");
  }
});

expenseForm.addEventListener("click", function (e) {
  if (e.target.classList.contains("add-transaction")) {
    addTransaction("expense");
  }
});
