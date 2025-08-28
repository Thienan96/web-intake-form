import { initializeStep5 } from '../js/script-step-5.js';

function render() {
  return `
        <div class="container">
        <p class="step-indicator">Step 5 of 6</p>
      
        <section class="personal-information">
            <h2 class="second-title">Services and Product Summary</h2>
      
            <form id="main-form">
                <!-- Physical Health Services Section -->
                <div class="service-section">
                    <div class="service-grid">
                        <div class="service-header">
                            <span>Physical Health Services</span>
                            <span>Past</span>
                            <span>Current</span>
                            <span>Interested</span>
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Shockwave for Erectile Dysfunction</span>
                            <input type="checkbox" name="erectile_dysfunction_past">
                            <input type="checkbox" name="erectile_dysfunction_current">
                            <input type="checkbox" name="erectile_dysfunction_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Shockwave for Chronic Pain</span>
                            <input type="checkbox" name="chronic_pain_past">
                            <input type="checkbox" name="chronic_pain_current">
                            <input type="checkbox" name="chronic_pain_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Physiotherapy</span>
                            <input type="checkbox" name="physiotherapy_past">
                            <input type="checkbox" name="physiotherapy_current">
                            <input type="checkbox" name="physiotherapy_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Chiropractic</span>
                            <input type="checkbox" name="chiropractic_past">
                            <input type="checkbox" name="chiropractic_current">
                            <input type="checkbox" name="chiropractic_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Osteopathy</span>
                            <input type="checkbox" name="osteopathy_past">
                            <input type="checkbox" name="osteopathy_current">
                            <input type="checkbox" name="osteopathy_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Massage therapy</span>
                            <input type="checkbox" name="massage_past">
                            <input type="checkbox" name="massage_current">
                            <input type="checkbox" name="massage_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Acupuncture</span>
                            <input type="checkbox" name="acupuncture_past">
                            <input type="checkbox" name="acupuncture_current">
                            <input type="checkbox" name="acupuncture_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Kinesiology</span>
                            <input type="checkbox" name="kinesiology_past">
                            <input type="checkbox" name="kinesiology_current">
                            <input type="checkbox" name="kinesiology_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Podiatry</span>
                            <input type="checkbox" name="podiatry_past">
                            <input type="checkbox" name="podiatry_current">
                            <input type="checkbox" name="podiatry_interested">
                        </div>
                    </div>
                </div>

                <!-- Mental Health Services Section -->
                <div class="service-section">
                    <div class="service-grid">
                        <div class="service-header">
                            <span>Mental Health Services</span>
                            <span>Past</span>
                            <span>Current</span>
                            <span>Interested</span>
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Individual Counselling</span>
                            <input type="checkbox" name="individual_counseling_past">
                            <input type="checkbox" name="individual_counseling_current">
                            <input type="checkbox" name="individual_counseling_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Group Counselling</span>
                            <input type="checkbox" name="group_counseling_past">
                            <input type="checkbox" name="group_counseling_current">
                            <input type="checkbox" name="group_counseling_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Couple/Marital Counselling</span>
                            <input type="checkbox" name="couple_counseling_past">
                            <input type="checkbox" name="couple_counseling_current">
                            <input type="checkbox" name="couple_counseling_interested">
                        </div>
                    </div>
                </div>

                <!-- Products Section -->
                <div class="service-section">
                    <div class="service-grid">
                        <div class="service-header">
                            <span>Products</span>
                            <span>Past</span>
                            <span>Current</span>
                            <span>Interested</span>
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Custom Orthotics</span>
                            <input type="checkbox" name="orthotics_past">
                            <input type="checkbox" name="orthotics_current">
                            <input type="checkbox" name="orthotics_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Compression Socks</span>
                            <input type="checkbox" name="compression_socks_past">
                            <input type="checkbox" name="compression_socks_current">
                            <input type="checkbox" name="compression_socks_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>TENS Unit</span>
                            <input type="checkbox" name="tens_unit_past">
                            <input type="checkbox" name="tens_unit_current">
                            <input type="checkbox" name="tens_unit_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Heating Pad</span>
                            <input type="checkbox" name="heating_pad_past">
                            <input type="checkbox" name="heating_pad_current">
                            <input type="checkbox" name="heating_pad_interested">
                        </div>
                    </div>
                </div>

                <!-- Orthopedic Bracing Section -->
                <div class="service-section">
                    <div class="service-grid">
                        <div class="service-header">
                            <span>Orthopedic Bracing</span>
                            <span>Past</span>
                            <span>Current</span>
                            <span>Interested</span>
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Neck Brace</span>
                            <input type="checkbox" name="neck_brace_past">
                            <input type="checkbox" name="neck_brace_current">
                            <input type="checkbox" name="neck_brace_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Back Brace</span>
                            <input type="checkbox" name="back_brace_past">
                            <input type="checkbox" name="back_brace_current">
                            <input type="checkbox" name="back_brace_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Shoulder Brace</span>
                            <input type="checkbox" name="shoulder_brace_past">
                            <input type="checkbox" name="shoulder_brace_current">
                            <input type="checkbox" name="shoulder_brace_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Elbow Brace</span>
                            <input type="checkbox" name="elbow_brace_past">
                            <input type="checkbox" name="elbow_brace_current">
                            <input type="checkbox" name="elbow_brace_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Wrist/Hand Brace</span>
                            <input type="checkbox" name="wrist_brace_past">
                            <input type="checkbox" name="wrist_brace_current">
                            <input type="checkbox" name="wrist_brace_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Hip/Pelvis Brace</span>
                            <input type="checkbox" name="hip_brace_past">
                            <input type="checkbox" name="hip_brace_current">
                            <input type="checkbox" name="hip_brace_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Knee Brace</span>
                            <input type="checkbox" name="knee_brace_past">
                            <input type="checkbox" name="knee_brace_current">
                            <input type="checkbox" name="knee_brace_interested">
                        </div>
                        <div class="service-row checkbox-group">
                            <span>Ankle/Foot Brace</span>
                            <input type="checkbox" name="ankle_brace_past">
                            <input type="checkbox" name="ankle_brace_current">
                            <input type="checkbox" name="ankle_brace_interested">
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
    </div>
  `;
}

function init(params = {}, queryParams = {}) {
  // console.log('Initializing Step5 with params:', params);
  try {
    initializeStep5(params);
  } catch (error) {
    console.error('Error initializing Step5:', error);
  }
}

export const Step5 = Object.assign(render, { init });