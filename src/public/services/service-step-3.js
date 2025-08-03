import { API_URL } from "../js/constant.js";
// Mock API service for form data
export const serviceStep3 = {
    async getFormData(formId, stepId) {
        // Simulate API delay
        const response = await fetch(`${API_URL}/step-3/${formId}/${stepId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data;
    },

    async saveFormData(formId, stepId, formData) {
        const response = await fetch(`${API_URL}/step-3/${formId}/${stepId}`, {
            method: 'POST',
            headers: {
              "Content-Type": "application/json"
          },
            body: JSON.stringify(formData)
        });
        const data = await response.json();
        return data.path;
    }
}; 