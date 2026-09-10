/**
 * Certifications — shared by the homepage CertificationsSection (and available to
 * the /skills page if surfaced there).
 */

export interface Certification {
  index: string;
  title: string;
  provider: string;
  type: string;
  duration: string;
  year: string;
  credentialUrl: string;
  badgeId?: string;
  hasBadge: boolean;
  skills: string[];
  highlights: string[];
}

export const CERTS: Certification[] = [
  {
    index: "01",
    title: "Meta Back-End Developer",
    provider: "Meta · Coursera",
    type: "PROFESSIONAL CERTIFICATE",
    duration: "8 Months",
    year: "2024",
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/certificate/383BWT7NBYK3",
    badgeId: "484481cb-706a-4a4c-bdfd-5472c4b02eb4",
    hasBadge: true,
    skills: [
      "Python", "Django REST", "SQL", "Git & Version Control", "Full-Stack Dev",
      "API Design", "Bootstrap", "OOP", "Cloud Hosting", "Unix Commands",
    ],
    highlights: [
      "8-course professional program covering back-end and full-stack development",
      "Built and deployed RESTful APIs using Python, Django, and MySQL",
      "Covered cloud hosting, version control, Linux CLI, and data structures",
    ],
  },
  {
    index: "02",
    title: "Python 3 Programming",
    provider: "University of Michigan · Coursera",
    type: "SPECIALIZATION",
    duration: "3 Months",
    year: "2023",
    credentialUrl: "https://www.coursera.org/account/accomplishments/specialization/certificate/2PDHHY3L3X32",
    hasBadge: false,
    skills: [
      "Python 3", "OOP", "Unit Testing", "Web Scraping", "JSON / REST APIs",
      "Data Structures", "File I/O", "Debugging",
    ],
    highlights: [
      "5-course specialization from basics through advanced Python programming",
      "Built programs that fetch and process data from live internet APIs",
      "Hands-on practice with error handling, unit testing, and software design",
    ],
  },
  {
    index: "03",
    title: "Intro to Python Programming",
    provider: "University of Pennsylvania · Coursera",
    type: "COURSE",
    duration: "3 Weeks",
    year: "2023",
    credentialUrl: "https://www.coursera.org/account/accomplishments/certificate/4SV6X5GSUN40",
    hasBadge: false,
    skills: [
      "Python", "Computational Thinking", "Data Structures", "Functions", "Scripting", "File I/O",
    ],
    highlights: [
      "Foundational course covering Python syntax, data structures, and functions",
      "Designed and wrote fully-functional Python programs end-to-end",
      "Introduction to Jupyter and integrated development environments",
    ],
  },
];
