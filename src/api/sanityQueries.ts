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
  "profileImage": profileImage.asset->url,
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
  "image": image.asset->url,
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
  "image": image.asset->url,
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

export async function safeFetch<T>(query: string): Promise<T | null> {
  if (!client) return null;
  try {
    return await client.fetch<T>(query);
  } catch (error) {
    console.error('Sanity fetch error:', error);
    return null;
  }
}
