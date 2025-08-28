import { initializeStep4 } from '../js/script-step-4.js';
import { API_URL } from '../js/constant.js';
function render() {
  return `
      <div class="container">
        <p class="step-indicator">Step 4 of 6</p>
      
        <section class="personal-information">
            <h2 class="second-title">Physical Health</h2>
            
            <p class="description">
                Many people experience Pain, including numbness, pins & needles, burning, aching, stabbing.<br>
                Please indicate where you are experiencing Pain or Discomfort.
            </p>

            <form id="main-form">
                <div class="pain-diagram">
                    <div class="diagram-container">
                        <svg class="connector-lines" style="position: absolute; width: 100%; height: 100%; top: 0; left: 0; pointer-events: none;"></svg>
                        <img src="${API_URL}/images/body-diagram.png" alt="Body Diagram" id="body-image" class="body-image">
                        <div class="pain-indicators">
                            <div class="pain-point" style="top: 15%; left: 55%" data-label="neck"></div>
                            <div class="pain-point" style="top: 20%; right: 15%" data-label="shoulders"></div>
                            <div class="pain-point" style="top: 35%; right: 10%" data-label="elbow"></div>
                            <div class="pain-point" style="top: 47%; right: 5%" data-label="wrist"></div>
                            <div class="pain-point" style="top: 50%; right: 25%" data-label="hip"></div>
                            <div class="pain-point" style="top: 47%; left: 50%" data-label="groin"></div>
                            <div class="pain-point" style="top: 70%; right: 30%" data-label="knee"></div>
                            <div class="pain-point" style="top: 90%; right: 30%" data-label="foot"></div>
                        </div>
                    </div>

                    <div class="pain-checklist">
                        <div class="pain-row-header responsive-pain-row">
                            <div class="pain-area-title">
                                <div class="space"></div>
                                <span class="area-label">Area</span>
                            </div>
                            <div class="pain-area-title">
                                <div class="space"></div>
                                <span class="area-label">Pain / Discomfort</span>
                            </div>
                        </div>
                        <div class="pain-row responsive-pain-row">
                            <div class="pain-area-title">
                                <div id="neck" class="space"></div>
                                <span class="area-label">Neck / Spine</span>
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" name="is_neck_spine">
                            </div>
                        </div>
                        <div class="pain-row responsive-pain-row">
                            <div class="pain-area-title">
                                <div id="shoulders" class="space"></div>
                                <span class="area-label">Shoulders</span>
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" name="is_shoulders">
                            </div>
                        </div>
                        <div class="pain-row responsive-pain-row">
                            <div class="pain-area-title">
                                <div id="elbow" class="space"></div>
                                <span class="area-label">Elbow</span>
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" name="is_elbow">
                            </div>
                        </div>
                        <div class="pain-row responsive-pain-row">
                            <div class="pain-area-title">
                                <div id="wrist" class="space"></div>
                                <span class="area-label">Wrist / Hand</span>
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" name="is_wrist_hand">
                            </div>
                        </div>
                        <div class="pain-row responsive-pain-row">
                            <div class="pain-area-title">
                                <div id="hip" class="space"></div>
                                <span class="area-label">Hip / Pelvis</span>
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" name="is_hip_pelvis">
                            </div>
                        </div>
                        <div class="pain-row responsive-pain-row">
                            <div class="pain-area-title">
                                <div id="groin" class="space"></div>
                                <span class="area-label">Groin</span>
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" name="is_groin">
                            </div>
                        </div>
                        <div class="pain-row responsive-pain-row">
                            <div class="pain-area-title">
                                <div id="knee" class="space"></div>
                                <span class="area-label">Knee</span>
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" name="is_knee">
                            </div>
                        </div>
                        <div class="pain-row responsive-pain-row">
                            <div class="pain-area-title">
                                <div id="foot" class="space"></div>
                                <span class="area-label">Foot / Ankle</span>
                            </div>
                            <div class="checkbox-group">
                                <input type="checkbox" name="is_foot_ankle">
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
    </div> 
  `;
}

function init(params = {}, queryParams = {}) {
  // console.log('Initializing Step4 with params:', params);
  try {
    initializeStep4(params);
  } catch (error) {
    console.error('Error initializing Step4:', error);
  }
}

export const Step4 = Object.assign(render, { init });