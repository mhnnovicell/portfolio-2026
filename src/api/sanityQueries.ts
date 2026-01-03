import {
  Profile,
  Project,
  Experience,
  Testimonial,
  Education,
  Certification,
  Skill,
  Navigation,
  Whatido,
} from '../../sanity.types';
import { client } from '../sanity/lib/client';

// Query to fetch profile/hero data
export const profileQuery = `*[_type == "profile"][0] {
  _id,
  name,
  title,
  tagline,
  bio,
  location,
  availableForHire,
  email,
  "profileImage": select(
    defined(profileImage.asset) => profileImage.asset->url,
    defined(profileImage.public_id) => profileImage.url,
    profileImage
  ),
  social {
    github,
    linkedin,
    twitter,
    email
  },
  stats {
    projects,
    yearsExperience,
    clients
  }
}`;

// Query to fetch all projects
export const projectsQuery = `*[_type == "project"] | order(order asc) {
  _id,
  title,
  description,
  "image": select(
    defined(image.asset) => image.asset->url,
    defined(image.public_id) => image.url,
    image
  ),
  tags,
  githubUrl,
  liveUrl
}`;

// Query to fetch work experience
export const experienceQuery = `*[_type == "experience"] | order(startDate desc) {
  _id,
  company,
  role,
  startDate,
  endDate,
  location,
  description,
  techStack,
  achievements
}`;

// Query to fetch testimonials
export const testimonialsQuery = `*[_type == "testimonial"] | order(order asc) {
  _id,
  name,
  role,
  company,
  "image": select(
    defined(image.asset) => image.asset->url,
    defined(image.public_id) => image.url,
    image
  ),
  content,
  rating
}`;

// Query to fetch education
export const educationQuery = `*[_type == "education"] | order(startDate desc) {
  _id,
  degree,
  institution,
  startDate,
  endDate,
  description,
  achievements
}`;

// Query to fetch certifications
export const certificationsQuery = `*[_type == "certification"] | order(year desc) {
  _id,
  name,
  issuer,
  year
}`;

// Query to fetch skills
export const skillsQuery = `*[_type == "skill"] | order(order asc) {
  _id,
  category,
  skills
}`;

// Query to fetch navigation data
export const navigationQuery = `*[_type == "navigation"][0] {
  _id,
  logo,
  logoSuffix,
  navItems[] {
    label,
    href
  },
  socialLinks[] {
    platform,
    url
  }
}`;

export const whatIDoQuery = `*[_type == "whatido"] | order(order asc) {
  _id,
  title,
  description,
  icon,
  gridSpan {
    colSpan,
    rowSpan
  },
  gradient,
  order
}`;

export async function safeFetch<T>(query: string): Promise<T | undefined> {
  if (!client) return undefined;
  try {
    return await client.fetch<T>(query);
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return undefined;
  }
}

export async function fetchProfile() {
  return safeFetch<Profile>(profileQuery);
}

export async function fetchProjects() {
  return safeFetch<Project[]>(projectsQuery);
}

export async function fetchExperience() {
  return safeFetch<Experience[]>(experienceQuery);
}

export async function fetchTestimonials() {
  return safeFetch<Testimonial[]>(testimonialsQuery);
}

export async function fetchEducation() {
  return safeFetch<Education[]>(educationQuery);
}

export async function fetchCertifications() {
  return safeFetch<Certification[]>(certificationsQuery);
}

export async function fetchSkills() {
  return safeFetch<Skill[]>(skillsQuery);
}

export async function fetchNavigation() {
  return safeFetch<Navigation>(navigationQuery);
}

export async function fetchWhatIDo() {
  return safeFetch<Whatido[]>(whatIDoQuery);
}
