import { serviceStep6 } from "../services/service-step-6.js";

export function initializeStep6(params = {}) {
    const { formId, stepId } = params;
    const form = document.getElementById("main-form");
    const loadingIndicator = document.getElementById("loadingIndicator");
    const canvas = document.getElementById("signatureCanvas");
    const clearButton = document.getElementById('clear-signature');
    const ctx = canvas.getContext("2d");
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let pathPrevStepId = null;
    async function loadFormData() {
        try {
          loadingIndicator.style.display = "flex";
          const { formData, prevStepId } = await serviceStep6.getFormData(
            formId,
            stepId
          );
          pathPrevStepId = prevStepId;
        } catch (error) {
        window.location.replace(`${window.location.origin}`);
          console.error("Error loading form data:", error);
        } finally {
          loadingIndicator.style.display = "none";
        }
    }
    const backButton = document.getElementById("backButton");
    if (backButton) {
      backButton.addEventListener("click", () => {
        const prevPath = `/view/step-5/${formId}/${pathPrevStepId}`;
        window.navigateTo(null, prevPath);
      });
    }

    if(formId && stepId) {
        loadFormData();
    }
    
    function initializeCanvas() {
        if(!canvas) return;
        // Set canvas size based on parent container
        const rect = canvas.parentElement.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = 150;
        
        // Set drawing style
        ctx.strokeStyle = "#000000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
    }

    function getCoordinates(e) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;

        if (e.touches && e.touches[0]) {
            return {
                x: (e.touches[0].clientX - rect.left) * scaleX,
                y: (e.touches[0].clientY - rect.top) * scaleY
            };
        }
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }

    function startDrawing(e) {
        isDrawing = true;
        const coords = getCoordinates(e);
        lastX = coords.x;
        lastY = coords.y;
    }

    function draw(e) {
        if (!isDrawing) return;
        
        const coords = getCoordinates(e);
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        ctx.lineTo(coords.x, coords.y);
        ctx.stroke();
        
        lastX = coords.x;
        lastY = coords.y;
    }

    function stopDrawing() {
        if (!isDrawing) return;
        isDrawing = false;
        const errorMessage = document.getElementById("checkbox-error");
        if(errorMessage) {
            errorMessage.style.display = "none";
        }
        // Save signature data to hidden input
        const signatureInput = document.getElementById('signature');
        if (signatureInput) {
            signatureInput.value = canvas.toDataURL();
        }
    }

    function clearSignature() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const signatureInput = document.getElementById('signature');
        if (signatureInput) {
            signatureInput.value = '';
        }
    }

    // Initialize canvas
    initializeCanvas();
    window.addEventListener('resize', initializeCanvas);

    // Mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);

    // Touch events
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        startDrawing(e);
    });
    
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        draw(e);
    });
    
    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        stopDrawing();
    });
    if(clearButton) {
        clearButton.addEventListener('click', clearSignature);
    }
    // Add clear button
    // const clearButton = document.createElement('button');
    // clearButton.type = 'button';
    // clearButton.className = 'clear-signature';
    // clearButton.textContent = 'Clear';
    // canvas.parentElement.appendChild(clearButton);
    // clearButton.addEventListener('click', clearSignature);

    function downloadCanvas() {
        var imageData = canvas.toDataURL("image/png");
        const file = dataURLtoFile(imageData, "signature.png");
        return file;
    }

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const buttonId = e.submitter?.id;
        const isValid = validateForm();
        if (isValid) {
        setTimeout(() => {
            window.scrollTo(0, "smooth");
        }, 0);
        return;
        }
        const isConsentChecked = document.querySelector(
            `input[type="checkbox"][name="is_no_replacement_for_physician_consent"]`
        );
        const initialInput = document.getElementById("is_no_replacement_for_physician_consent_initial");
        await serviceStep6.saveFormData(
            formId,
            stepId,
            {
                is_no_replacement_for_physician_consent: isConsentChecked.checked,
                is_no_replacement_for_physician_consent_initial: initialInput.value,
            },
            downloadCanvas()
          );
          callWebhook(formId);
          window.navigateTo(e, "/view/thank-you/" + formId);
    });
    const initialInput = document.getElementById("is_no_replacement_for_physician_consent_initial");
    initialInput.addEventListener("input", (e) => {
        if(!e.target.value) {
            displayError(initialInput, `Please enter your Initial`)
        } else {
            clearError(initialInput)
        }
    });
}
function clearError(input) {
    const errorSpan = input.nextElementSibling;
    const errorRequire = input.previousElementSibling;
    input.classList.remove("invalid");
    if (errorSpan && errorSpan.classList.contains("error-message")) {
      errorSpan.style.display = "none";
    }
    if (errorRequire && errorRequire.querySelector("span")) {
      errorRequire.querySelector("span").classList.remove("required");
    }
  }
function dataURLtoFile(dataurl, filename) {
    let arr = dataurl.split(',');
    let mime = arr[0]?.match(/:(.*?);/) ? [1] : ' ';
    let bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime});
}
function validateForm() {
    let requiredFields = [
        ["is_no_replacement_for_physician_consent_initial", "Inital"],
      ];
      const errors = {};
      for (const [field, label] of requiredFields) {
        const input = document.getElementById(field);
        if (!input || !input.value) {
            displayError(input, `Please enter your ${label}`)
          errors[field] = `Error`;
        }
      }
    const isConsentChecked = document.querySelector(
        `input[type="checkbox"][name="is_no_replacement_for_physician_consent"]`
    );
    const signatureInput = document.getElementById("signature");
    if(!signatureInput.value) {
        const errorMessage = document.getElementById("checkbox-error");
        if(errorMessage) {
            errorMessage.style.display = "block";
        }
    }
    return !isConsentChecked.checked || !signatureInput.value || errors['is_no_replacement_for_physician_consent_initial'];
}

function displayError(input, message) {
    const errorSpan = input.nextElementSibling;
    const errorRequire = input.previousElementSibling;
    input.classList.add("invalid");
    if(errorSpan) {
        errorSpan.textContent = message;
        errorSpan.style.display = "block";
    }
    if(errorRequire) {
        errorRequire.querySelector("span").classList.add("required");
    }
}