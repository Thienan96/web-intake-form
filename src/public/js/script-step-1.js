import { serviceStep1 } from "../services/service-step-1.js";
import {
  validatePhone,
  formatPhone,
  validatePostal,
  formatPostCode,
} from "../js/utils/validation.js";

// Add export to make this a proper module
export function initializeStep1(params = {}, queryParams = {}) {
  const { formId, stepId } = params;
  const firstNameInput = document.getElementById("first_name");
  const firstLastInput = document.getElementById("last_name");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");
  const address_1Input = document.getElementById("address_1");
  const address_2Input = document.getElementById("address_2");
  const city = document.getElementById("city");
  const year = document.getElementById("year");
  const month = document.getElementById("month");
  const day = document.getElementById("day");
  const provinceInput = document.getElementById("province");
  const postalInput = document.getElementById("postal");
  const addressLookupInput = document.getElementById("addressLookup");
  const addressSearch = document.getElementById("address-search");
  const loadingIndicator = document.getElementById("loadingIndicator");
  const genderInput = document.getElementById("gender");
  const referrerOption = document.getElementById("referrer_option"); // Assuming this is the select element for referrer options
  const referrerTextDiv = document.getElementById("referrer_text_div"); // The div containing the input field
  const referrerText = document.getElementById("referrer_text"); // The div containing the input field
  const devIndicator = document.getElementById("env-dev-indicator"); // Span contains the label indicating that the server is in the DEV mode

  // Regular input error clearing
  [
    firstNameInput,
    firstLastInput,
    phoneInput,
    emailInput,
    address_1Input,
    provinceInput,
    postalInput,
    city,
    year,
    month,
    day,
    genderInput,
  ].forEach((input) => {
    if (input) {
      input.addEventListener("input", () => clearError(input));
      input.addEventListener("blur", () => showError(input));
    }
  });

  // Special handling for birthday inputs
  [year, month, day].forEach((input) => {
    if (input) {
      input.addEventListener("change", () => {
        clearError(input);
        checkBirthdayInputs();
      });
    }
  });
  function updateDays() {
    const yearSelect = parseInt(year.value);
    const monthSelect = parseInt(month.value);
    const selectedDay = day.getAttribute("data-value");

    if (!yearSelect || !monthSelect) return;

    // Get number of days in the selected month
    const daysInMonth = new Date(yearSelect, monthSelect, 0).getDate();

    // Store previously selected day
    const previousDay = day.value ? parseInt(day.value) : parseInt(selectedDay);

    // Clear current options
    day.innerHTML = '<option value="">Day</option>';

    // Populate new day options
    for (let i = 1; i <= daysInMonth; i++) {
      let option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      if (i === previousDay) option.selected = true;
      day.appendChild(option);
    }
  }
  function computeYear() {
    const currentYear = new Date().getFullYear();
    const minYear = currentYear - 120;
    const selectedYear = year.getAttribute("data-value");
    for (let i = currentYear; i >= minYear; i--) {
      let option = document.createElement("option");
      option.value = i;
      option.textContent = i;
      if (!!selectedYear && selectedYear == i) {
        option.selected = true;
      }
      year.appendChild(option);
    }
  }

  // Listen for changes
  year.addEventListener("change", updateDays);
  month.addEventListener("change", updateDays);
  referrerTextDiv.style.display = "none";
  referrerOption.addEventListener("change", function () {
    referrerTextDiv.style.display =
      referrerOption.value === "other" ? "block" : "none";
  });
  computeYear();
  updateDays();

  async function loadFormData() {
    try {
      loadingIndicator.style.display = "flex";
      const data = await serviceStep1.getFormData(formId, stepId);

      // Populate form fields
      firstNameInput.value = data.first_name || "";
      firstLastInput.value = data.last_name || "";
      phoneInput.value = data.phone || "";
      emailInput.value = data.email || "";
      address_1Input.value = data.address_1 || "";
      address_2Input.value = data.address_2 || "";
      city.value = data.city || "";
      provinceInput.value = data.province || "";
      postalInput.value = data.postal || "";
      addressLookupInput.value = data.addressLookup || "";
      // Set birthday values
      if (data.birthday) {
        year.value = new Date(data.birthday).getFullYear();
        month.value = new Date(data.birthday).getMonth() + 1;
        updateDays(); // Update days based on year/month
        day.value = new Date(data.birthday).getDate();
      }

      // Set gender
      if (data.gender) {
        genderInput.value = data.gender;
      }
      if (data.province) {
        provinceInput.value = data.province;
      }

      // Set checkbox
      document.getElementById("is_voicemail_consent").checked =
        data.is_voicemail_consent || false;

      // Set referrer info
      referrerOption.value = data.referrer_option;
      referrerText.value = data.referrer_text || "";
      referrerTextDiv.style.display =
        referrerOption.value === "other" ? "block" : "none";
    } catch (error) {
      window.location.replace(`${window.location.origin}`);
      console.error("Error loading form data:", error);
    } finally {
      loadingIndicator.style.display = "none";
    }
  }

  // Handle form submission
  const form = document.getElementById("main-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const isInValid = validateForm();
    const isValidPhone = validatePhone(phoneInput.value);
    const isValidPostal = validatePostal(postalInput.value);
    if (isInValid || !isValidPhone || !isValidPostal) {
      setTimeout(() => {
        window.scrollTo(0, "smooth");
      }, 0);
      return;
    }
    try {
      loadingIndicator.style.display = "flex";

      // Collect form data
      const formData = {
        first_name: firstNameInput.value,
        last_name: firstLastInput.value,
        year: year.value,
        month: month.value,
        day: day.value,
        gender: document.getElementById("gender").value,
        phone: phoneInput.value,
        is_voicemail_consent: document.getElementById("is_voicemail_consent")
          .checked,
        email: emailInput.value,
        addressLookup: addressLookupInput.value,
        address_1: address_1Input.value,
        address_2: address_2Input.value,
        city: city.value,
        province: provinceInput.value,
        postal: postalInput.value,
        referrer_option: referrerOption.value,
        referrer_text:
          referrerOption.value === "other" ? referrerText.value : "",
        parameters: queryParams,
      };

      // Pass the formId to the API if it exists
      const nextPath = await serviceStep1.saveFormData(
        formId,
        stepId,
        formData
      );
      window.navigateTo(e, `/view${nextPath}`);
    } catch (error) {
      console.error("Error saving form data:", error);
    } finally {
      loadingIndicator.style.display = "none";
    }
  });

  if (phoneInput) {
    phoneInput.addEventListener("input", (e) => {
      const value = e.target.value;
      const formattedValue = formatPhone(value);
      e.target.value = formattedValue;

      const isValid = validatePhone(formattedValue);
      const errorElement = document.getElementById("phone-error");

      if (errorElement) {
        if (!isValid) {
          errorElement.textContent = "Please enter a valid phone number";
        }
        errorElement.style.display = isValid ? "none" : "block";
      }

      e.target.classList.toggle("invalid", !isValid);
    });
    if (postalInput) {
      postalInput.addEventListener("input", (e) => {
        const value = e.target.value;
        const formattedValue = formatPostCode(value);
        e.target.value = formattedValue;
        const isValid = validatePostal(formattedValue);
        const errorElement = document.getElementById("postal-error");
        if (errorElement) {
          if (!isValid) {
            errorElement.textContent = "Please enter a valid postal code";
          }
          errorElement.style.display = isValid ? "none" : "block";
        }
        e.target.classList.toggle("invalid", !isValid);
      });
    }
  }

  // Load initial data
  if (formId && stepId) {
    loadFormData();
  }
  initAutocomplete();
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

function showError(input) {
  validateForm([input.name]);
}

function checkBirthdayInputs() {
  const year = document.getElementById("year");
  const month = document.getElementById("month");
  const day = document.getElementById("day");
  const birthdayInput = document.getElementById("birthday-inputs");
  if (year.value && month.value && day.value) {
    // If all birthday fields are filled
    clearError(birthdayInput);
  }
}
function initAutocomplete() {
  const addressInput = document.getElementById("addressLookup");
  const suggestionsContainer = document.getElementById("address-suggestions");

  const autocomplete = new google.maps.places.Autocomplete(addressInput, {
    types: ["address"], // Specify the type of place
    componentRestrictions: { country: ["ca"] }, // Restrict to US and Canada
  });

  // Listen for place changes
  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (place && place.formatted_address) {
      addressInput.value = place.formatted_address;

      const addressComponents = place.address_components;
      const addressField = document.getElementById("address_1");
      const unitField = document.getElementById("address_2");
      const cityField = document.getElementById("city");
      const provinceField = document.getElementById("province");
      const postalField = document.getElementById("postal");

      addressField.value = "";
      unitField.value = "";
      cityField.value = "";
      provinceField.value = "";
      postalField.value = "";


      addressComponents.forEach((component) => {
        const componentType = component.types[0];
        switch (componentType) {
          case "street_number":
            addressField.value += component.long_name + " "; 
            break;
          case "route":
            addressField.value += component.long_name;
            break;
          case "locality":
            cityField.value = component.long_name;
            break;
          case "administrative_area_level_1":
            provinceField.value = component.short_name;
            break;
          case "postal_code":
            postalField.value = component.long_name;
            break;
          case "subpremise":
            unitField.value = component.long_name;
            break;
        }
      });
    }
  });

  // Handle input event for suggestions
  addressInput.addEventListener("input", () => {
    const query = addressInput.value;
    if (query.length < 3) {
      suggestionsContainer.style.display = "none"; // Hide suggestions if query is too short
      return;
    }
  });
}

function displayError(input, message) {
  const errorSpan = input.nextElementSibling;
  const errorRequire = input.previousElementSibling;
  if (errorSpan) {
    errorSpan.textContent = message;
    errorSpan.style.display = "block";
  }
  if (errorRequire) {
    errorRequire.querySelector("span").classList.add("required");
  }
}

function validateForm(fields = "") {
  let requiredFields = [
    ["first_name", "First Name"],
    ["last_name", "Last Name"],
    ["gender", "Gender"],
    ["phone", "Phone"],
    ["email", "Email"],
    ["address_1", "Address"],
    ["city", "City"],
    ["province", "Province"],
    ["postal", "Postal Code"],
    ["year", "year"],
    ["month", "month"],
    ["day", "day"],
  ];
  if (fields) {
    requiredFields = requiredFields.filter((field) =>
      fields.includes(field[0])
    );
  }
  const errors = {};
  for (const [field, label] of requiredFields) {
    const input = document.getElementById(field);
    const errorSpan = input.nextElementSibling;
    const errorRequire = input.previousElementSibling;
    if (!input || !input.value) {
      errors[field] = `Error`;
      input.classList.add("invalid");
      if (field === "addressLookup") continue;
      if (errorSpan) {
        errorSpan.textContent = `Please enter your ${label}`;
        errorSpan.style.display = "block";
      }
      if (errorRequire) {
        errorRequire.querySelector("span").classList.add("required");
      }
    }
  }
  if (errors["year"] || errors["month"] || errors["day"]) {
    const input = document.getElementById("birthday-inputs");
    displayError(input, "Please enter your birthday");
  }
  if (errors["addressLookup"]) {
    const input = document.getElementById("address-search");
    displayError(input, "Please enter your Address Lookup");
  }
  if (Object.keys(errors).length > 0) {
    return true;
  }
  return false;
}
