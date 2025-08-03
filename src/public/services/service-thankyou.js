import {API_URL} from "../js/constant.js";

// API service for thank you page
export const serviceThankyou = {

    async getFormData(formId) {
        // Get basic user info
        const response = await fetch(`${API_URL}/step-thankyou/${formId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });

        return await response.json();
    }
};