const incomeForm = document.querySelector(".income-place");
const expenseForm = document.querySelector(".expenses-place");
const incomeList = document.querySelector(".transaction-income");
const expenseList = document.querySelector(".transaction-expenses");
const balanceAmount = document.querySelector(".amount-money");
const incomeSum = document.querySelector(".income-money");
const expenseSum = document.querySelector(".expense-money");

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

  nameInput.value = "";
  amountInput.value = "";
}

function updateBalance() {
  const balance = income - expenses;
  balanceAmount.textContent = `${balance.toFixed(2)}zł`;
  incomeSum.textContent = `${income.toFixed(2)}zł`;
  expenseSum.textContent = `${expenses.toFixed(2)}zł`;
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

function calculateInitialTotals() {
  const initialIncome = Array.from(incomeList.children)
    .map((item) => parseFloat(item.textContent.split(":")[1]))
    .reduce((total, value) => total + value, 0);

  const initialExpenses = Array.from(expenseList.children)
    .map((item) => parseFloat(item.textContent.split(":")[1]))
    .reduce((total, value) => total + value, 0);

  income = initialIncome;
  expenses = initialExpenses;

  updateBalance();
}
