import { serviceStep2 } from '../services/service-step-2.js';
import { validatePhone, formatPhone, validateMedavieBluecross, formatMedavieBluecross } from '../js/utils/validation.js';
export function initializeStep2(params = {}) {
    const { formId, stepId } = params;
    const loadingIndicator = document.getElementById("loadingIndicator");
    
    // Get all form elements
    const disabilityAwardSelect = document.getElementById("disability_award");
    const awardConditionsGroup = document.getElementById("awardConditionsGroup");
    const summary_of_assesment = document.getElementById("summary_of_assesment");
    const summary_of_assesment_document = document.getElementById("summary_of_assesment_document");
    const disability_assesment = document.getElementById("disability_assesment");
    const assessmentTypesGroup = document.getElementById("assessmentTypesGroup");
    const summary_of_assesment_document_group = document.getElementById("summary_of_assesment_document_group");
    const preferred_format_group = document.getElementById("preferred_format_group");

    let pathPrevStepId = null;
    async function loadFormData() {
        try {
            loadingIndicator.style.display = 'flex';
            const {formData, prevStepId} = await serviceStep2.getFormData(formId, stepId);
            pathPrevStepId = prevStepId;
            // Populate veteran/RCMP checkboxes
            document.querySelector('input[name="veteran_is_vet"]').checked = (formData.veteran && !!formData.veteran.is_vet) || false;
            document.querySelector('input[name="veteran_is_rcmp"]').checked = (formData.rcmp && !!formData.rcmp.is_vet) || false;
            document.querySelector('input[name="active_is_vet"]').checked = (formData.veteran && !!formData.veteran.is_active) || false;
            document.querySelector('input[name="active_is_rcmp"]').checked = (formData.rcmp && !!formData.rcmp.is_active) || false;
            
            // Populate other fields
            document.getElementById('medavie_bluecross_k').value = formData.medavie_bluecross_k || '';
            document.getElementById('regiment').value = formData.regiment || '';
            
            // Handle disability award and its conditions
            disabilityAwardSelect.value = formData.disability_award || '';
            document.getElementById('disability_award_text').value = formData.disability_award_text || '';
            awardConditionsGroup.style.display = formData.disability_award == true ? 'block' : 'none';
            
            // Handle disability assessment and its types
            disability_assesment.value = formData.disability_assesment || '';
            document.getElementById('mental').checked = formData.is_disability_assesment_mental || false;
            document.getElementById('physical').checked = formData.is_disability_assesment_physical || false;
            document.getElementById('sexual').checked = formData.is_disability_assesment_sexual || false;
            assessmentTypesGroup.style.display = formData.disability_assesment == true ? 'block' : 'none';
            
            // Handle SOA and document
            summary_of_assesment.value = formData.summary_of_assesment || '';
            preferred_format_group.style.display = formData.summary_of_assesment == true ? 'block' : 'none';
            if (formData.preferred_format) {
                const selectedRadio = document.querySelector(`input[name="preferred_format"][value="${formData.preferred_format}"]`);
                if (selectedRadio) {
                    selectedRadio.checked = true; // Set the radio button as checked
                }
            } else {
              const selectedRadio = document.querySelector(`input[name="preferred_format"][value="digital"]`);
              if (selectedRadio) {
                selectedRadio.checked = true; // Set the radio button as checked
              }
            }
            const preferred_format = document.querySelector('input[name="preferred_format"]:checked') ? document.querySelector('input[name="preferred_format"]:checked').value : '';
            summary_of_assesment_document_group.style.display = formData.summary_of_assesment == true && preferred_format == 'digital' ? 'block' : 'none';
            if (formData.summary_of_assesment_document_url) {
                // Convert base64 to blob
                // const base64Response = await fetch(`data:${formData.summary_of_assesment_document.mimeType};base64,${formData.summary_of_assesment_document.data}`);
                // const blob = await base64Response.blob();
                // // Create file from blob
                // const file = new File([blob], formData.summary_of_assesment_document.originalName, { 
                //     type: formData.summary_of_assesment_document.mimeType 
                // });
                // // Use DataTransfer to set the file input
                // const dataTransfer = new DataTransfer();
                // dataTransfer.items.add(file);
                // document.getElementById('summary_of_assesment_document').files = dataTransfer.files;
                
                // Update UI
                document.querySelector('.file-chosen').textContent = formData.summary_of_assesment_document_url.originalName || 'No File Chosen';
                const clearButton = document.querySelector(".clear-file-btn");
                clearButton.style.display = formData.summary_of_assesment_document_url.originalName ? "inline-block" : "none";
                document.getElementById('summary_of_assesment_document_uploaded').value = formData.summary_of_assesment_document_url.url;
                document.getElementById('summary_of_assesment_document_uploaded').setAttribute('data-original-name', formData.summary_of_assesment_document_url.originalName);            }
            
            // Populate emergency contact info
            document.getElementById('emergency_contact_name').value = formData.emergency_contact_name || '';
            document.getElementById('emergency_contact_phone').value = formData.emergency_contact_phone || '';
            document.getElementById('emergency_contact_relation').value = formData.emergency_contact_relation || '';
            
            // Populate doctor info
            document.getElementById('family_doctor').value = formData.family_doctor || '';
            document.getElementById('family_doctor_phone').value = formData.family_doctor_phone || '';
            document.getElementById('allergies_text').value = formData.allergies_text || '';
        } catch (error) {
            window.location.replace(`${window.location.origin}`);
            console.error('Error loading form data:', error);
        } finally {
            loadingIndicator.style.display = 'none';
        }
    }
    const phoneInput = document.getElementById('emergency_contact_phone');
    if (phoneInput) {
      phoneInput.addEventListener('input', (e) => {
        const value = e.target.value;
        const formattedValue = formatPhone(value);
        e.target.value = formattedValue;
        const isValid = validatePhone(formattedValue);
        const errorElement = document.getElementById('phone-error');
        
        if (errorElement) {
          if(!isValid) {
            errorElement.textContent = 'Please enter a valid phone number';
          }
          errorElement.style.display = isValid ? 'none' : 'block';
        }
        
        e.target.classList.toggle('invalid', !isValid);
      });
    }
    const doctorPhoneInput = document.getElementById('family_doctor_phone');
    if (doctorPhoneInput) {
      doctorPhoneInput.addEventListener('input', (e) => {
        const value = e.target.value;
        const formattedValue = formatPhone(value);
        e.target.value = formattedValue;
        const isValid = validatePhone(formattedValue);
        const errorElement = document.getElementById('doctor-phone-error');
        
        if (errorElement) {
          if(!isValid) {
            errorElement.textContent = 'Please enter a valid phone number';
          }
          errorElement.style.display = isValid ? 'none' : 'block';
        }
        
        e.target.classList.toggle('invalid', !isValid);
      });
    }
    // Add form submission handler
    const form = document.getElementById('main-form');
    form.addEventListener('submit', async (e) => {
      const buttonId = e.submitter?.id;
        e.preventDefault();
        const isValidPhone = validatePhone(phoneInput.value);
        const isValidDoctorPhone = validatePhone(doctorPhoneInput.value);
        const isValidMedavieBluecross = validateMedavieBluecross(medavieInput.value);
        const isValid = validateForm();
        if(isValid || (!isValidPhone && phoneInput.value !== '') 
          || (!isValidDoctorPhone && doctorPhoneInput.value !== '') 
          || (!isValidMedavieBluecross && medavieInput.value !== '')) {
          setTimeout(() => {
            window.scrollTo(0, 'smooth');
          }, 0);
          return;
        }
        try {
            loadingIndicator.style.display = 'flex';
            const preferred_format = document.querySelector('input[name="preferred_format"]:checked') ? document.querySelector('input[name="preferred_format"]:checked').value : '';
            let formData = {
                veteran_is_vet: document.querySelector('input[name="veteran_is_vet"]').checked,
                veteran_is_rcmp: document.querySelector('input[name="veteran_is_rcmp"]').checked,
                active_is_vet: document.querySelector('input[name="active_is_vet"]').checked,
                active_is_rcmp: document.querySelector('input[name="active_is_rcmp"]').checked,
                medavie_bluecross_k: document.getElementById('medavie_bluecross_k').value,
                regiment: document.getElementById('regiment').value,
                disability_award: disabilityAwardSelect.value,
                disability_award_text: document.getElementById('disability_award_text').value,
                disability_assesment: disability_assesment.value,
                is_disability_assesment_mental: document.getElementById('mental').checked,
                is_disability_assesment_physical: document.getElementById('physical').checked,
                is_disability_assesment_sexual: document.getElementById('sexual').checked,
                summary_of_assesment: summary_of_assesment.value,
                emergency_contact_name: document.getElementById('emergency_contact_name').value,
                emergency_contact_phone: document.getElementById('emergency_contact_phone').value,
                emergency_contact_relation: document.getElementById('emergency_contact_relation').value,
                preferred_format: summary_of_assesment.value == 'true' ? preferred_format : '',
                family_doctor: document.getElementById('family_doctor').value,
                family_doctor_phone: document.getElementById('family_doctor_phone').value,
                allergies_text: document.getElementById('allergies_text').value,
            };
            if(summary_of_assesment.value == 'true' && preferred_format === 'digital' && document.getElementById('summary_of_assesment_document_uploaded').value) {
              formData.summary_of_assesment_document_url = {
                originalName: document.getElementById('summary_of_assesment_document_uploaded').getAttribute('data-original-name'),
                url: document.getElementById('summary_of_assesment_document_uploaded').value
              };
            }
            if(buttonId === 'backButton') {
              const prevPath = `/view/step-1/${formId}/${pathPrevStepId}`;
              const fileInput = document.getElementById('summary_of_assesment_document');
              const nextPath = await serviceStep2.saveFormData(formId, stepId, formData, fileInput.files.length > 0 ? fileInput.files[0] : null);
              window.navigateTo(null, prevPath);
            } else if(buttonId === 'nextButton') {
              // Handle file upload if present
              const fileInput = document.getElementById('summary_of_assesment_document');
              const nextPath = await serviceStep2.saveFormData(formId, stepId, formData, fileInput.files.length > 0 ? fileInput.files[0] : null);
              window.navigateTo(e, `/view${nextPath}`);
            }
            
        } catch (error) {
            console.error('Error saving form data:', error);
        } finally {
            loadingIndicator.style.display = 'none';
        }
    });

    // Initialize event listeners
    disabilityAwardSelect.addEventListener("change", function () {
      awardConditionsGroup.style.display = this.value == 'true' ? "block" : "none";
    });

    disability_assesment.addEventListener("change", function () {
        assessmentTypesGroup.style.display = this.value == 'true' ? "block" : "none";
    });

    summary_of_assesment.addEventListener("change", function () {
      const display = this.value == 'true' ? "block" : "none";
      preferred_format_group.style.display = display;
      if(this.value != 'true') {
        summary_of_assesment_document_group.style.display = 'none';
      } else {
        const preferred_format = document.querySelector('input[name="preferred_format"]:checked') ? document.querySelector('input[name="preferred_format"]:checked').value : '';
        summary_of_assesment_document_group.style.display = preferred_format == 'digital' ? "block" : "none";
      }
    });
    document.querySelectorAll('input[name="preferred_format"]').forEach((radio) => {
      radio.addEventListener('change', (event) => {
        const display = event.target.value == 'digital' ? "block" : "none";
        summary_of_assesment_document_group.style.display = display;
      });
    });

    const checkboxes = document.querySelectorAll(".validate-checkbox");
    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", validateCheckboxes);
    });
    const disabilityAwardText = document.getElementById('disability_award_text');
    disabilityAwardText.addEventListener("input", function() {
      if(disabilityAwardText.value !== '') {
        const awardError = document.getElementById('award-error'); // Ensure you have an error element for this
        awardError.style.display = "none"; // Show error message
      }
    });

    // Add event listener to disability assessment checkboxes
    const assessmentCheckboxes = document.querySelectorAll("#assessmentTypesGroup .assessment-types input[type='checkbox']");
    assessmentCheckboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function() {
            const assessmentError = document.getElementById('assessment-error');
            if (this.checked) {
                assessmentError.style.display = "none"; // Hide error when any checkbox is checked
            }
        });
    });

    const medavieInput = document.getElementById('medavie_bluecross_k');
    if (medavieInput) {
      medavieInput.addEventListener('input', (e) => {
        const value = e.target.value;
        if(!value) {
          const errorElement = document.getElementById('medavie-error');
          errorElement.style.display = 'none';
          e.target.classList.remove('invalid');
          return;
        }
        const formattedValue = formatMedavieBluecross(value);
        e.target.value = formattedValue;
        
        const isValid = validateMedavieBluecross(formattedValue);
        const errorElement = document.getElementById('medavie-error');
        
        if (errorElement) {
          errorElement.style.display = isValid ? 'none' : 'block';
        }
        
        e.target.classList.toggle('invalid', !isValid);
      });
    }

    // Initialize file upload
    uploadFile();

    // Load form data if we have formId and stepId
    if (formId && stepId) {
        loadFormData();
    }
}

function validateCheckboxes() {
  const veteranIsVet = document.querySelector('input[name="veteran_is_vet"]');
  const veteranIsRcmp = document.querySelector('input[name="veteran_is_rcmp"]');
  const activeIsVet = document.querySelector('input[name="active_is_vet"]');
  const activeIsRcmp = document.querySelector('input[name="active_is_rcmp"]');

  const errorElement = document.getElementById("checkbox-error");
  const iconError = document.getElementById("icon-error");

  if (!veteranIsVet.checked && !veteranIsRcmp.checked && !activeIsVet.checked && !activeIsRcmp.checked) {
    if (errorElement) {
      errorElement.style.display = "block";
    }
    if (iconError) {
      iconError.classList.add("required");
    }
  } else {
    if (errorElement) {
      errorElement.style.display = "none";
    }
    if (iconError) {
      iconError.classList.remove("required");
    }
  }
}

function uploadFile() {
  const fileInput = document.getElementById("summary_of_assesment_document");
  const fileChosen = document.querySelector(".file-chosen");
  const chooseFileBtn = document.querySelector(".choose-file-btn");
  const hintMessage = document.getElementById("summary_of_assesment_document-size-hint");
  const clearButton = document.querySelector(".clear-file-btn");
  const errorMessage = document.getElementById("document-error");
  chooseFileBtn.addEventListener("click", () => {
    fileInput.click();
  });

  fileInput.addEventListener("change", function () {
    if (this.files.length > 0) {
      const file = this.files[0];
      const maxSize = parseInt(this.dataset.maxSize);

      if (file.size > maxSize) {
        hintMessage.style.color = "#ed0131";
        this.value = ""; // Clear the file input
        fileChosen.textContent = "No File Chosen";
      } else {
        if(!!errorMessage) {
          errorMessage.style.display = "none";
        }
        clearButton.style.display = "inline-block";
        hintMessage.style.color = "#666";
        fileChosen.textContent = file.name;
      }
    } else {
      clearButton.style.display = "none";
      fileChosen.textContent = "No File Chosen";
      errorMessage.style.display = "none";
    }
  });
  // Clear file when clear button is clicked
  clearButton.addEventListener("click", function () {
    fileInput.value = "";
    fileChosen.textContent = "No File Chosen";
    this.style.display = "none";
    document.getElementById('summary_of_assesment_document_uploaded').value = '';
    document.getElementById('summary_of_assesment_document_uploaded').setAttribute('data-original-name', '');
  });
}

function validateForm() {
  const requiredFields = [
    "veteran_is_vet",
    "veteran_is_rcmp",
    "active_is_vet",
    "active_is_rcmp",
  ];
  const errors = {};
  for (const field of requiredFields) {
    const input = document.querySelector(`input[name="${field}"]`);
    if (!input || !input.checked) {
      errors[field] = `Error`;
    }
  }
  
  // Check if disability_assesment is true and at least one checkbox is selected
  const disability_assessment = document.getElementById('disability_assesment').value;
  if (disability_assessment == 'true') {
    const mentalChecked = document.getElementById('mental').checked;
    const physicalChecked = document.getElementById('physical').checked;
    const sexualChecked = document.getElementById('sexual').checked;

    if (!mentalChecked && !physicalChecked && !sexualChecked) {
      errors['disability_assessment'] = `Error`;
      const assessmentError = document.getElementById('assessment-error');
      assessmentError.style.display = "block"; // Show error message
    }
  }

  // Check if disability_award is "true" and disability_award_text is not selected
  const disabilityAward = document.getElementById('disability_award').value;
  const disabilityAwardText = document.getElementById('disability_award_text').value;
  if (disabilityAward === 'true' && !disabilityAwardText) {
    errors['disability_award_text'] = `Please select a condition for your award.`;
    const awardError = document.getElementById('award-error'); // Ensure you have an error element for this
    awardError.style.display = "block"; // Show error message
  }
  const selectedRadio = document.querySelector('input[name="preferred_format"]:checked');
  const summary_of_assesment = document.getElementById('summary_of_assesment');
  const summary_of_assesment_document = document.getElementById('summary_of_assesment_document');
  const summary_of_assesment_document_uploaded = document.getElementById('summary_of_assesment_document_uploaded');
  if(!!summary_of_assesment.value && selectedRadio && selectedRadio.value === 'digital' && summary_of_assesment_document.files.length === 0 && !summary_of_assesment_document_uploaded.value) {
    errors['summary_of_assesment_document'] = `Error`;
    const documentError = document.getElementById('document-error');
    documentError.style.display = "block";
  }
  if(errors['veteran_is_vet'] && errors['veteran_is_rcmp'] && errors['active_is_vet'] && errors['active_is_rcmp']) {
    const input = document.getElementById('checkbox-table');
    const errorSpan = input.nextElementSibling;
    const errorRequire = input.previousElementSibling;
    if(errorSpan) {
      errorSpan.textContent = `Please select at least one option`;
      errorSpan.style.display = "block";
    }
    if(errorRequire) {
      errorRequire.querySelector("span").classList.add("required");
    }
  }
  if ((errors['veteran_is_vet'] && errors['veteran_is_rcmp'] && errors['active_is_vet'] && errors['active_is_rcmp']) || (errors['summary_of_assesment_document']) || (errors['disability_assessment']) || (errors['disability_award_text'])) {
    return true;
  }
  return false;
}


// function downloadFile(file) {
//     const url = URL.createObjectURL(file);
//     const a = document.createElement('a');
//     a.href = url;
//     a.download = file.name;
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     URL.revokeObjectURL(url); // Clean up the URL object
// }