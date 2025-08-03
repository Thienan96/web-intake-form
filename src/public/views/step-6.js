import { initializeStep6 } from "../js/script-step-6.js";

function render() {
  return `
        <div class="container">
        <p class="step-indicator">Step 6 of 6</p>
      
        <section class="personal-information">
            <h2 class="second-title">Consent</h2>
      
            <form id="main-form">
                <div class="consent-row">
                    <div class="consent-checkbox checkbox-group">
                        <input type="checkbox" id="is_no_replacement_for_physician_consent" name="is_no_replacement_for_physician_consent" required>
                        <label for="is_no_replacement_for_physician_consent">I understand that Echelon Wellness and its Health Care Providers do not replace my family physician.</label>
                    </div>
                    <div class="form-group">
                        <label for="initial">Inital <span class="">*</span></label>
                        <input type="text" id="is_no_replacement_for_physician_consent_initial" name="is_no_replacement_for_physician_consent_initial"/>
                        <span id="initial-error" class="error-message" style="display: none;">Error</span>
                    </div>
                </div>

                <div class="signature-section">
                    <div class="signature-box">
                        <canvas id="signatureCanvas"></canvas>
                        <input type="hidden" id="signature" name="signature">
                        <div class="label-area">
                            <label class="signature-label">Signature</label>
                            <button id="clear-signature" type="button" class="clear-signature">Clear</button>
                        </div>
                    <span class="error-message" id="checkbox-error" style="display: none;">Please sign here</span>
                    </div>
                    <div class="date-box">
                        <span class="date-text">${new Date().toDateString()}</span>
                    </div>
                </div>
            <div>
                <span class="foot-note">fields marked with * are mandatory</span>
            </div>
                <div class="button-group">
                    <button type="button" class="button" id="backButton"><< Back</button>
                    <button type="submit" class="button next" id="nextButton">Next >></button>
                </div>
            </form>
        </section>
    </div>
    <div id="loadingIndicator">
        <div class="loadingIndicator">
          Loading...
        </div>
    </div>
  `;
}

function init(params = {}, queryParams = {}) {
  // console.log("Initializing Step6 with params:", params);
  try {
    initializeStep6(params);
  } catch (error) {
    console.error("Error initializing Step6:", error);
  }
}

export const Step6 = Object.assign(render, { init });
