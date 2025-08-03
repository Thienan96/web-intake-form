import { serviceStep5 } from "../services/service-step-5.js";

export function initializeStep5(params = {}) {
  const { formId, stepId } = params;
  const loadingIndicator = document.getElementById("loadingIndicator");
  const form = document.getElementById("main-form");
  let pathPrevStepId = null;
  async function loadFormData() {
    try {
      loadingIndicator.style.display = "flex";
      const { formData, prevStepId } = await serviceStep5.getFormData(
        formId,
        stepId
      );
      pathPrevStepId = prevStepId;
      // Function to generate service levels
      const generateServiceLevels = () => {
        return [
          ["erectile_dysfunction", "physical_health_services.shockwave_for_ed"],
          [
            "chronic_pain",
            "physical_health_services.shockwave_for_chronic_pain",
          ],
          ["physiotherapy", "physical_health_services.physiotherapy"],
          ["chiropractic", "physical_health_services.chiropractic"],
          ["osteopathy", "physical_health_services.osteopathy"],
          ["massage", "physical_health_services.massage"],
          ["acupuncture", "physical_health_services.acupuncture"],
          ["kinesiology", "physical_health_services.kinesiology"],
          ["podiatry", "physical_health_services.podiatry"],
          [
            "individual_counseling",
            "mental_health_services.individual_counseling",
          ],
          ["group_counseling", "mental_health_services.group_counseling"],
          ["couple_counseling", "mental_health_services.couple_counseling"],
          ["orthotics", "products.custom_orthotics"],
          ["compression_socks", "products.compression_socks"],
          ["tens_unit", "products.tens_unit"],
          ["heating_pad", "products.heating_pad"],
          ["neck_brace", "orthopaedic_bracing.neck_brace"],
          ["back_brace", "orthopaedic_bracing.back_brace"],
          ["shoulder_brace", "orthopaedic_bracing.shoulder_brace"],
          ["elbow_brace", "orthopaedic_bracing.elbow_brace"],
          ["wrist_brace", "orthopaedic_bracing.wrist_hand_brace"],
          ["hip_brace", "orthopaedic_bracing.hip_pelvis_brace"],
          ["knee_brace", "orthopaedic_bracing.knee_brace"],
          ["ankle_brace", "orthopaedic_bracing.ankle_foot_brace"],
        ].flatMap(([base, service]) => [
          [`${base}_past`, `${service}.past`],
          [`${base}_current`, `${service}.current`],
          [`${base}_interested`, `${service}.interested`],
        ]);
      };

      // Update serviceLevels initialization
      const serviceLevels = generateServiceLevels();

      serviceLevels.forEach(([location, formLocation]) => {
        const input = document.querySelector(
          `input[type="checkbox"][name=${location}]`
        );
        const [formLocation1, formLocation2, formLocation3] =
          formLocation.split(".");
        if (
          input &&
          formData[formLocation1] &&
          formData[formLocation1][formLocation2] &&
          formData[formLocation1][formLocation2][formLocation3]
        ) {
          input.checked = formData[formLocation1][formLocation2][formLocation3];
        }
      });
    } catch (error) {
      window.location.replace(`${window.location.origin}`);
      console.error("Error loading form data:", error);
    } finally {
      loadingIndicator.style.display = "none";
    }
  }

  // Add form submission handler
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const buttonId = e.submitter?.id;
    try {
      loadingIndicator.style.display = "flex";

      const formData = {};
      const serviceLevels = [
        "erectile_dysfunction",
        "chronic_pain",
        "physiotherapy",
        "chiropractic",
        "osteopathy",
        "massage",
        "acupuncture",
        "kinesiology",
        "podiatry",
        "individual_counseling",
        "group_counseling",
        "couple_counseling",
        "orthotics",
        "compression_socks",
        "tens_unit",
        "heating_pad",
        "neck_brace",
        "back_brace",
        "shoulder_brace",
        "elbow_brace",
        "wrist_brace",
        "hip_brace",
        "knee_brace",
        "ankle_brace",
      ].flatMap((base) => [
        [`${base}_past`],
        [`${base}_current`],
        [`${base}_interested`],
      ]);

      serviceLevels.forEach((location) => {
        const input = document.querySelector(
          `input[type="checkbox"][name=${location}]`
        );
        if (input) {
          formData[location] = !!input.checked; // Convert to boolean
        }
      });
      if(buttonId === 'backButton') {
        const prevPath = `/view/step-4/${formId}/${pathPrevStepId}`;
        await serviceStep5.saveFormData(formId, stepId, formData);
        window.navigateTo(null, prevPath);
      } else if(buttonId === 'nextButton') {
        const nextPath = await serviceStep5.saveFormData(
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
  // Load form data if we have formId and stepId
  if (formId && stepId) {
    loadFormData();
  }
}
