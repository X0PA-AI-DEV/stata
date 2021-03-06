"use strict";

const dbterms = [
  "early childhood education",
  "primary education",
  "lower secondary education",
  "upper secondary education",
  "high school or equivalent",
  "certification",
  "vocational",
  "diploma",
  "associate degree",
  "bachelor's degree",
  "master's degree",
  "phd",
  "medicine"
];

const qualificationTypes = [
  {
    typeId: 1,
    typeName: "Early Childhood Education"
  },
  {
    typeId: 2,
    typeName: "Primary Education"
  },
  {
    typeId: 3,
    typeName: "Lower Secondary Education"
  },
  {
    typeId: 4,
    typeName: "Upper Secondary Education"
  },
  {
    typeId: 5,
    typeName: "High School or Equivalent"
  },
  {
    typeId: 6,
    typeName: "Certification"
  },
  {
    typeId: 7,
    typeName: "Vocational"
  },
  {
    typeId: 8,
    typeName: "Diploma"
  },
  {
    typeId: 9,
    typeName: "Associate Degree"
  },
  {
    typeId: 10,
    typeName: "Bachelor's Degree"
  },
  {
    typeId: 11,
    typeName: "Master's Degree"
  },
  {
    typeId: 12,
    typeName: "PhD"
  },
  {
    typeId: 13,
    typeName: "Medicine"
  }
];

/*
  specialeducation
  some high school or equivalent
  ged
  secondary
  high school or equivalent
  certification
  vocational
  some college
  HND/HNC or equivalent
  associates
  international
  bachelors
  some post-graduate
  masters
  intermediategraduate
  professional
  postprofessional
  doctorate
  postdoctorate
*/
const qualifications = {
  "early childhood education": 1,
  "primary education": 2,
  "lower secondary education": 3,
  "upper secondary education": 4,
  "high school or equivalent": 5,
  certification: 6,
  vocational: 7,
  diploma: 8,
  "associate degree": 9,
  "bachelor's degree": 10,
  "master's degree": 11,
  phd: 12,
  medicine: 13,

  //infer
  "bachelors degree": 10,
  "masters degree": 11,
  postdoctorate: 12,
  doctorate: 12
};

const getQualification = (input, t) => {
  const linput = (input + "").toLowerCase();
  if (t === "id") {
    if (typeof input === "string") {
      let qualTypeId = qualifications[linput];
      if (qualTypeId) return qualTypeId;
      if (input.includes("bachelor")) {
        return 10;
      }
      if (input.includes("master")) {
        return 11;
      }
      if (input.includes("phd")) {
        return 12;
      }
      if (input.includes("medicine")) {
        return 13;
      }
      if (input.includes("associate")) {
        return 9;
      }
      if (input.includes("diploma")) {
        return 8;
      }
      if (input.includes("vocational")) {
        return 7;
      }
      if (input.includes("certific")) {
        return 6;
      }
      if (
        input.includes("high school") ||
        input.includes("highschool") ||
        input.includes("high")
      ) {
        return 5;
      }
      if (input.includes("secondary")) {
        if (input.includes("upper")) {
          return 4;
        }
        if (input.includes("lower")) {
          return 3;
        }
      }
      if (input.includes("primary")) {
        return 2;
      }
      if (input.includes("early") || input.includes("childhood")) {
        return 1;
      }
    } else {
      return 10;
    }
  }
  if (t === "name") {
    if (typeof input === "number") {
      return qualifications[Number(linput)] || "bachelor's degree";
    } else {
      return dbterms.includes(linput) ? linput : "bachelor's degree";
    }
  }
};

module.exports = {
  name: input => getQualification(input, "name"),
  id: input => getQualification(input, "id"),
  get list() {
    return terms;
  }
};
