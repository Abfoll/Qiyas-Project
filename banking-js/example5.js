function createInitialBalance(initialBalance) {
    let balance = initialBalance;
    console.log("Your Initial balance is: " + balance);
    return{
        deposit: (amount) => {
           
            balance += amount;
            console.log("Your Deposit is: " + amount);
            console.log("Your Current balance is: " + balance);
        },
        withdraw: (amount) => {
            if (balance < amount) {
                console.log("Insufficient balance. Withdrawal failed.");
                return;
            } else {
                balance -= amount;
                console.log("Your Withdrawal is: " + amount);
                console.log("Your Current balance is: " + balance);
            }
        },
        checkBalance: () => {
            console.log("Your Current balance is: " + balance);
        }              
    };  
}



const myBalance = createInitialBalance(100);
myBalance.deposit(50);
myBalance.withdraw(30);
myBalance.withdraw(150);
myBalance.checkBalance();   