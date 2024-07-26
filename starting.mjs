import inquirer from "inquirer";
import figlet from "figlet";
import gradient from "gradient-string";
import { execSync } from "child_process";
import chalkAnimation from "chalk-animation";

const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  figlet(
    "TeenPy",
    {
      width: 80,
    },
    (err, data) => {
      console.log(gradient.mind(data) + "\n");
    }
  );
  await sleep();
}

async function question1() {
  const ans = await inquirer.prompt({
    name: "framework",
    type: "list",
    message: "Select framework : ",
    choices: ["next.js", "react.js", "vanilla"],
  });
  return ans.framework;
}

async function question2() {
  const ans = await inquirer.prompt({
    name: "lang",
    type: "list",
    message: "Select language : ",
    choices: ["JavaScript", "TypeScript"],
  });
  return ans.lang;
}

async function question3() {
  const ans = await inquirer.prompt({
    name: "Permission",
    type: "input",
    message: "Allow teenpy to generate code? (Y/N)",
    default: "Y",
  });
  return ans.Permission;
}

async function question4() {
  const ans = await inquirer.prompt({
    name: "web3",
    type: "list",
    message: "Have any web3 wallet?",
    choices: ["Yes", "No"],
  });
  return ans.web3;
}

async function question5() {
  const ans = await inquirer.prompt({
    name: "web3",
    type: "list",
    message: "Payment option? (Can be changed later)",
    choices: ["UPI", "NEFT"],
  });
  return ans.web3;
}

async function question6() {
  const ans = await inquirer.prompt({
    name: "upi",
    type: "input",
    message: "Enter UPI ID (Can be changed later):",
  });
  return ans.upi;
}

async function question7() {
  const ans = await inquirer.prompt({
    name: "accNo",
    type: "input",
    message: "Enter account number (Can be changed later):",
  });
  return ans.accNo;
}

async function question8() {
  const ans = await inquirer.prompt({
    name: "network",
    type: "input",
    message: "Enter network (Can be changed later):",
  });
  return ans.network;
}

async function question9() {
  const ans = await inquirer.prompt({
    name: "walletAdd",
    type: "input",
    message: "Enter wallet address (Can be changed later):",
  });
  return ans.walletAdd;
}

async function question10() {
  const ans = await inquirer.prompt({
    name: "country",
    type: "list",
    message: "Country: ",
    choices: ["India", "Other"],
  });
  return ans.country;
}

async function question11() {
  const ans = await inquirer.prompt({
    name: "payPalID",
    type: "input",
    message: "Enter payPalID (Can be changed later):",
  });
  return ans.payPalID;
}

async function addToEnv(str, val) {
  execSync(`touch .env && echo ${str} = ${val} >> .env`);
}

async function reactHandlerJs() {
  console.log("I am react js");
}

async function nextHandlerJs() {
  console.log("I am next js");
}

async function vanillaHandlerJs() {
  console.log("I am vanilla js");
}

async function reactHandlerTs() {
  console.log("I am react ts");
}

async function nextHandlerTs() {
  console.log("I am next ts");
}

async function vanillaHandlerTs() {
  console.log("I am vanilla ts");
}

async function main() {
  await welcome();

  const fw = await question1();
  const lang = await question2();
  const walletConfirmation = await question4();

  if (walletConfirmation == "No") {
    const country = await question10();

    if (country == "India") {
      const payOpt = await question5();

      if (payOpt == "UPI") {
        const upi = await question6();
        await addToEnv("UPI_ID", upi);
      } else {
        const accNo = await question7();
        await addToEnv("ACCOUNT_NO", accNo);
      }
    } else {
      const payPalID = await question11();
      await addToEnv("PAYPAL_ID", payPalID);
    }
  } else {
    const net = await question8();
    await addToEnv("NETWORK", net);

    const add = await question9();
    await addToEnv("WALLET_ADDRESS", add);
  }

  const per = await question3();
  const p = per.toLowerCase().replace(/\s+/g, "");
  const checkArr = ["yes", "y"];

  if (p in checkArr) {
    console.log("You cancelled the process");
    return;
  }

  if (lang == "JavaScript") {
    if (fw == "react.js") {
      reactHandlerJs();
    } else if (fw == "next.js") {
      nextHandlerJs();
    } else {
      vanillaHandlerJs();
    }
  } else {
    if (fw == "react.js") {
      reactHandlerTs();
    } else if (fw == "next.js") {
      nextHandlerTs();
    } else {
      vanillaHandlerTs();
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {});
