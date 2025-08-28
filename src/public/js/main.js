import { Router } from "./router.js";
import { Step1 } from "../views/view-step-1.js";
import { Step2 } from "../views/view-step-2.js";
import { Step3 } from "../views/view-step-3.js";
import { Step4 } from "../views/view-step-4.js";
import { Step5 } from "../views/view-step-5.js";
import { Step6 } from "../views/view-step-6.js";
import { Step7 } from "../views/view-thank-you.js";
const routes = {
    "/": Step1,
    "/view/step-1": Step1,
    "/view/step-1/:formId/:stepId": Step1,
    "/view/step-2/:formId/:stepId": Step2,
    "/view/step-3/:formId/:stepId": Step3,
    "/view/step-4/:formId/:stepId": Step4,
    "/view/step-5/:formId/:stepId": Step5,
    "/view/step-6/:formId/:stepId": Step6,
    "/view/thank-you/:formId": Step7,
    "*": Step1
};

// console.log('Initializing router with routes:', routes);
const router = new Router(routes);

// Function to handle navigation
window.navigateTo = (event, path) => {
    if (event) {
        event.preventDefault();
    }
    // console.log('Navigation requested to:', path);
    router.navigate(path);
};
