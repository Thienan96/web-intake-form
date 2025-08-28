import { initializeStep1 } from '../js/script-step-1.js';

function render() {
  return `
  <div class="container">
<!--        <h1 class="first-title">Health History Questionnaire</h1>-->
                      
        <p class="step-indicator">Step 1 of 6</p>
      
        <section class="personal-information">
          <h2 class="second-title">Personal Information</h2>
      
          <form id="main-form" action="/step-1" method="POST">
            <div class="form-grid">
              <div class="left-column">
                <div class="form-group">
                  <label for="first_name">First Name <span class="">*</span></label>
                  <input 
                    type="text" 
                    id="first_name" 
                    placeholder="First Name" 
                    name="first_name"  
                    class=""
                    value=""
                    minlength="1"
                    maxlength="255"
                  />
                  <span class="error-message" style="display: none;">Error</span>
                </div>
                <div class="form-group">
                  <label for="last_name"
                    >Last Name <span class="">*</span></label
                  >
                  <input type="text" id="last_name" placeholder="Last Name" name="last_name" class=""
                  value="" minlength="1" maxlength="255" />
                  <span class="error-message" style="display: none;">Error</span>
                </div>
                <div style='margin-bottom: 15px;'>
                  <label>Birthday <span class="">*</span></label>
                  <div id="birthday-inputs" class="birthday-inputs">
                    <div class="form-group">
                      <label for="year">Year <span class="">*</span></label>
                      <select id="year" name="year" class=""
                        data-value="" >
                        <option value="">Year</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="month">Month <span class="">*</span></label>
                      <select id="month" name="month" class=""
                        value="" data-value="" >
                        <option value="">Month</option>
                        <option value="1" >January</option>
                        <option value="2" >February</option>
                        <option value="3" >March</option>
                        <option value="4" >April</option>
                        <option value="5" >May</option>
                        <option value="6" >June</option>
                        <option value="7" >July</option>
                        <option value="8" >August</option>
                        <option value="9" >September</option>
                        <option value="10" >October</option>
                        <option value="11" >November</option>
                        <option value="12" >December</option>
                      </select>
                    </div>
                    <div class="form-group">
                      <label for="day">Day <span class="">*</span></label>
                      <select id="day" name="day" class=""
                        value="" data-value="">
                        <option value="">Day</option>
                      </select>
                    </div>
                  </div>
                  <span class="error-message" style="display: none;">Error</span>
                </div>
      
                <div class="form-group">
                  <label for="gender">Gender <span>*</span></label>
                  <select id="gender" name="gender" >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  <span class="error-message" style="display: none;">Error</span>
                </div>
      
                <div class="form-group">
                  <label for="phone">Phone Number <span class="">*</span></label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    class="phone-input"
                    value=""
                    placeholder="(___) ___ - ____"
                  />
                  <span class="error-message" id="phone-error" style="display: none;">Please enter a valid phone number</span>
                  </div>
      
                <div class="form-group checkbox-group">
                  <div class="left-column">
                      <div class="checkbox-group align-items">
                          <input type="checkbox" id="is_voicemail_consent"  name="is_voicemail_consent" />
                          <label style="font-size: 16px; margin-bottom: 0px;" for="is_voicemail_consent"
                            >Can we leave a voicemail on the phone number you have
                            provided?</label
                          >
                      </div>
                      <small
                        >Please Note, if your phone number is not private, please consider
                        not checking the box above.</small
                      >
                  </div>
                </div>
      
                <div class="form-group">
                  <label for="email">Email <span class="">*</span></label>
                  <input type="email" id="email" placeholder="Email" name="email" class=""
                  value=""/>
                  <span class="error-message" style="display: none;">Error</span>
                </div>
              </div>
      
              <div class="right-column">
                <div class="form-group">
                  <label for="addressLookup"
                    >Address Lookup</label
                  >
                  <div id="address-search" class="search-input">
                    <input
                      type="text"
                      id="addressLookup"
                      name="addressLookup"
                      class=""
                      value=""
                      placeholder="Type to search"
                    />
                    <div id="address-suggestions" class="suggestions"></div>
                  </div>
                </div>
      
                <div class="form-group">
                  <label for="address">Address <span class="">*</span></label>
                  <input type="text" id="address_1" placeholder="Street address" minlength="1"
                    maxlength="255" name="address_1" class=""
                  value=""/>
                  <span class="error-message" style="display: none;">Error</span>
                </div>
      
                <div class="form-group">
                  <label for="address_2">Unit</label>
                  <input type="text" id="address_2" placeholder="Unit" name="address_2" class=""
                  value="" maxlength="255"/>
                </div>
      
                <div class="form-group">
                  <label for="city">City <span class="">*</span></label>
                  <input type="text" id="city" placeholder="City" name="city" class=""
                  value="" minlength="1" maxlength="255"/>
                  <span class="error-message" style="display: none;">Error</span>
                </div>
      
                <div class="form-group">
                  <label for="province"
                    >Province <span class="">*</span></label
                  >
                  <select id="province" name="province"
                        value="" data-value="" >
                        <option value="" >Select Province</option>
                        <option value="AB" >Alberta</option>
                        <option value="BC" >British Columbia</option>
                        <option value="MB" >Manitoba</option>
                        <option value="NB" >New Brunswick</option>
                        <option value="NL" >Newfoundland and Labrador</option>
                        <option value="NT" >Northwest Territories</option>
                        <option value="NS" >Nova Scotia</option>
                        <option value="NU" >Nunavut</option>
                        <option value="ON" >Ontario</option>
                        <option value="PE" >Prince Edward Island</option>
                        <option value="QC" >Quebec</option>
                        <option value="SK" >Saskatchewan</option>
                        <option value="YT" >Yukon</option>
                  </select>
                  <span class="error-message" style="display: none;">Error</span>
                </div>
      
                <div class="form-group">
                  <label for="postal"
                    >Postal Code <span class="">*</span></label
                  >
                  <input type="text" id="postal" placeholder="Postal Code" name="postal" class=""
                  value="" />
                  <span class="error-message" id="postal-error" style="display: none;">Error</span>
                </div>
              </div>
            </div>
      
            <div class="form-footer">
              <div class="form-group">
                <label for="referrer_option">How Did You Hear About Us?</label>
                <select id="referrer_option" name="referrer_option">
                  <option value="" >Select option</option>
                  <option value="google" >Google</option>
                  <option value="facebook" >Facebook</option>
                  <option value="friend" >Friend</option>
                  <option value="other" >Other</option>
                </select>
              </div>
      
              <div id="referrer_text_div" class="form-group">
                <label for="referrer_text">Who Referred You</label>
                <input type="text" id="referrer_text" value="" name="referrer_text" />
              </div>
            </div>
            <div>
                <span class="foot-note">fields marked with * are mandatory</span>
            </div>
            <button type="submit" class="next button">Next >></button>
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
  // console.log('Initializing Step1 with queryParams:', queryParams);
  // console.log('Initializing Step1 with params:', params);
  try {
    initializeStep1(params, queryParams);
  } catch (error) {
    console.error('Error initializing Step1:', error);
  }
}

// Export both the render function and init method
export const Step1 = Object.assign(render, { init });
