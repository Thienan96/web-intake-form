import { API_URL } from "../js/constant.js";
// Mock API service for form data
export const serviceStep6 = {
    async getFormData(formId, stepId) {
        // Simulate API delay
        const response = await fetch(`${API_URL}/step-6/${formId}/${stepId}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
        return data;
    },
    async saveFormData(formId, stepId, body, file) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('is_no_replacement_for_physician_consent', body['is_no_replacement_for_physician_consent']);
        formData.append('is_no_replacement_for_physician_consent_initial', body['is_no_replacement_for_physician_consent_initial']);
        const response = await fetch(`${API_URL}/step-6/${formId}/${stepId}`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data;
    },
}; 