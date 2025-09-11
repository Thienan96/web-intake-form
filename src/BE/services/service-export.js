const { PDFDocument } = require("pdf-lib");
const fs = require("fs-extra");
const os = require("os");
const path = require("path");
const { getAllFormData } = require("./service-form");

const exportFormToPDF = async (formId) => {
  try {
    const formData = await getAllFormData(formId);
    const { step1, step2, step3, step4, step5, step6 } = formData;

    const pdfDoc = await PDFDocument.load(
      await fs.readFile(path.resolve(__dirname, "../templates/form.pdf"))
    );
    const form = pdfDoc.getForm();

    const yesNo = (value) => (value === "yes" ? "Yes" : "No");
    const camelCase = (str) =>
      str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    const formatDate = (dateStr) =>
      new Date(dateStr).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    const formatPhone = (phone) => {
      const digits = phone.replace(/\D/g, "");
      return digits.length === 10
        ? `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
        : phone;
    };

    const safeSetText = (fieldName, value) => {
      try {
        form.getTextField(fieldName).setText(value);
      } catch (e) {
        console.warn(`Text field not found: ${fieldName}`);
      }
    };

    const safeCheckBox = (fieldName) => {
      try {
        form.getCheckBox(fieldName).check();
      } catch (e) {
        console.warn(`Checkbox not found: ${fieldName}`);
      }
    };

    const fields = [
      ["{step1.province}", step1.province],
      ["{step1.city}", step1.city],
      [
        "{step1.address_1} {step1.address_2}",
        `${step1?.address_1 || ""} ${step1?.address_2 || ""}`,
      ],
      ["{step1.last_name}", step1.last_name],
      ["{step1.postal}", step1.postal],
      ["{step1.email}", step1.email],
      [
        "{step1.referrer_option} {step1.referrer_text}",
        `${step1?.referrer_option || ""} ${step1?.referrer_text || ""}`,
      ],
      ["{step1.first_name}", step1.first_name],
      ["{step2.emergency_contact_name}", step2.emergency_contact_name],
      ["{step2.emergency_contact_relation}", step2.emergency_contact_relation],
      ["{step2.regiment}", step2.regiment],
      ["{step2.medavie_bluecross_k}", step2.medavie_bluecross_k],
      ["{step2.disability_award_text}", step2.disability_award_text],
      ["{step2.family_doctor}", step2.family_doctor],
      ["{step2.allergies_text}", step2.allergies_text],
      ["{YesNo(step2.disability_award)}", yesNo(step2.disability_award)],
      [
        "{YesNo(step2.disability_assesment)}",
        yesNo(step2.disability_assesment),
      ],
      [
        "{YesNo(step2.summary_of_assesment)}; {step2.preferred_format}",
        step2?.summary_of_assesment
          ? `${yesNo(step2.summary_of_assesment)}; ${
              step2?.preferred_format || ""
            }`
          : "",
      ],
      ["{CamelCase(step1.gender)}", camelCase(step1.gender)],
      [
        "{YesNo(step1.is_voicemail_consent)}",
        yesNo(step1.is_voicemail_consent),
      ],
      ["{FormatDate(step1.birthday)}", formatDate(step1.birthday)],
      ["{FormatPhone(step1.phone)}", formatPhone(step1.phone)],
      [
        "{FormatPhone(step2.emergency_contact_phone)}",
        formatPhone(step2.emergency_contact_phone),
      ],
      [
        "{FormatPhone(step2.family_doctor_phone)}",
        formatPhone(step2.family_doctor_phone),
      ],
      ["{step3.mental.other_text}", step3.mental.other_text],
      ["{step3.musculoskeletal.other_text}", step3.musculoskeletal.other_text],
      ["{step3.infections.other_text}", step3.infections.other_text],
      [
        "{step6.is_no_replacement_for_physician_consent_initial}",
        step6.is_no_replacement_for_physician_consent_initial,
      ],
      ["{FormatDate(step6.local_date_time)}", formatDate(step6.updatedAt)],
    ];

    fields.forEach(([field, value]) => safeSetText(field, value));

    const checkboxes = [
      ["{step2.veteran.is_vet}", step2?.veteran?.is_vet],
      ["{step2.veteran.is_active}", step2?.veteran?.is_active],
      ["{step2.rcmp.is_vet}", step2?.rcmp?.is_vet],
      ["{step2.rcmp.is_active}", step2?.rcmp?.is_active],
      [
        "{step2.is_disability_assesment_mental}",
        step2?.is_disability_assesment_mental,
      ],
      [
        "{step2.is_disability_assesment_physical}",
        step2?.is_disability_assesment_physical,
      ],
      [
        "{step2.is_disability_assesment_sexual}",
        step2?.is_disability_assesment_sexual,
      ],
      ["{step3.general.is_fainting}", step3?.general?.is_fainting],
      ["{step3.general.is_headache}", step3?.general?.is_headache],
      ["{step3.general.is_nervousness}", step3?.general?.is_nervousness],
      ["{step3.general.is_numbness}", step3?.general?.is_numbness],
      ["{step3.general.is_paralysis}", step3?.general?.is_paralysis],
      [
        "{step3.gastrointestinal.is_colitis}",
        step3?.gastrointestinal?.is_colitis,
      ],
      [
        "{step3.gastrointestinal.is_diabetes}",
        step3?.gastrointestinal?.is_diabetes,
      ],
      ["{step3.gastrointestinal.is_gout}", step3?.gastrointestinal?.is_gout],
      [
        "{step3.gastrointestinal.is_nausea}",
        step3?.gastrointestinal?.is_nausea,
      ],
      [
        "{step3.gastrointestinal.is_ulcers}",
        step3?.gastrointestinal?.is_ulcers,
      ],
      ["{step3.mental.is_ptsd}", step3?.mental?.is_ptsd],
      ["{step3.mental.is_depression}", step3?.mental?.is_depression],
      ["{step3.mental.is_anxiety}", step3?.mental?.is_anxiety],
      [
        "{step3.musculoskeletal.is_arthritis}",
        step3?.musculoskeletal?.is_arthritis,
      ],
      [
        "{step3.musculoskeletal.is_bursitis}",
        step3?.musculoskeletal?.is_bursitis,
      ],
      ["{step3.musculoskeletal.is_cancer}", step3?.musculoskeletal?.is_cancer],
      [
        "{step3.musculoskeletal.is_fibromyalgia}",
        step3?.musculoskeletal?.is_fibromyalgia,
      ],
      [
        "{step3.musculoskeletal.is_multiple_sclerosis}",
        step3?.musculoskeletal?.is_multiple_sclerosis,
      ],
      [
        "{step3.musculoskeletal.is_osteoporosis}",
        step3?.musculoskeletal?.is_osteoporosis,
      ],
      [
        "{step3.musculoskeletal.is_pins_plates}",
        step3?.musculoskeletal?.is_pins_plates,
      ],
      [
        "{step3.sexual.is_erectile_dysfunction}",
        step3?.sexual?.is_erectile_dysfunction,
      ],
      ["{step3.sexual.is_prostate}", step3?.sexual?.is_prostate],
      ["{step3.sexual.is_pregnant}", step3?.sexual?.is_pregnant],
      [
        "{step3.sexual.is_sexual_dysfunction}",
        step3?.sexual?.is_sexual_dysfunction,
      ],
      [
        "{step3.infections.is_athlete_foot}",
        step3?.infections?.is_athlete_foot,
      ],
      ["{step3.infections.is_hepatitis}", step3?.infections?.is_hepatitis],
      ["{step3.infections.is_hiv}", step3?.infections?.is_hiv],
      [
        "{step3.infections.is_tuberculosis}",
        step3?.infections?.is_tuberculosis,
      ],
      ["{step3.infections.is_herpes}", step3?.infections?.is_herpes],
      ["{step3.infections.is_warts}", step3?.infections?.is_warts],
      ["{step4.is_neck_spine}", step4?.is_neck_spine],
      ["{step4.is_shoulders}", step4?.is_shoulders],
      ["{step4.is_elbow}", step4?.is_elbow],
      ["{step4.is_wrist_hand}", step4?.is_wrist_hand],
      ["{step4.is_hip_pelvis}", step4?.is_hip_pelvis],
      ["{step4.is_groin}", step4?.is_groin],
      ["{step4.is_knee}", step4?.is_knee],
      ["{step4.is_foot_ankle}", step4?.is_foot_ankle],
      [
        "{step5.physical_health_services.shockwave_for_ed.past}",
        step5?.physical_health_services?.shockwave_for_ed?.past,
      ],
      [
        "{step5.physical_health_services.shockwave_for_ed.current}",
        step5?.physical_health_services?.shockwave_for_ed?.current,
      ],
      [
        "{step5.physical_health_services.shockwave_for_ed.interested}",
        step5?.physical_health_services?.shockwave_for_ed?.interested,
      ],
      [
        "{step5.physical_health_services.shockwave_for_chronic_pain.past}",
        step5?.physical_health_services?.shockwave_for_chronic_pain?.past,
      ],
      [
        "{step5.physical_health_services.shockwave_for_chronic_pain.current}",
        step5?.physical_health_services?.shockwave_for_chronic_pain?.current,
      ],
      [
        "{step5.physical_health_services.shockwave_for_chronic_pain.interested}",
        step5?.physical_health_services?.shockwave_for_chronic_pain?.interested,
      ],
      [
        "{step5.physical_health_services.physiotherapy.past}",
        step5?.physical_health_services?.physiotherapy?.past,
      ],
      [
        "{step5.physical_health_services.physiotherapy.current}",
        step5?.physical_health_services?.physiotherapy?.current,
      ],
      [
        "{step5.physical_health_services.physiotherapy.interested}",
        step5?.physical_health_services?.physiotherapy?.interested,
      ],
      [
        "{step5.physical_health_services.chiropractic.past}",
        step5?.physical_health_services?.chiropractic?.past,
      ],
      [
        "{step5.physical_health_services.chiropractic.current}",
        step5?.physical_health_services?.chiropractic?.current,
      ],
      [
        "{step5.physical_health_services.chiropractic.interested}",
        step5?.physical_health_services?.chiropractic?.interested,
      ],
      [
        "{step5.physical_health_services.osteopathy.past}",
        step5?.physical_health_services?.osteopathy?.past,
      ],
      [
        "{step5.physical_health_services.osteopathy.current}",
        step5?.physical_health_services?.osteopathy?.current,
      ],
      [
        "{step5.physical_health_services.osteopathy.interested}",
        step5?.physical_health_services?.osteopathy?.interested,
      ],
      [
        "{step5.physical_health_services.massage.past}",
        step5?.physical_health_services?.massage?.past,
      ],
      [
        "{step5.physical_health_services.massage.current}",
        step5?.physical_health_services?.massage?.current,
      ],
      [
        "{step5.physical_health_services.massage.interested}",
        step5?.physical_health_services?.massage?.interested,
      ],
      [
        "{step5.physical_health_services.acupuncture.past}",
        step5?.physical_health_services?.acupuncture?.past,
      ],
      [
        "{step5.physical_health_services.acupuncture.current}",
        step5?.physical_health_services?.acupuncture?.current,
      ],
      [
        "{step5.physical_health_services.acupuncture.interested}",
        step5?.physical_health_services?.acupuncture?.interested,
      ],
      [
        "{step5.physical_health_services.kinesiology.past}",
        step5?.physical_health_services?.kinesiology?.past,
      ],
      [
        "{step5.physical_health_services.kinesiology.current}",
        step5?.physical_health_services?.kinesiology?.current,
      ],
      [
        "{step5.physical_health_services.kinesiology.interested}",
        step5?.physical_health_services?.kinesiology?.interested,
      ],
      [
        "{step5.physical_health_services.podiatry.past}",
        step5?.physical_health_services?.podiatry?.past,
      ],
      [
        "{step5.physical_health_services.podiatry.current}",
        step5?.physical_health_services?.podiatry?.current,
      ],
      [
        "{step5.physical_health_services.podiatry.interested}",
        step5?.physical_health_services?.podiatry?.interested,
      ],
      [
        "{step5.mental_health_services.individual_counseling.past}",
        step5?.mental_health_services?.individual_counseling?.past,
      ],
      [
        "{step5.mental_health_services.individual_counseling.current}",
        step5?.mental_health_services?.individual_counseling?.current,
      ],
      [
        "{step5.mental_health_services.individual_counseling.interested}",
        step5?.mental_health_services?.individual_counseling?.interested,
      ],
      [
        "{step5.mental_health_services.group_counseling.past}",
        step5?.mental_health_services?.group_counseling?.past,
      ],
      [
        "{step5.mental_health_services.group_counseling.current}",
        step5?.mental_health_services?.group_counseling?.current,
      ],
      [
        "{step5.mental_health_services.group_counseling.interested}",
        step5?.mental_health_services?.group_counseling?.interested,
      ],
      [
        "{step5.mental_health_services.couple_counseling.past}",
        step5?.mental_health_services?.couple_counseling?.past,
      ],
      [
        "{step5.mental_health_services.couple_counseling.current}",
        step5?.mental_health_services?.couple_counseling?.current,
      ],
      [
        "{step5.mental_health_services.couple_counseling.interested}",
        step5?.mental_health_services?.couple_counseling?.interested,
      ],
      [
        "{step5.products.custom_orthotics.past}",
        step5?.products?.custom_orthotics?.past,
      ],
      [
        "{step5.products.custom_orthotics.current}",
        step5?.products?.custom_orthotics?.current,
      ],
      [
        "{step5.products.custom_orthotics.interested}",
        step5?.products?.custom_orthotics?.interested,
      ],
      [
        "{step5.products.compression_socks.past}",
        step5?.products?.compression_socks?.past,
      ],
      [
        "{step5.products.compression_socks.current}",
        step5?.products?.compression_socks?.current,
      ],
      [
        "{step5.products.compression_socks.interested}",
        step5?.products?.compression_socks?.interested,
      ],
      ["{step5.products.tens_unit.past}", step5?.products?.tens_unit?.past],
      [
        "{step5.products.tens_unit.current}",
        step5?.products?.tens_unit?.current,
      ],
      [
        "{step5.products.tens_unit.interested}",
        step5?.products?.tens_unit?.interested,
      ],
      ["{step5.products.heating_pad.past}", step5?.products?.heating_pad?.past],
      [
        "{step5.products.heating_pad.current}",
        step5?.products?.heating_pad?.current,
      ],
      [
        "{step5.products.heating_pad.interested}",
        step5?.products?.heating_pad?.interested,
      ],
      [
        "{step5.orthopaedic_bracing.neck_brace.past}",
        step5?.orthopaedic_bracing?.neck_brace?.past,
      ],
      [
        "{step5.orthopaedic_bracing.neck_brace.current}",
        step5?.orthopaedic_bracing?.neck_brace?.current,
      ],
      [
        "{step5.orthopaedic_bracing.neck_brace.interested}",
        step5?.orthopaedic_bracing?.neck_brace?.interested,
      ],
      [
        "{step5.orthopaedic_bracing.back_brace.past}",
        step5?.orthopaedic_bracing?.back_brace?.past,
      ],
      [
        "{step5.orthopaedic_bracing.back_brace.current}",
        step5?.orthopaedic_bracing?.back_brace?.current,
      ],
      [
        "{step5.orthopaedic_bracing.back_brace.interested}",
        step5?.orthopaedic_bracing?.back_brace?.interested,
      ],
      [
        "{step5.orthopaedic_bracing.shoulder_brace.past}",
        step5?.orthopaedic_bracing?.shoulder_brace?.past,
      ],
      [
        "{step5.orthopaedic_bracing.shoulder_brace.current}",
        step5?.orthopaedic_bracing?.shoulder_brace?.current,
      ],
      [
        "{step5.orthopaedic_bracing.shoulder_brace.interested}",
        step5?.orthopaedic_bracing?.shoulder_brace?.interested,
      ],
      [
        "{step5.orthopaedic_bracing.elbow_brace.past}",
        step5?.orthopaedic_bracing?.elbow_brace?.past,
      ],
      [
        "{step5.orthopaedic_bracing.elbow_brace.current}",
        step5?.orthopaedic_bracing?.elbow_brace?.current,
      ],
      [
        "{step5.orthopaedic_bracing.elbow_brace.interested}",
        step5?.orthopaedic_bracing?.elbow_brace?.interested,
      ],
      [
        "{step5.orthopaedic_bracing.wrist_hand_brace.past}",
        step5?.orthopaedic_bracing?.wrist_hand_brace?.past,
      ],
      [
        "{step5.orthopaedic_bracing.wrist_hand_brace.current}",
        step5?.orthopaedic_bracing?.wrist_hand_brace?.current,
      ],
      [
        "{step5.orthopaedic_bracing.wrist_hand_brace.interested}",
        step5?.orthopaedic_bracing?.wrist_hand_brace?.interested,
      ],
      [
        "{step5.orthopaedic_bracing.hip_pelvis_brace.past}",
        step5?.orthopaedic_bracing?.hip_pelvis_brace?.past,
      ],
      [
        "{step5.orthopaedic_bracing.hip_pelvis_brace.current}",
        step5?.orthopaedic_bracing?.hip_pelvis_brace?.current,
      ],
      [
        "{step5.orthopaedic_bracing.hip_pelvis_brace.interested}",
        step5?.orthopaedic_bracing?.hip_pelvis_brace?.interested,
      ],
      [
        "{step5.orthopaedic_bracing.knee_brace.past}",
        step5?.orthopaedic_bracing?.knee_brace?.past,
      ],
      [
        "{step5.orthopaedic_bracing.knee_brace.current}",
        step5?.orthopaedic_bracing?.knee_brace?.current,
      ],
      [
        "{step5.orthopaedic_bracing.knee_brace.interested}",
        step5?.orthopaedic_bracing?.knee_brace?.interested,
      ],
      [
        "{step5.orthopaedic_bracing.ankle_foot_brace.past}",
        step5?.orthopaedic_bracing?.ankle_foot_brace?.past,
      ],
      [
        "{step5.orthopaedic_bracing.ankle_foot_brace.current}",
        step5?.orthopaedic_bracing?.ankle_foot_brace?.current,
      ],
      [
        "{step5.orthopaedic_bracing.ankle_foot_brace.interested}",
        step5?.orthopaedic_bracing?.ankle_foot_brace?.interested,
      ],
      [
        "{step6.is_no_replacement_for_physician_consent}",
        step6?.is_no_replacement_for_physician_consent,
      ],
    ];

    checkboxes.forEach(
      ([field, condition]) => condition && safeCheckBox(field)
    );

    if (step6?.signature_url?.url) {
      const signatureImage = await pdfDoc.embedPng(
        await fs.readFile(
          path.join(__dirname, "../../" + step6.signature_url.url)
        )
      );
      const signatureField = form.getField("{step6.signature_image}");
      const { x, y, width, height } = signatureField.acroField
        .getWidgets()[0]
        .getRectangle();
      pdfDoc.getPages()[4].drawImage(signatureImage, { x, y, width, height });
    }

    form.flatten({ updateFieldAppearances: true });

    const pdfBytes = await pdfDoc.save();
    const filePath = path.join(os.tmpdir(), `form_${formId}_${Date.now()}.pdf`);
    await fs.writeFile(filePath, pdfBytes);
    return { filePath };
  } catch (error) {
    console.error("Export PDF error:", error);
    throw {
      status: 500,
      message: "Failed to export full PDF",
      originalError: error.message,
    };
  }
};

module.exports = { exportFormToPDF };
