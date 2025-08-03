import { API_URL } from "../js/constant.js";
// Mock API service for form data
export const serviceStep2 = {
    async getFormData(formId, stepId) {
        // Simulate API delay
        const response = await fetch(`${API_URL}/step-2/${formId}/${stepId}`, {
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
        if(!!file && body['preferred_format'] == 'digital') {
          formData.append('file', file);
        }
        formData.append('formId', formId);
        formData.append('stepId', stepId);
        appendFormData(formData, body);
        const response = await fetch(`${API_URL}/step-2/${formId}/${stepId}`, {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        return data.path;
    },
}; 
function appendFormData(formData, data, parentKey = "") {
    if (typeof data === "object" && data !== null) {
      if (Array.isArray(data)) {
        // Handle arrays: Convert to JSON string
        formData.append(parentKey, JSON.stringify(data));
      } else {
        // Handle nested objects: Convert to JSON string
        Object.keys(data).forEach(key => {
          appendFormData(formData, data[key], parentKey ? `${parentKey}[${key}]` : key);
        });
      }
    } else {
      // Append primitive values directly
      formData.append(parentKey, data);
    }
  }
