import { serviceThankyou } from "../services/service-thankyou.js";

export function initializeThankyou(params = {}) {
    const { formId} = params;
    const salutation = document.getElementById("salutation");
    const email = document.getElementById("email");

    async function loadFormData() {
        try {
          // loadingIndicator.style.display = "flex";
          const userInfo = await serviceThankyou.getFormData(formId);

            salutation.innerHTML = `${userInfo.first_name}, thank you for submitting your Intake Form`;
            email.innerHTML = `at ${userInfo.email}`;
        } catch (error) {
        window.location.replace(`${window.location.origin}`);
          console.error("Error loading form data:", error);
        }/* finally {
          loadingIndicator.style.display = "none";
        }*/

    }

    if(formId) {
        loadFormData();
    }

}