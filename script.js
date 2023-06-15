const amountMoneyElement = document.querySelector(".amount-money");
const addTransactionButton = document.querySelector(".add-transaction");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const saveButton = document.querySelector(".save");
const cancelButton = document.querySelector(".cancel");
const incomeContainer = document.querySelector(".transaction-income");
const expensesContainer = document.querySelector(".transaction-expenses");

let availableFunds = 0;

function updateAvailableFunds() {
  amountMoneyElement.textContent = availableFunds + "zł";
}

function addTransaction() {
  const name = nameInput.value;
  const amount = Number(amountInput.value);

  if (name === "" || isNaN(amount)) {
    alert("Podaj właściwe dane transakcji");
    return;
  }

  const transactionElement = createTransactionElement(name, amount);
  const isIncome = amount >= 0;

  if (isIncome) {
    incomeContainer.appendChild(transactionElement);
    availableFunds += amount;
  } else {
    expensesContainer.appendChild(transactionElement);
    availableFunds -= Math.abs(amount);
  }

  updateAvailableFunds();
  clearInputFields();
}

function createTransactionElement(name, amount) {
  const transactionElement = document.createElement("div");
  transactionElement.classList.add("transaction-item");

  const transactionNameElement = document.createElement("span");
  transactionNameElement.textContent = name + " ";
  transactionElement.appendChild(transactionNameElement);

  const transactionAmountElement = document.createElement("span");
  transactionAmountElement.textContent = amount + " zł";
  transactionElement.appendChild(transactionAmountElement);

  const deleteButton = document.createElement("button");
  deleteButton.textContent = "Usuń";
  deleteButton.style.float = "right";
  deleteButton.addEventListener("click", function () {
    deleteTransaction(transactionElement, amount);
  });
  transactionElement.appendChild(deleteButton);

  const editButton = document.createElement("button");
  editButton.textContent = "Edytuj";
  editButton.style.float = "right";
  editButton.addEventListener("click", function () {
    editTransaction(transactionElement, name, amount);
  });
  transactionElement.appendChild(editButton);

  return transactionElement;
}

function deleteTransaction(transactionElement, amount) {
  const isIncome = amount >= 0;

  if (isIncome) {
    availableFunds -= amount;
  } else {
    availableFunds += Math.abs(amount);
  }

  transactionElement.remove();
  updateAvailableFunds();
}

function editTransaction(transactionElement, name, amount) {
  nameInput.value = name;
  amountInput.value = amount;

  deleteTransaction(transactionElement, amount);
  document.querySelector(".adding-transactions").style.display = "flex";
}

function clearInputFields() {
  nameInput.value = "";
  amountInput.value = "";
}

addTransactionButton.addEventListener("click", function () {
  document.querySelector(".adding-transactions").style.display = "flex";
});

saveButton.addEventListener("click", function () {
  addTransaction();
  document.querySelector(".adding-transactions").style.display = "none";
});

cancelButton.addEventListener("click", function () {
  clearInputFields();
  document.querySelector(".adding-transactions").style.display = "none";
});
