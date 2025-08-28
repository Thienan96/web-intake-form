import { initializeStep2 } from "../js/script-step-2.js";
import { API_URL } from '../js/constant.js';
export function render() {
  return `
    <div class="container">
        <p class="step-indicator">Step 2 of 6</p>
      
        <section class="personal-information">
          <h2 class="second-title">Healthcare Information</h2>
      
          <form id="main-form">
            <div class="form-grid">
              <div class="left-column">
                <div class="form-group">
                  <label for="veteranType">What Describes You Best? <span id="icon-error" class="required-icon">*</span></label>
                  <div id="checkbox-table" class="checkbox-table checkbox-group">
                    <table>
                      <tr>
                        <th></th>
                        <th>CAF</th>
                        <th>RCMP</th>
                      </tr>
                      <tr>
                        <td><strong>Veteran</strong></td>
                        <td><input type="checkbox" name="veteran_is_vet" class="validate-checkbox"></td>
                        <td><input type="checkbox" name="veteran_is_rcmp" class="validate-checkbox"></td>
                      </tr>
                      <tr>
                        <td><strong>Active</strong></td>
                        <td><input type="checkbox" name="active_is_vet" class="validate-checkbox"></td>
                        <td><input type="checkbox" name="active_is_rcmp" class="validate-checkbox"></td>
                      </tr>
                    </table>
                  </div>
                  <span class="error-message" id="checkbox-error" style="display: none;">Please select at least one option</span>
                </div>
      
                <div class="form-group">
                  <label for="medavie_bluecross_k">Medavie Bluecross K#</label>
                  <input 
                    type="text" 
                    id="medavie_bluecross_k" 
                    name="medavie_bluecross_k"
                    class="medavie-input"
                    placeholder="K1234567"
                    maxlength="9"
                  />
                  <span class="error-message" id="medavie-error" style="display: none;">Please enter a valid Medavie Blue Cross number (K followed by 7 digits)</span>
                </div>
      
                <div class="form-group">
                  <label for="regiment">Regimental #</label>
                  <input type="text" id="regiment" name="regiment" maxlength="255" />
                </div>
      
                <div class="form-group">
                  <label for="disability_award" class="position-relative">Do You Have A Disability Award? 
                    <span class="image-container">
                       <img src="${API_URL}/images/info.svg" alt="info" class="info-icon"> 
                      <span class="overlay">A Disability Award can be found on the VAC Summary of Assessment (SOA). 
                      If you have an SOA you likely have a Disability Award.</span>
                    </span>
                  </label>
                  <select id="disability_award" name="disability_award">
                    <option value="">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
      
                <div id="awardConditionsGroup" style="display:none;" class="form-group">
                  <label for="disability_award_text">What Conditions Is Your Award For?</label>
                  <input 
                    type="text" 
                    id="disability_award_text" 
                    name="disability_award_text"
                    minlength="1"
                    maxlength="255"
                  />
                  <span class="error-message" id="award-error" style="display: none;">Please enter a condition for your award.</span>
                </div>
      
                <div class="form-group">
                  <label for="disability_assesment" class="position-relative">Are Interested In A Disability Assessment 
                    <span class="image-container">
                      <img src="${API_URL}/images/info.svg" alt="info" class="info-icon"> 
                      <span class="overlay">
                        If you have a service-related injuries (e.g., PTSD, Chronic Pain, Arthritis, etc.,) 
                        Echelon can perform a Disability Assessment to help you get the services and financial entitlements you are eligible for.
                      </span>
                    </span>
                  </label>
                  <select id="disability_assesment" name="disability_assesment">
                    <option value="">No</option>
                    <option value="true">Yes</option>
                  </select>
                  <div id="assessmentTypesGroup" style="display:none;" class="checkbox-group">
                    <div class="assessment-types">
                      <input type="checkbox" id="mental" name="is_disability_assesment_mental">
                      <label for="mental">Mental</label>
                      &nbsp;
                      <input type="checkbox" id="physical" name="is_disability_assesment_physical">
                      <label for="physical">Physical</label>
                      &nbsp;
                      <input type="checkbox" id="sexual" name="is_disability_assesment_sexual">
                      <label for="sexual">Sexual</label>
                    </div>
                    <span class="error-message" id="assessment-error" style="display: none;">Please select at least one option</span>
                  </div>
                </div>
      
                <div class="form-group">
                  <label for="summary_of_assesment">Do You Have A Summary Of Assessment (SOA)?
                  <span class="image-container">
                      <img src="${API_URL}/images/info.svg" alt="info" class="info-icon"> 
                      <span class="overlay">
                        Your Summary of Assessment (SOA) can be requested by: <br/>
                        &nbsp;&nbsp; i) contacting any VAC office<br/>
                        &nbsp;&nbsp; ii) calling VAC at 1-866-522-2122 to request a mailed copy<br/>
                        &nbsp;&nbsp; iii) by logging into your MyVAC account to download a copy
                      </span>
                    </span>
                  </label>
                  <select id="summary_of_assesment" name="summary_of_assesment">
                    <option value="">No</option>
                    <option value="true">Yes</option>
                  </select>
                </div>
                <div id="preferred_format_group" style="display: none;" class="form-group">
                  <div class="checkbox-group">
                    <div>
                      <input type="radio" id="format_digital" name="preferred_format" value="digital">
                      <label for="format_digital">Digital</label>
                    </div>
                    &nbsp;
                    <div>
                      <input type="radio" id="format_paper" name="preferred_format" value="paper">
                      <label for="format_paper">Paper</label>
                    </div>
                    &nbsp;
                    <div>
                      <input type="radio" id="format_donothavecopy" name="preferred_format" value="do_not_have_copy">
                      <label for="format_donothavecopy">I do not have a copy</label>
                    </div>
                  </div>
                </div>
                <div id="summary_of_assesment_document_group" class="form-group" style="display: none;">
                  <strong><label for="summary_of_assesment_document">Please Upload The Summary Of Assessment (SOA)</label></strong>
                  <div class="file-upload">
                    <button type="button" class="choose-file-btn">Choose File</button>
                    <span class="file-chosen">No File Chosen</span>
                    <input
                           id="summary_of_assesment_document_uploaded" 
                           name="summary_of_assesment_document_uploaded" 
                           data-original-name=""
                           value=""
                           hidden>
                    <input type="file" 
                           id="summary_of_assesment_document" 
                           name="summary_of_assesment_document" 
                           accept=".pdf,.doc,.docx"
                           data-max-size="10485760"
                           hidden>
                    <button type="button" class="clear-file-btn" style="display: none;">Clear</button>
                  </div>
                  <div class="hint" id="summary_of_assesment_document-size-hint">* File size must be less than 10MB</div>
                  <span class="error-message" id="document-error" style="display: none;">Please select a file</span>
                </div>
              </div>
      
              <div class="right-column">
                <div class="form-group">
                  <label for="emergency_contact_name">Emergency Contact Name</label>
                  <input type="text" id="emergency_contact_name" name="emergency_contact_name" placeholder="Contact Name" maxlength="255" />
                </div>
      
                <div class="form-group">
                  <label for="emergency_contact_phone">Emergency Contact Phone</label>
                  <input type="tel" id="emergency_contact_phone" name="emergency_contact_phone" placeholder="(___) ___ - ____" />
                  <span class="error-message" id="phone-error" style="display: none;">Please enter a valid phone number</span>
                  </div>
      
                <div class="form-group">
                  <label for="emergency_contact_relation">Relationship</label>
                  <input type="text" id="emergency_contact_relation" name="emergency_contact_relation" placeholder="Relationship" maxlength="255" />
                </div>
      
                <div class="form-group">
                  <label for="family_doctor">Family Doctor</label>
                  <input type="text" id="family_doctor" name="family_doctor" placeholder="Doctor Name" maxlength="255" />
                </div>
      
                <div class="form-group">
                  <label for="family_doctor_phone">Phone Number</label>
                  <input type="tel" id="family_doctor_phone" name="family_doctor_phone" placeholder="(___) ___ - ____" />
                  <span class="error-message" id="doctor-phone-error" style="display: none;">Please enter a valid phone number</span>
                </div>
      
                <div class="form-group">
                  <label for="allergies_text">Known Allergies</label>
                  <textarea id="allergies_text" name="allergies_text" rows="5" placeholder="List all known allergies" maxlength="2048"></textarea>
                </div>
              </div>
            </div>
            <div>
                <span class="foot-note">fields marked with * are mandatory</span>
            </div>
            <div class="button-group">
              <button type="submit" class="button" id="backButton"><< Back</button>
              <button type="submit" class="button next" id="nextButton">Next >></button>
            </div>
          </form>
        </section>
    </div>
    <div id="loadingIndicator">
        <div class="loadingIndicator">
          Loading...
        </div>
    </div>`;
}

function init(params = {}, queryParams = {}) {
  // console.log("Initializing Step2 with params:", params);
  try {
    initializeStep2(params);
  } catch (error) {
    console.error("Error initializing Step2:", error);
  }
}

export const Step2 = Object.assign(render, { init });
