import { GraduationCap, Award } from "@/lib/icons";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const certificates = [
  {
    title: "Meta Back-End Developer",
    titleUrl:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/383BWT7NBYK3",
    provider: "META (Coursera)",
    providerUrl:
      "https://www.coursera.org/account/accomplishments/professional-cert/383BWT7NBYK3",
    type: "Professional Certificate",
    duration: "8 Months",
    icon: "",
    learnings: [
      "Gain the technical skills required to become a qualified back-end developer",
      "Build a portfolio using my new skills and begin interview preparation including tips for what to expect when interviewing for engineering jobs",
      "Learn to use programming systems including Python Syntax, Linux commands, Git, SQL, Version Control, Cloud Hosting, APIs, JSON, XML and more",
      "Learn in-demand programming skills and how to confidently use code to solve problems",
    ],
    skills: [
      "GitHub",
      "Cloud Hosting",
      "SQL",
      "Back-End Web Development",
      "Django (Web Framework)",
      "Database Management Systems",
      "Computer Programming",
      "API Testing",
      "Bootstrap (Front-End Framework)",
      "Unix Commands",
      "Full-Stack Web Development",
      "Front-End Web Development",
      "Version Control",
      "Python Programming",
      "Data Structures",
      "Git (Version Control System)",
      "Web Design and Development",
      "Object Oriented Programming (OOP)",
      "Relational Databases",
      "Restful API",
    ],
  },
  {
    title: "Python 3 Programming",
    titleUrl:
      "https://www.coursera.org/account/accomplishments/specialization/certificate/2PDHHY3L3X32",
    provider: "University of Michigan (Coursera)",
    providerUrl:
      "https://www.coursera.org/account/accomplishments/specialization/2PDHHY3L3X32",
    type: "Specialization",
    duration: "3 Months",
    icon: "",
    learnings: [
      "Learn Python 3 basics, from the basics to more advanced concepts like lists and functions",
      "Practice and become skilled at solving problems and fixing errors in my code",
      "Gain the ability to write programs that fetch data from internet APIs and extract useful information",
    ],
    skills: [
      "Web Scraping",
      "Software Design",
      "Unit Testing",
      "Jupyter",
      "Object Oriented Design",
      "Image Analysis",
      "Data Processing",
      "Computer Programming",
      "File I/O",
      "Debugging",
      "Programming Principles",
      "JSON",
      "Unified Modeling Language",
      "Python Programming",
      "Data Import/Export",
      "Data Structures",
      "Object Oriented Programming (OOP)",
      "Data Manipulation",
      "Restful API",
      "Program Development",
    ],
  },
  {
    title: "Introduction to Python Programming",
    titleUrl:
      "https://www.coursera.org/account/accomplishments/certificate/4SV6X5GSUN40",
    provider: "University of Pennsylvania (Coursera)",
    providerUrl:
      "https://www.coursera.org/account/accomplishments/verify/4SV6X5GSUN40",
    type: "Course",
    duration: "3 Weeks",
    icon: "",
    learnings: [
      "Identify core aspects of programming and features of the Python language",
      "Use different tools for writing and running Python code",
      "Understand and apply core programming concepts like data structures, conditionals, loops, variables, and functions",
      "Design and write fully-functional Python programs using commonly used data structures, custom functions, and reading and writing to files",
    ],
    skills: [
      "Computational Thinking",
      "File I/O",
      "Scripting",
      "Jupyter",
      "Scripting Languages",
      "Data Structures",
      "Programming Principles",
      "Python Programming",
      "Software Development Tools",
      "Integrated Development Environments",
      "Computer Programming",
    ],
  },
];

export function CertificateSection() {
  const getIcon = (type: string) =>
    type === "Professional Certificate" ? Award : GraduationCap;
  return (
    <section
      id="certifications"
      className="py-24 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Certificates
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Credentials earned through real-world engineering, not theory alone
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {certificates.map((cert, index) => {
            const Icon = getIcon(cert.type);
            return (
              <a
                key={index}
                href={cert.titleUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Card
                  key={index}
                  className="p-6 sm:p-8 hover:shadow-lg transition-all duration-300"
                >
                  <CardHeader>
                    <CardTitle>
                      <div>
                        <h3 className="text-muted-foreground font-semibold">
                          <a
                            href={cert.titleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            {cert.title}
                          </a>
                        </h3>

                        <p className="text-sm text-muted-foreground">
                          <a
                            href={cert.providerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            {cert.provider}
                          </a>
                        </p>
                      </div>
                    </CardTitle>
                    <CardDescription>
                      <div className="flex flex-wrap items-start justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                          <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                            {cert.type}
                          </span>
                          <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">
                            {cert.duration}
                          </span>
                        </div>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div>
                      <p className="text-sm font-medium mb-2">What I learned</p>
                      <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                        {cert.learnings.map((item, i) => (
                          <li key={i} className="text-sm">
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary cursor-default"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                  {/* <div className="flex gap-4">
                  
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 space-y-4">

                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold">
                          <a
                            href={cert.titleUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            {cert.title}
                          </a>
                        </h3>

                        <p className="text-sm text-muted-foreground">
                          <a
                            href={cert.providerUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-primary transition-colors"
                          >
                            {cert.provider}
                          </a>
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-primary/10 text-primary">
                          {cert.type}
                        </span>
                        <span className="text-xs font-medium px-3 py-1 rounded-full bg-muted text-muted-foreground">
                          {cert.duration}
                        </span>
                      </div>
                    </div>


                    <div>
                      <p className="text-sm font-medium mb-2">What I learned</p>
                      <ul className="list-disc pl-5 space-y-2 marker:text-primary">
                        {cert.learnings.map((item, i) => (
                          <li key={i} className="text-sm">
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {cert.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs px-3 py-1 rounded-full bg-primary/10 text-primary"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div> */}
                </Card>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
