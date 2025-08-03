import {initializeThankyou} from "../js/script-thankyou.js";

function render() {
  return `
    <div class="container">      
        <section class="thank-you-section">
            <h2 class="second-title">Thank you!</h2>
            
            <div class="thank-you-content">
                <p>
                    <span id="salutation">Thank you for submitting your Intake Form</span>
                </p>
                <p>
                    One of our Patient Care Specialists will be in touch soon to confirm next steps.<br/> 
                    You will also receive a confirmation email <span id="email"></span>.
                </p>
                <button type="button" class="complete-button" onclick="window.close()">Complete</button>
                <!-- <button type="button" class="complete-button" onclick="window.location.href='/'">Complete</button> -->
            </div>
        </section>
    </div>

  `;
}

function init(params = {}) {
  // console.log("Initializing 'Thank you page' with params:", params);
  try {
    initializeThankyou(params);
  } catch (error) {
    console.error("Error initializing Step Thankyou:", error);
  }
}

export const Step7 = Object.assign(render, { init });
