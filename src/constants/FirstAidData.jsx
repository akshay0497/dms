import { useTranslation } from "react-i18next";

export const useFirstAidData = () => {
  const { t } = useTranslation();

  return [
    { id: 1, title: t("FirstAidHomeData.AMPUTATIONS") , src: require("../assets/Images/Amputation.webp"), screen: "Amputations" },
    { id: 2, title: t("FirstAidHomeData.ALLERGIES_ANAPHYLAXIS") , src: require("../assets/Images/Allergies.webp"),screen: "AllergiesAnaphylaxis"  },
    { id: 3, title: t("FirstAidHomeData.ASTHMA"), src: require("../assets/Images/Asthama.webp"), screen: "Asthma"  },
    { id: 4, title: t("FirstAidHomeData.BLEEDING"), src: require("../assets/Images/Bleeding.webp"), screen: "Bleeding" },
    { id: 5, title: t("FirstAidHomeData.BITES_STINGS_BEES_WASPS_HORNETS_ANTS") , src: require("../assets/Images/Bitewasps.webp"),screen: "Bees" },
    { id: 6, title: t("FirstAidHomeData.BITES_STINGS_RED_BACK_OTHER_SPIDERS") , src: require("../assets/Images/Biteredback.webp"),screen: "Redback" },
    { id: 7, title: t("FirstAidHomeData.BITES_STINGS_SNAKE_FUNNEL_WEB") , src: require("../assets/Images/Snakebite.webp"),screen: "Funnelspider" },
    { id: 8, title: t("FirstAidHomeData.BITES_STINGS_TICK") , src: require("../assets/Images/Bitetick.webp"),screen: "Bitetick" },
    { id: 9, title: t("FirstAidHomeData.BROKEN_BONE_FRACTURE") , src: require("../assets/Images/Broken.webp"),screen :"BrokenBone" },
    { id: 10, title: t("FirstAidHomeData.BURNS_CHEMICAL"), src: require("../assets/Images/Burns.webp") ,screen: "Burns" }, 
    { id: 11, title: t("FirstAidHomeData.BURNS_FIRE_STOVE_STEAM_SUNBURN"), src: require("../assets/Images/Burnsfirestove.webp"),  screen: "Burnfirestove"},
    { id: 12, title: t("FirstAidHomeData.CHOKING"), src: require("../assets/Images/Choking.webp"),screen: "Choking" },
    { id: 13, title: t("FirstAidHomeData.CPR_BASIC_LIFE_SUPPORT"), src: require("../assets/Images/Supportlife.webp"), screen: "FunnelCPR"},
    { id: 14, title: t("FirstAidHomeData.DIABETIC_EMERGENCY") , src: require("../assets/Images/Diabetic.webp"), screen: "DiabeticEmergency" },
    { id: 15, title: t("FirstAidHomeData.EXPOSURE_COLD_HYPOTHERMIA")  ,src: require("../assets/Images/cold.webp"), screen: "ExposureCold"},
    { id: 16, title: t("FirstAidHomeData.EXPOSURE_HEAT_HYPERTHERMIA"), src: require("../assets/Images/Heat.webp"), screen: "ExposuretoHeat"},
    { id: 17, title: t("FirstAidHomeData.EXPOSURE_HEAT_STROKE"), src: require("../assets/firstAid/stroke.webp"), screen: "HeatStroke"},
    { id: 18, title: t("FirstAidHomeData.FOREIGN_BODY_EYE") , src: require("../assets/firstAid/Foreigneye.webp"), screen: "ForeignBodyEye"},
    { id: 19, title: t("FirstAidHomeData.HEAD_INJURY"), src: require("../assets/firstAid/Headinjury.webp"), screen: "HeadInjury"},
    { id: 20, title: t("FirstAidHomeData.HEART_ATTACK"), src: require("../assets/firstAid/Heartattack.webp"), screen: "Attack" },
    { id: 21, title: t("FirstAidHomeData.MENINGITIS"), src: require("../assets/Images/Meningitis.webp"), screen: "Meningitis" },
    { id: 22, title: t("FirstAidHomeData.MINOR_WOUNDS") , src: require("../assets/Images/Minorwounds.webp"),screen: "Minorwound" },
    { id: 23, title: t("FirstAidHomeData.NOSE_BLEED") , src: require("../assets/Images/Nosebleeding.webp"),screen:"NoseBleed" },
    { id: 24, title: t("FirstAidHomeData.POISONS") , src: require("../assets/Images/poisons.webp"), screen: "Poisons"},
    { id: 25, title: t("FirstAidHomeData.RECOVERY_POSITION"), src: require("../assets/Images/Recovery.webp"),screen: "RecoveryPosition"},
    { id: 26, title: t("FirstAidHomeData.SEIZURES"), src: require("../assets/Images/Seizures.webp"), screen: "Seizures"},
    { id: 27, title: t("FirstAidHomeData.SHOCK"), src: require("../assets/Images/shock.webp"), screen: "Shock"},
    { id: 28, title: t("FirstAidHomeData.STRAINS_SPRAINS_BRUISES"), src: require("../assets/Images/Strainssprains.webp") ,screen:"StrainsSprainsAndBruises" },
    { id: 29, title: t("FirstAidHomeData.STRO"), src: require("../assets/Images/Strokeinstead.webp") ,screen:"Stroke" },
    { id: 30, title: t("FirstAidHomeData.VITAL_SIGNS") , src: require("../assets/Images/Vital.webp"),screen:"VitalSign" }
  ];
};