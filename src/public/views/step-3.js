import { initializeStep3 } from '../js/script-step-3.js';

function render() {
  return `
      <div class="container">
        <p class="step-indicator">Step 3 of 6</p>
      
        <section class="personal-information">
            <h2 class="second-title">Health History</h2>
      
            <form id="main-form">
                <div class="health-grid">
                    <!-- Left Column -->
                    <div class="health-column">
                        <div class="health-section">
                            <h3>General</h3>
                            <div class="checkbox-list checkbox-group">
                                <label><input type="checkbox" name="general_fainting"> Fainting / Dizziness</label>
                                <label><input type="checkbox" name="general_headache"> Headache / Migraines</label>
                                <label><input type="checkbox" name="general_nervousness"> Nervousness</label>
                                <label><input type="checkbox" name="general_numbness"> Numbness / Tingling</label>
                                <label><input type="checkbox" name="general_paralysis"> Paralysis</label>
                            </div>
                        </div>

                        <div class="health-section">
                            <h3>Infections</h3>
                            <div class="checkbox-list checkbox-group">
                                <label><input type="checkbox" name="infections_athletes_foot"> Athlete's Foot</label>
                                <label><input type="checkbox" name="infections_hepatitis"> Hepatitis</label>
                                <label><input type="checkbox" name="infections_hiv"> HIV / AIDS</label>
                                <label><input type="checkbox" name="infections_tuberculosis"> Tuberculosis</label>
                                <label><input type="checkbox" name="infections_herpes"> Herpes</label>
                                <label><input type="checkbox" name="infections_warts"> Warts</label>
                                <label><input type="checkbox" id="infections_other" name="infections_other"> Other:</label>
                                <input class="display-none" type="text" id="infections_other_text" name="infections_other_text" 
                                    placeholder="Please list other conditions">
                                <span class="margin-top-10 error-message" style="display: none;">Please input other Infections conditions</span>
                            </div>
                        </div>

                        <div class="health-section">
                            <h3>Gastrointestinal</h3>
                            <div class="checkbox-list checkbox-group">
                                <label><input type="checkbox" name="gi_colitis"> Colitis / Chron's / IBS</label>
                                <label><input type="checkbox" name="gi_diabetes"> Diabetes</label>
                                <label><input type="checkbox" name="gi_gout"> Gout</label>
                                <label><input type="checkbox" name="gi_nausea"> Nausea / Vomiting</label>
                                <label><input type="checkbox" name="gi_ulcers"> Ulcers</label>
                            </div>
                        </div>
                    </div>

                    <!-- Right Column -->
                    <div class="health-column">
                        <div class="health-section">
                            <h3>Mental Health</h3>
                            <div class="checkbox-list checkbox-group">
                                <label><input type="checkbox" name="mental_ptsd"> PTSD</label>
                                <label><input type="checkbox" name="mental_depression"> Depression</label>
                                <label><input type="checkbox" name="mental_anxiety"> Anxiety</label>
                                <label><input type="checkbox" id="mental_other" name="mental_other"> Other:</label>
                                <input class="display-none" type="text" id="mental_other_text" name="mental_other_text" 
                                    placeholder="Please list other conditions">
                                <span class="margin-top-10 error-message" style="display: none;">Please input other Mental Health conditions</span>
                            </div>
                        </div>

                        <div class="health-section">
                            <h3>Musculoskeletal</h3>
                            <div class="checkbox-list checkbox-group">
                                <label><input type="checkbox" name="muscular_arthritis"> Arthritis / Joint Pain</label>
                                <label><input type="checkbox" name="muscular_bursitis"> Bursitis</label>
                                <label><input type="checkbox" name="muscular_cancer"> Cancer</label>
                                <label><input type="checkbox" name="muscular_fibromyalgia"> Fibromyalgia</label>
                                <label><input type="checkbox" name="muscular_ms"> Multiple Sclerosis</label>
                                <label><input type="checkbox" name="muscular_osteoporosis"> Osteoporosis</label>
                                <label><input type="checkbox" name="muscular_pins"> Pins or Plates</label>
                                <label><input type="checkbox" id="muscular_other" name="muscular_other"> Other:</label>
                                <input class="display-none" type="text" id="muscular_other_text" name="muscular_other_text" 
                                    placeholder="Please list other conditions">
                                <span class="margin-top-10 error-message" style="display: none;">Please input other Musculoskeletal conditions</span>
                            </div>
                        </div>

                        <div class="health-section">
                            <h3 class="gender-specific" id="gender-specific-title"></h3>
                            <div id="gender-specific-options" class="checkbox-list checkbox-group">
                                <!-- Will be populated based on gender -->
                            </div>
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
  // console.log('Initializing Step3 with params:', params);
  try {
    initializeStep3(params);
  } catch (error) {
    console.error('Error initializing Step3:', error);
  }
}

export const Step3 = Object.assign(render, { init });