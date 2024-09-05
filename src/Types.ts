import fclensShot1 from "./assets/fclensShot.png";
import fclensShot2 from "./assets/fclensShot2.png";
import fclensShot3 from "./assets/fclensShot3.png";
import fclensShot4 from "./assets/fclensShot4.png";

import fcabalShot1 from "./assets/frontierscabalShot.png";
import fcabalShot2 from "./assets/fcShot2.png"
import fcabalShot3 from "./assets/fcShot3.png";
import fcabalShot4 from "./assets/fcShot4.png"
import fcabalShot5 from "./assets/fcShot5.png";
import fcabalShot6 from "./assets/fcShot6.png"

import azraShot1 from "./assets/azraShot1.png";
import azraShot2 from "./assets/azraShot2.png";
import azraShot3 from "./assets/azraShot3.png";
import azraShot4 from "./assets/azraShot4.png";
import azraShot5 from "./assets/azraShot5.png";
import azraShot6 from "./assets/azraShot6.png";
import azraShot7 from "./assets/azraShot7.png";
import azraShot8 from "./assets/azraShot8.png";


import flipperShot from "./assets/flipperShot.png";
import geegpayShot from "./assets/geegpayShot.png";

import microlensShot1 from "./assets/microlens.png"
import microlensShot2 from "./assets/microlensShot2.png"
import microlensShot3 from "./assets/microlensShot3.png"
import microlensShot4 from "./assets/microlensShot4.png"
import microlensShot5 from "./assets/microlensShot5.png"
import microlensShot6 from "./assets/microlensShot6.png"
import bitxendShot from "./assets/bitxendShot.png";
import ipsShot from "./assets/ipsShot.png";
import { DocumentData } from "firebase/firestore";

export enum ContactType {
  github = "github",
  hashnode = "hashnode",
  linkedin = "linkedin",
  twitter = "twitter",
  youtube = "youtube",
  email = "email",
  buymeacoffee = "buymeacoffee",
  googlescholar = "googlescholar",
}
export const Host = "";

export interface Article extends DocumentData {
  id?: string;
  banner: string;
  content: string;
  slug: string;
  postedAt: string;
  title: string;
  summary: string;
  tags: Array<string>;
}

export enum Format {
  shortname = "Jhmeel",
  fullname = "Jhmeel Mikail",
  occupation = "Software Engineer",
  placeOfWork = "",
  experience='5+'
}
export interface Contact {
  twitter: string;
  site: string;
  calendly?: string;
  links: Record<ContactType, string>;
}
export enum Theme {
  LIGHT = "light",
  DARK = "dark",
}

export const contact: Contact = {
  twitter: "",
  site: "",
  calendly: "https://calendly.com/jhmeel",
  links: {
    github: "https://github.com/jhmeel",
    linkedin: "https://linkedin.com/in/jhmeel-mikail-26796423b",
    hashnode: "https://jhmeel.hashnode.dev/",
    googlescholar: "/",
    twitter: "https://x.com/urstrulyJhmeel",
    youtube: "https://www.youtube.com/",
    email: "mailto:jhmeel02@gmail.com",
    buymeacoffee: "https://www.buymeacoffee.com/muhammadjhu",
  },
};

export const Colors = {
  // Languages
  go: "#00ADD8",
  python: "#4B8BBE",
  typescript: "#234A84",
  javascript: "#F7DF1E",

  // Frontend
  web: "#2D2D2D",
  react: "#61DAF6",
  nextjs: "#000000",

  // Backend
  graphql: "#E535AB",
  node: "#68A063",
  django: "#092E20",

  // Tools, Libs
  webpack: "#8DD6F9",
  babel: "#F5DB53",
  redux: "#764ABC",

  // Mobile
  reactnative: "#2D2D2D",
  android: "#56A036",
  ios: "#0C76E2",

  // Databases
  arangodb: "#68A063",
  postgres: "#336791",
  mongo: "#4DB33D",
  redis: "#D82C20",
  firebase: "#FFCA28",

  // Cloud
  aws: "#FF9900",
  gcp: "#4285F4",
  docker: "#0DB7Ed",
  kubernetes: "#326CE5",
  terraform: "#7B42BC",
  clouudinary: "#0cae5b",

  // Messaging
  nats: "#199bfc",
  kafka: "#000000",

  // Social
  linkedin: "#0077B5",
  twitter: "#1DA1F2",
  youtube: "#FF0000",
  googlescholar: "#4285F4",
  email: "#D44638",
  buymeacoffee: "#FFDD00",
  reddit: "#ff4500",
  facebook: "#1877f2",

  // Misc.
  git: "#F1502F",
  microservices: "#1890ff",
  distributedsystems: "#404040",
  discuss: "#404040",
  testing: "#049C64",
  backend: "#404040",
  devops: "#059F00",
  serverless: "#000000",
  resume: "#EEEBFF",
  opensource: "#26BE00",
  tutorial: "#4dd0e1",
};

export type Deployment = {
  web?: string;
  android?: string;
  ios?: string;
};

export interface SubProject {
  title: string;
  description: string;
  repository: string;
  deployment: Deployment;
}

export const defaultDimensions = [450, 220];

export enum Stack {
  // Languages
  go,
  typescript,
  javascript,
  python,

  // Frontend
  react,
  redux,
  reactnative,

  // Backend
  graphql,
  node,
  django,

  // Cloud
  aws,
  gcp,
  cloudinary,

  // Messaging
  nats,
  kafka,

  // Databases
  arangodb,
  redis,
  postgres,
  mongo,
  firebase,

  // Tools
  docker,
  kubernetes,
  terraform,
}

export const WorkStack = [
  Stack.typescript,
  Stack.node,
  Stack.go,
  Stack.python,
  Stack.react,
  Stack.aws,
  Stack.gcp,
  Stack.kubernetes,
  Stack.docker,
  Stack.terraform,
  Stack.nats,
  Stack.kafka,
  Stack.graphql,
  Stack.node,
  Stack.django,
  Stack.aws,
  Stack.gcp,
  Stack.kubernetes,
  Stack.postgres,
  Stack.redis,
  Stack.arangodb,
  Stack.reactnative,
  Stack.cloudinary,
];

type StackInfoMap = {
  value: string;
  color: string;
};

export const StackInfo: Record<Stack, StackInfoMap> = {
  [Stack.typescript]: {
    value: "TypeScript",
    color: Colors.typescript,
  },
  [Stack.javascript]: {
    value: "JavaScript",
    color: Colors.javascript,
  },
  [Stack.go]: {
    value: "Go",
    color: Colors.go,
  },
  [Stack.react]: {
    value: "React",
    color: Colors.react,
  },
  [Stack.reactnative]: {
    value: "React Native",
    color: Colors.reactnative,
  },
  [Stack.redux]: {
    value: "Redux",
    color: Colors.redux,
  },
  [Stack.graphql]: {
    value: "GraphQL",
    color: Colors.graphql,
  },
  [Stack.aws]: {
    value: "AWS",
    color: Colors.aws,
  },
  [Stack.gcp]: {
    value: "Google Cloud",
    color: Colors.gcp,
  },
  [Stack.python]: {
    value: "Python",
    color: Colors.python,
  },
  [Stack.node]: {
    value: "Node",
    color: Colors.node,
  },
  [Stack.django]: {
    value: "Django",
    color: Colors.django,
  },
  [Stack.nats]: {
    value: "NATS",
    color: Colors.nats,
  },
  [Stack.kafka]: {
    value: "Kafka",
    color: Colors.kafka,
  },
  [Stack.arangodb]: {
    value: "ArangoDB",
    color: Colors.arangodb,
  },
  [Stack.postgres]: {
    value: "Postgres",
    color: Colors.postgres,
  },
  [Stack.redis]: {
    value: "Redis",
    color: Colors.redis,
  },
  [Stack.mongo]: {
    value: "MongoDB",
    color: Colors.mongo,
  },
  [Stack.firebase]: {
    value: "Firebase",
    color: Colors.firebase,
  },
  [Stack.docker]: {
    value: "Docker",
    color: Colors.docker,
  },
  [Stack.kubernetes]: {
    value: "Kubernetes",
    color: Colors.kubernetes,
  },
  [Stack.terraform]: {
    value: "Terraform",
    color: Colors.terraform,
  },
  [Stack.cloudinary]: {
    value: "Cloudinary",
    color: Colors.clouudinary,
  },
};

export interface Project {
  title: string;
  slug: string;
  website: string;
  banner: string;
  description: string;
  shortDescription?: string;
  repository?: string | null;
  stack: Stack[];
  dimensions?: Array<number>; // Array of [height, width]
  screenshots: string[];
  deployment: Deployment;
  subProjects?: SubProject[];
}

export const projects: Project[] = [
  {
    title: "Microlens",
    slug: "microlens",
    banner: microlensShot1,
    website: "https://microlens-sf5r.onrender.com/",
    description:
      "Microlens is a progressive web app powerd by Gemini AI built for everyone, from healthcare providers to everyday users, bringing accurate diagnosis and health education right to your fingertips.",
    shortDescription:
      "Microlens is a progressive web app powerd by Gemini AI built for everyone, from healthcare providers to everyday users, bringing accurate diagnosis and health education right to your fingertips.",
    repository: "https://github.com/jhmeel/microlens",
    stack: [
      Stack.typescript,
      Stack.react,
      Stack.redux,
      Stack.python,
      Stack.firebase,
      Stack.docker,
    ],
    dimensions: [360, 640],
    screenshots: [microlensShot1,microlensShot2,microlensShot3,microlensShot4,microlensShot5,microlensShot6],
    deployment: {
      web: "https://microlens-sf5r.onrender.com",
    },
    subProjects: [],
  },
  {
    title: "Azra",
    slug: "azra",
    banner: azraShot1,
    website: "https://azra.onrender.com",
    description:
      "Azra seamlessly links patients with healthcare facilities while keeping them informed with the latest updates in the medical field.",
    shortDescription:
      "Azra seamlessly links patients with healthcare facilities while keeping them informed with the latest updates in the medical field.",
    repository: "https://github.com/jhmeel/azra__",
    stack: [
      Stack.typescript,
      Stack.react,
      Stack.redux,
      Stack.node,
      Stack.mongo,
      Stack.cloudinary,
      Stack.docker,
      Stack.gcp,
      Stack.redis
    ],
    dimensions: [360, 640],
    screenshots: [azraShot1,azraShot2,azraShot3,azraShot4,azraShot4,azraShot5,azraShot6,azraShot7,azraShot8],
    deployment: {
      web: "https://frontierscabal.onrender.com",
    },
    subProjects: [],
  },
  {
    title: "Frontierscabal",
    slug: "frontierscabal",
    banner: fcabalShot1,
    website: "https://frontierscabal.onrender.com",
    description:
      "An ultimate all-in-one progressive-web-app designed to cater to every student's needs. Built with extensive database of pastquestions and answers,  blog editors, event notifier, and course curriculum.",
    shortDescription:
      "An ultimate all-in-one progressive-web-app designed to cater to every student's needs.",
    repository: "https://github.com/jhmeel/frontierscabal",
    stack: [
      Stack.typescript,
      Stack.react,
      Stack.redux,
      Stack.node,
      Stack.mongo,
      Stack.cloudinary,
      Stack.docker,
    ],
    dimensions: [360, 640],
    screenshots: [fcabalShot1,fcabalShot2,fcabalShot3,fcabalShot4,fcabalShot5,fcabalShot6],
    deployment: {
      web: "https://frontierscabal.onrender.com",
    },
    subProjects: [],
  },
  /*{
    title: "Flipper",
    slug: "flipper",
    banner: flipperShot,
    website: "https://flipper-rsqw.onrender.com",
    description: `An investment platform, providing many lucrative package with daily Returns on task completion.`,
    shortDescription:
      "An investment web app, providing many lucrative package with daily Returns on task completion",
    repository: "https://github.com/jhmeel/flipper",
    stack: [Stack.typescript, Stack.react,  Stack.redux, Stack.node, Stack.mongo],
    screenshots: [],
    deployment: {
      web: "https://flipper-rsqw.onrender.com",
    },
    subProjects: [],
  },*/
  {
    title: "Bitxend",
    slug: "bitxend",
    website: "https://bitxend.onrender.com",
    banner: bitxendShot,
    description:
      "An online peer to peer file sharing system, with a robust peer discovery mechanism.",
    repository: "https://github.com/jhmeel/bitxend",
    stack: [Stack.typescript, Stack.node, Stack.postgres],
    screenshots: [bitxendShot],
    deployment: {
      web: "https://bitxend.onrender.com",
    },
    subProjects: [],
  },
  {
    title: "IPS",
    slug: "IPS",
    banner: ipsShot,
    website: "https://IPS.onrender.com",
    description: `A pluggable intrusion detection and prevention system, with a clean dashboard for rule configuration and logs streaming.`,
    repository: "https://github.com/jhmeel/ips",
    stack: [Stack.javascript, Stack.react, Stack.python, Stack.postgres],
    screenshots: [ipsShot],
    deployment: {
      web: "https://IPS.onrender.com",
    },
    subProjects: [],
  },
  {
    title: "Analytics Dashboard",
    slug: "analytics-dashboard",
    website: "https://geepay-analytics-dashboard.onrender.com",
    repository: "https://github.com/jhmeel/geepay-analytics-dashboard",
    banner: geegpayShot,
    description:
      "A handy analytics dashboard to easily view and manage metrics.",
    stack: [Stack.react, Stack.typescript],
    screenshots: [geegpayShot],
    deployment: {
      web: "https://geepay-analytics-dashboard.onrender.com",
    },
    subProjects: [],
  },
  {
    title: "Fclens",
    slug: "fclens",
    website: "https://fclens.onrender.com",
    repository: "https://github.com/jhmeel/fclens",
    banner: fclensShot1,
    description:
      "A website dedicated to facilitating the registration process for programming courses.",
    stack: [Stack.react, Stack.typescript, Stack.mongo, Stack.node],
    screenshots: [fclensShot1,fclensShot2,fclensShot3,fclensShot4],
    deployment: {
      web: "https:/fclens.onrender.com",
    },
    subProjects: [],
  },
];
