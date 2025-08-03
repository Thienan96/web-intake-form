import { serviceStep4 } from '../services/service-step-4.js';

export function initializeStep4(params = {}) {
    const { formId, stepId } = params;
    const loadingIndicator = document.getElementById("loadingIndicator");
    const form = document.getElementById('main-form');
    let pathPrevStepId = null;
    async function loadFormData() {
        try {
            loadingIndicator.style.display = 'flex';
            const {formData, prevStepId} = await serviceStep4.getFormData(formId, stepId);
            pathPrevStepId = prevStepId;
            // Populate all pain level selects
            const painLevels = [
                'is_neck_spine', 'is_shoulders', 
                'is_elbow', 'is_wrist_hand', 'is_hip_pelvis',
                'is_groin', 'is_knee',
                'is_foot_ankle'
            ];

            painLevels.forEach(location => {
                const input = document.querySelector(`input[type="checkbox"][name=${location}]`);
                if (input && formData[`${location}`]) {
                    input.checked = formData[`${location}`];
                }
            });
        } catch (error) {
            window.location.replace(`${window.location.origin}`);
            console.error('Error loading form data:', error);
        } finally {
            loadingIndicator.style.display = 'none';
        }
    }

    // Add form submission handler
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const buttonId = e.submitter?.id;
        try {
            loadingIndicator.style.display = 'flex';
            
            const formData = {};
            const painLevels = [
                'is_neck_spine', 'is_shoulders', 
                'is_elbow', 'is_wrist_hand', 'is_hip_pelvis',
                'is_groin', 'is_knee',
                'is_foot_ankle'
            ];

            painLevels.forEach(location => {
                const input = document.querySelector(`input[type="checkbox"][name=${location}]`);
                if (input) {
                    formData[`${location}`] = !!input.checked;
                }
            });
            if(buttonId === 'backButton') {
              const prevPath = `/view/step-3/${formId}/${pathPrevStepId}`;
              await serviceStep4.saveFormData(formId, stepId, formData);
              window.navigateTo(null, prevPath);
            } else if(buttonId === 'nextButton') {
              const nextPath = await serviceStep4.saveFormData(formId, stepId, formData);
              window.navigateTo(e, `/view${nextPath}`);
            }
            
        } catch (error) {
            console.error('Error saving form data:', error);
        } finally {
            loadingIndicator.style.display = 'none';
        }
    });

    // Initialize the connector lines
    const svg = document.querySelector('.connector-lines');
    const painPoints = document.querySelectorAll('.pain-point');
    const gap = 15.5;

    function drawConnectorLines() {
        svg.innerHTML = '';
        
        painPoints.forEach(point => {
            const labelId = point.getAttribute('data-label');
            const label = document.getElementById(labelId);
            
            if (label) {
                const pointRect = point.getBoundingClientRect();
                const svgRect = svg.getBoundingClientRect();
                const labelRect = label.getBoundingClientRect();
                
                const x1 = pointRect.left - svgRect.left + (pointRect.width / 2);
                const y1 = pointRect.top - svgRect.top + (pointRect.height / 2);
                const x2 = labelRect.left - svgRect.left;
                const y2 = labelRect.top - svgRect.top + (labelRect.height / 2 + gap);
                
                const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                line.setAttribute('x1', x1);
                line.setAttribute('y1', y1);
                line.setAttribute('x2', x2);
                line.setAttribute('y2', y2);
                line.setAttribute('stroke', '#666');
                line.setAttribute('stroke-width', '1');
                
                svg.appendChild(line);
            }
        });
    }
    const bodyImage = document.getElementById('body-image');
    bodyImage.addEventListener('load', () => {
        setTimeout(drawConnectorLines);
    });
    window.addEventListener('resize', drawConnectorLines);

    // Load form data if we have formId and stepId
    if (formId && stepId) {
        loadFormData();
    }
}