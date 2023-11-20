require("dotenv").config();

console.log("Create Package Json File!!!");
console.log(process.env.NAME);
console.log(process.env.COURSE);

//Sync code and it's excution and problem of sync and how it's  blocking futher code excution

console.log("Start operation!!");

function sleep(milisec) {
    let startTime = new Date().getTime();
    console.log("Operation Running!!!");
    while (new Date().getTime() < startTime + milisec) {
        console.log("In progress");
    }
    console.log("Done");
}
sleep(1000);
console.log("Do Something!!")

//Using async setTimeout Function resolve issue
console.log("Start operation!!");

function sleep(milisec) {
    setTimeout(() => {
        console.log("Operation Done!!!");
    }, milisec)
}
sleep(1000);
console.log("Do Something!!");

//More Better async solution using promise

const promise = new Promise((resolve, reject) => {
    if (true) {
        resolve();
    } else {
        reject();
    }
});

promise.then(
    () => {
        console.log("Success!!");
    },
    () => {
        console.log("Failed!!");
    }
);

//More Better approch using async and await
function evennumber(n) {
    if (n % 2 == 0) {
        return true;
    } else {
        return false;
    }
}

async function checkEvenNumber() {
    const response = await evennumber(2);
    if (response) {
        console.log("Even Number!!");
    } else {
        console.log("Odd Number!!");
    }
}
checkEvenNumber();