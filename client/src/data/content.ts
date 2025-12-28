import { BookOpen, Code, Database, Globe, LineChart, Server, Shield, Smartphone, Settings, BarChart } from "lucide-react";

export const SERVICES = [
  {
    title: "Tech Consulting",
    description: "Strategic technology planning and implementation for modern businesses.",
    icon: Globe,
  },
  {
    title: "Data Analytics",
    description: "Transforming raw data into actionable business insights.",
    icon: LineChart,
  },
  {
    title: "Dashboard & App Dev",
    description: "Custom dashboards and applications tailored to your workflow.",
    icon: Smartphone,
  },
  {
    title: "Cloud Automation",
    description: "Streamlining operations with scalable cloud solutions.",
    icon: Server,
  },
  {
    title: "Digital Transformation",
    description: "Modernizing legacy systems for the digital age.",
    icon: Code,
  },
  {
    title: "Business Intelligence",
    description: "Advanced reporting and predictive modeling.",
    icon: Database,
  },
  {
    title: "Data Platform Engineering",
    description: "Designing and building scalable, secure data platforms that enable seamless data integration, storage, and processing across your organization.",
    icon: Database,
  },
  {
    title: "Process Automation",
    description: "Automating repetitive business processes to improve efficiency, reduce errors, and accelerate operational workflows.",
    icon: Settings,
  },
  {
    title: "Power BI Solutions",
    description: "Creating interactive Power BI dashboards and reports that transform complex data into clear, actionable insights for better decision-making.",
    icon: BarChart,
  },
];

export const COURSES = {
  finance: [
    { 
      title: "ACS (Institute of Company Secretaries of India)", 
      id: "acs",
      description: "Comprehensive professional program focusing on corporate governance, company law, and secretarial practices. Master the legal frameworks, board procedures, and compliance requirements essential for organizational leadership. Develop expertise in regulatory affairs and strategic corporate management."
    },
    { 
      title: "CA (Institute of Chartered Accountants of India)", 
      id: "ca",
      description: "Prestigious certification covering accounting, auditing, taxation, and financial management excellence. Learn from industry experts to build proficiency in international financial reporting standards, tax planning, and audit procedures that shape the financial landscape globally."
    },
    { 
      title: "CMA (Institute of Cost and Management Accountants)", 
      id: "cma",
      description: "Specialized training in cost reduction, resource management, and strategic financial planning. Develop advanced skills in financial analysis, budgeting, and performance management to drive organizational profitability and efficiency across all sectors."
    },
    { 
      title: "ICSA (London, Australia, Hong Kong, Singapore)", 
      id: "icsa",
      description: "International qualification for aspiring chartered secretaries and governance professionals globally. Gain world-class credentials recognized across multiple countries, enabling you to lead corporate governance initiatives in multinational organizations."
    },
    { 
      title: "CFA Australia", 
      id: "cfa-aus",
      description: "Advanced investment analysis and portfolio management certification recognized across Australia. Specialize in equity research, fixed income analysis, and derivative instruments while gaining credentials valued by top financial institutions in the Asia-Pacific region."
    },
    { 
      title: "CFA USA", 
      id: "cfa-usa",
      description: "The gold standard in investment professional credentials, focusing on ethics and investment tools. Master financial analysis, asset allocation, and portfolio management to unlock leadership roles in globally renowned financial institutions and investment firms."
    },
    { 
      title: "ACCA", 
      id: "acca",
      description: "Global body for professional accountants, offering a comprehensive path to international accounting careers. Develop expertise in international financial reporting, tax strategy, and audit compliance while gaining credentials valued by multinational corporations and accounting firms worldwide."
    },
    { 
      title: "CIMA", 
      id: "cima",
      description: "Focuses on management accounting and business strategy to drive organizational sustainable success. Learn to translate financial insights into strategic business decisions, managing risks and creating value in complex corporate environments."
    },
  ],
  tech: [
    { 
      title: "Java Stack", 
      id: "java",
      description: "Master enterprise-grade backend development using Java, Spring Boot, and robust architectures. Build scalable microservices, implement design patterns, and develop high-performance applications trusted by Fortune 500 companies worldwide. Gain expertise in distributed systems and cloud-native development."
    },
    { 
      title: "MEAN & MERN Stack", 
      id: "mern",
      description: "Full-stack JavaScript mastery with MongoDB, Express, Angular/React, and Node.js. Create modern, responsive web applications with real-time capabilities. Learn state management, API design, and deployment strategies used by leading tech companies and startups."
    },
    { 
      title: "Python", 
      id: "python",
      description: "Versatile programming for data science, automation, and backend development with Python. Build machine learning models, develop web applications with Django/FastAPI, and create powerful automation scripts. Leverage Python's ecosystem for AI, data analytics, and scientific computing."
    },
    { 
      title: "Business Intelligence (BI)", 
      id: "bi",
      description: "Transform data into insights using Power BI, Tableau, and advanced data modeling techniques. Master data visualization, dashboard design, and advanced analytics to drive data-informed business decisions. Create compelling narratives from complex datasets for executive audiences."
    },
    { 
      title: "Analytics", 
      id: "analytics",
      description: "Predictive modeling and statistical analysis to drive data-informed business decisions. Learn advanced statistical techniques, hypothesis testing, and forecasting methodologies. Apply A/B testing and experimentation frameworks used by leading tech and finance companies."
    },
    { 
      title: "AI Basics", 
      id: "ai",
      description: "Introduction to machine learning, neural networks, and the future of artificial intelligence. Understand deep learning architectures, natural language processing, and computer vision fundamentals. Build end-to-end AI projects and explore the frontier of modern AI applications."
    },
  ],
  traditional: [
    { 
      title: "Nalayira Divya Prabandham", 
      id: "ndp",
      description: "Deep study of the 4,000 Tamil verses composed by the Alvars in praise of Lord Vishnu. Explore the philosophical depths of Vaishnavism, devotional traditions, and the spiritual messages embedded in these sacred hymns. Understand the historical and cultural significance of this ancient treasury of wisdom."
    },
    { 
      title: "Vedas", 
      id: "vedas",
      description: "Structured learning of the ancient sacred scriptures, including Rig, Yajur, Sama, and Atharva Veda. Delve into Vedic philosophy, ritual traditions, and metaphysical concepts. Understand the foundation of Indian civilization and universal wisdom passed down through millennia."
    },
  ],
};

export const ALL_COURSES = [
  ...COURSES.finance,
  ...COURSES.tech,
  ...COURSES.traditional,
];

export const SOCIALS = [
  { name: "Facebook", url: "https://www.facebook.com/profile.php?id=100068014312188", color: "hover:text-blue-600" },
  { name: "Instagram", url: "https://www.instagram.com/arvind_axion/", color: "hover:text-pink-600" },
  { name: "YouTube", url: "https://youtube.com/@arvindandswamy", color: "hover:text-red-600" },
  { name: "LinkedIn", url: "https://www.linkedin.com/in/arvindaxion", color: "hover:text-blue-700" },
];
