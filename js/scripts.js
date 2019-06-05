// Back-End
//  Business-logic
const Account = (function () {
  class Account {
    constructor(name, balance) {
      this.name = name;
      this.balance = balance;
    }
    withdrawal(withdrawalAmount) {
      if (this.balance < withdrawalAmount) {
        this.balance = 0;
        return;
      }
      this.balance -= withdrawalAmount;
    }
    deposit(depositAmount) {
      this.balance += depositAmount;
    }
    reset() {
      this.name = "";
      this.balance = 0;
    }
  }
  return Account;
})();


// Front-End
// User Interface logic
const updateDomBalance = function (balance) {
  $("#currentBalanceDisplay").text(`₿ ${balance.toLocaleString()}`);
}

const hideRegistration = function () {
  $("#registrationDisplay").fadeOut(1000, function () {
    $("#titleHeader p").fadeIn();
    $("#transactionDisplay").fadeIn();
    $("#balanceDisplay").fadeIn();
  });
}

const newRegistration = function () {

  $("#titleHeader p").fadeOut();
  $("#transactionDisplay").fadeOut();
  $("#balanceDisplay").fadeOut(function () {
    $("#fullNameInput").val("");
    $("#initialDepositInput").val("");
    $("#withdrawInput").val("");
    $("#depositInput").val("");
    $("#registrationDisplay").fadeIn();
  });
}

$(document).ready(function () {

  $("#registrationForm").submit(function (event) {
    event.preventDefault();
    let fullName = $("#fullNameInput").val();
    let initialDeposit = Math.abs(Number($("#initialDepositInput").val()));

    let newAccount = new Account(fullName, initialDeposit);
    updateDomBalance(newAccount.balance);

    $("#titleHeader p").text(`Welcome${newAccount.name === "" ? "" : " "}${newAccount.name},
     Thank you for trusting us!
     We are proud to welcome you and we look forward to many years of working together.`);
    hideRegistration();

    $("#transactButton").click(function () {
      let withdrawInput = Math.abs(Number($("#withdrawInput").val()));
      let depositInput = Math.abs(Number($("#depositInput").val()));

      newAccount.deposit(depositInput);
      newAccount.withdrawal(withdrawInput);

      updateDomBalance(newAccount.balance);

    });

    $("#newAccountButton").click(function () {
      newRegistration();
      newAccount.reset();
// END $("#newAccountButton").click(function ()
    });
// END  $("#registrationForm").submit(function (event) 
  });
// END $(document).ready(function ()
});
