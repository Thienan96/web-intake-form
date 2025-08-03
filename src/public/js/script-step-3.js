import { serviceStep3 } from "../services/service-step-3.js";

export function initializeStep3(params = {}) {
  const { formId, stepId } = params;
  const loadingIndicator = document.getElementById("loadingIndicator");

  const infectionsOtherTextInput = document.getElementById(
    "infections_other_text"
  );
  const mentalOtherTextInput = document.getElementById("mental_other_text");
  const muscularOtherInput = document.getElementById("muscular_other_text");
  const infectionsOther = document.getElementById("infections_other");
  const mentalOther = document.getElementById("mental_other");
  const muscularOther = document.getElementById("muscular_other");
  let pathPrevStepId = null;
  async function loadFormData() {
    try {
      loadingIndicator.style.display = "flex";
      const { formData, gender, prevStepId } = await serviceStep3.getFormData(
        formId,
        stepId
      );
      pathPrevStepId = prevStepId;
      // Populate General section
      document.querySelector('input[name="general_fainting"]').checked =
        formData.general?.is_fainting || false;
      document.querySelector('input[name="general_headache"]').checked =
        formData.general?.is_headache || false;
      document.querySelector('input[name="general_nervousness"]').checked =
        formData.general?.is_nervousness || false;
      document.querySelector('input[name="general_numbness"]').checked =
        formData.general?.is_numbness || false;
      document.querySelector('input[name="general_paralysis"]').checked =
        formData.general?.is_paralysis || false;

      // Populate Infections section
      document.querySelector('input[name="infections_athletes_foot"]').checked =
        formData.infections?.is_athlete_foot || false;
      document.querySelector('input[name="infections_hepatitis"]').checked =
        formData.infections?.is_hepatitis || false;
      document.querySelector('input[name="infections_hiv"]').checked =
        formData.infections?.is_hiv || false;
      document.querySelector('input[name="infections_tuberculosis"]').checked =
        formData.infections?.is_tuberculosis || false;
      document.querySelector('input[name="infections_herpes"]').checked =
        formData.infections?.is_herpes || false;
      document.querySelector('input[name="infections_warts"]').checked =
        formData.infections?.is_warts || false;
      infectionsOther.checked = formData.infections?.other_text || false;
      infectionsOtherTextInput.value = formData.infections?.other_text || "";
      infectionsOtherTextInput.style.display = infectionsOther.checked
        ? "block"
        : "none";

      // Populate Gastrointestinal section
      document.querySelector('input[name="gi_colitis"]').checked =
        formData.gastrointestinal?.is_colitis || false;
      document.querySelector('input[name="gi_diabetes"]').checked =
        formData.gastrointestinal?.is_diabetes || false;
      document.querySelector('input[name="gi_gout"]').checked =
        formData.gastrointestinal?.is_gout || false;
      document.querySelector('input[name="gi_nausea"]').checked =
        formData.gastrointestinal?.is_nausea || false;
      document.querySelector('input[name="gi_ulcers"]').checked =
        formData.gastrointestinal?.is_ulcers || false;

      // Populate Mental Health section
      document.querySelector('input[name="mental_ptsd"]').checked =
        formData.mental?.is_ptsd || false;
      document.querySelector('input[name="mental_depression"]').checked =
        formData.mental?.is_depression || false;
      document.querySelector('input[name="mental_anxiety"]').checked =
        formData.mental?.is_anxiety || false;
      mentalOther.checked = formData.mental?.other_text || false;
      mentalOtherTextInput.value = formData.mental?.other_text || "";
      mentalOtherTextInput.style.display = mentalOther.checked
        ? "block"
        : "none";

      // Populate Musculoskeletal section
      document.querySelector('input[name="muscular_arthritis"]').checked =
        formData.musculoskeletal?.is_arthritis || false;
      document.querySelector('input[name="muscular_bursitis"]').checked =
        formData.musculoskeletal?.is_bursitis || false;
      document.querySelector('input[name="muscular_cancer"]').checked =
        formData.musculoskeletal?.is_cancer || false;
      document.querySelector('input[name="muscular_fibromyalgia"]').checked =
        formData.musculoskeletal?.is_fibromyalgia || false;
      document.querySelector('input[name="muscular_ms"]').checked =
        formData.musculoskeletal?.is_multiple_sclerosis || false;
      document.querySelector('input[name="muscular_osteoporosis"]').checked =
        formData.musculoskeletal?.is_osteoporosis || false;
      document.querySelector('input[name="muscular_pins"]').checked =
        formData.musculoskeletal?.is_pins_plates || false;
      muscularOther.checked = formData.musculoskeletal?.other_text || false;
      muscularOtherInput.value = formData.musculoskeletal?.other_text || "";
      muscularOtherInput.style.display = muscularOther.checked
        ? "block"
        : "none";

      // Populate gender-specific options
      const genderSpecificOptions = document.getElementById(
        "gender-specific-options"
      );
      const genderSpecificTitle = document.getElementById(
        "gender-specific-title"
      );
      if (gender === "male") {
        genderSpecificTitle.innerHTML = "Male Health";
        genderSpecificOptions.innerHTML = `
                    <label><input type="checkbox" name="gender_erectile" ${
                      formData.sexual?.is_erectile_dysfunction ? "checked" : ""
                    }> Erectile Dysfunction</label>
                    <label><input type="checkbox" name="gender_prostate" ${
                      formData.sexual?.is_prostate ? "checked" : ""
                    }> Prostate</label>
                `;
      } else {
        genderSpecificTitle.innerHTML = "Female Health";
        genderSpecificOptions.innerHTML = `
                    <label><input type="checkbox" name="gender_pregnant" ${
                      formData.sexual?.is_pregnant ? "checked" : ""
                    }> Pregnant</label>
                    <label><input type="checkbox" name="gender_sexual" ${
                      formData.sexual?.is_sexual_dysfunction ? "checked" : ""
                    }> Sexual Dysfunction</label>
                `;
      }
    } catch (error) {
      window.location.replace(`${window.location.origin}`);
      console.error("Error loading form data:", error);
    } finally {
      loadingIndicator.style.display = "none";
    }
  }

  // Add form submission handler
  const form = document.getElementById("main-form");
  form.addEventListener("submit", async (e) => {
    const buttonId = e.submitter?.id;
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setTimeout(() => {
        window.scrollTo(0, "smooth");
      }, 0);
      return;
    }

    try {
      loadingIndicator.style.display = "flex";

      const formData = {
        general: {
          is_fainting: document.querySelector('input[name="general_fainting"]')
            .checked,
          is_headache: document.querySelector('input[name="general_headache"]')
            .checked,
          is_nervousness: document.querySelector(
            'input[name="general_nervousness"]'
          ).checked,
          is_numbness: document.querySelector('input[name="general_numbness"]')
            .checked,
          is_paralysis: document.querySelector(
            'input[name="general_paralysis"]'
          ).checked,
        },
        infections: {
          is_athlete_foot: document.querySelector(
            'input[name="infections_athletes_foot"]'
          ).checked,
          is_hepatitis: document.querySelector(
            'input[name="infections_hepatitis"]'
          ).checked,
          is_hiv: document.querySelector('input[name="infections_hiv"]')
            .checked,
          is_tuberculosis: document.querySelector(
            'input[name="infections_tuberculosis"]'
          ).checked,
          is_herpes: document.querySelector('input[name="infections_herpes"]')
            .checked,
          is_warts: document.querySelector('input[name="infections_warts"]')
            .checked,
          is_other: infectionsOther.checked,
          other_text: infectionsOtherTextInput.value,
        },
        gastrointestinal: {
          is_colitis: document.querySelector('input[name="gi_colitis"]')
            .checked,
          is_diabetes: document.querySelector('input[name="gi_diabetes"]')
            .checked,
          is_gout: document.querySelector('input[name="gi_gout"]').checked,
          is_nausea: document.querySelector('input[name="gi_nausea"]').checked,
          is_ulcers: document.querySelector('input[name="gi_ulcers"]').checked,
        },
        mental: {
          is_ptsd: document.querySelector('input[name="mental_ptsd"]').checked,
          is_depression: document.querySelector(
            'input[name="mental_depression"]'
          ).checked,
          is_anxiety: document.querySelector('input[name="mental_anxiety"]')
            .checked,
          is_other: mentalOther.checked,
          other_text: mentalOtherTextInput.value,
        },
        musculoskeletal: {
          is_arthritis: document.querySelector(
            'input[name="muscular_arthritis"]'
          ).checked,
          is_bursitis: document.querySelector('input[name="muscular_bursitis"]')
            .checked,
          is_cancer: document.querySelector('input[name="muscular_cancer"]')
            .checked,
          is_fibromyalgia: document.querySelector(
            'input[name="muscular_fibromyalgia"]'
          ).checked,
          is_multiple_sclerosis: document.querySelector(
            'input[name="muscular_ms"]'
          ).checked,
          is_osteoporosis: document.querySelector(
            'input[name="muscular_osteoporosis"]'
          ).checked,
          is_pins_plates: document.querySelector('input[name="muscular_pins"]')
            .checked,
          is_other: muscularOther.checked,
          other_text: muscularOtherInput.value,
        },
        sexual: {
          is_erectile_dysfunction:
            document.querySelector('input[name="gender_erectile"]')?.checked ||
            false,
          is_prostate:
            document.querySelector('input[name="gender_prostate"]')?.checked ||
            false,
          is_pregnant:
            document.querySelector('input[name="gender_pregnant"]')?.checked ||
            false,
          is_sexual_dysfunction:
            document.querySelector('input[name="gender_sexual"]')?.checked ||
            false,
        },
      };
      if(buttonId === 'backButton') {
        const prevPath = `/view/step-2/${formId}/${pathPrevStepId}`;
        await serviceStep3.saveFormData(
          formId,
          stepId,
          formData
        );
        window.navigateTo(null, prevPath);
      } else if(buttonId === 'nextButton') {
        const nextPath = await serviceStep3.saveFormData(
          formId,
          stepId,
          formData
        );
        window.navigateTo(e, `/view${nextPath}`);
      }
    } catch (error) {
      console.error("Error saving form data:", error);
    } finally {
      loadingIndicator.style.display = "none";
    }
  });

  // Initialize event listeners for "Other" fields
  [infectionsOtherTextInput, mentalOtherTextInput, muscularOtherInput].forEach(
    (input) => {
      if (input) {
        input.addEventListener("input", () => clearError(input));
      }
    }
  );

  infectionsOther.addEventListener("change", () => {
    infectionsOtherTextInput.style.display = infectionsOther.checked
      ? "block"
      : "none";
  });
  mentalOther.addEventListener("change", () => {
    mentalOtherTextInput.style.display = mentalOther.checked ? "block" : "none";
  });
  muscularOther.addEventListener("change", () => {
    muscularOtherInput.style.display = muscularOther.checked ? "block" : "none";
  });

  // Load form data if we have formId and stepId
  if (formId && stepId) {
    loadFormData();
  }
}

function clearError(input) {
  const errorSpan = input.nextElementSibling;
  if (errorSpan && errorSpan.classList.contains("error-message")) {
    errorSpan.style.display = "none";
  }
}

function validateForm() {
  const errors = {};

  // Validate "Other" text inputs when their checkboxes are checked
  if (
    document.getElementById("infections_other").checked &&
    !document.getElementById("infections_other_text").value
  ) {
    errors.infections_other_text = true;
    document.getElementById(
      "infections_other_text"
    ).nextElementSibling.style.display = "block";
  }

  if (
    document.getElementById("mental_other").checked &&
    !document.getElementById("mental_other_text").value
  ) {
    errors.mental_other_text = true;
    document.getElementById(
      "mental_other_text"
    ).nextElementSibling.style.display = "block";
  }

  if (
    document.getElementById("muscular_other").checked &&
    !document.getElementById("muscular_other_text").value
  ) {
    errors.muscular_other_text = true;
    document.getElementById(
      "muscular_other_text"
    ).nextElementSibling.style.display = "block";
  }

  return Object.keys(errors).length > 0;
}
