import {
  fetchCertifications,
  fetchEducation,
  fetchExperience,
  fetchNavigation,
  fetchProfile,
  fetchProjects,
  fetchSkills,
  fetchTestimonials,
  fetchWhatIDo,
} from '@/api/sanityQueries';
import { EducationSection } from '@/components/sections/education';
import { ExperienceSection } from '@/components/sections/experience';
import { Navigation } from '@/components/sections/navigation';
import { ProfileSection } from '@/components/sections/profile';
import { ProjectsSection } from '@/components/sections/projects';
import { SkillsSection } from '@/components/sections/skills';
import { TestimonialsSection } from '@/components/sections/testimonials';
import { WhatIDo } from '@/components/sections/whatIDo';

export default async function Home() {
  const [
    navigation,
    profile,
    projects,
    experiences,
    testimonials,
    education,
    certifications,
    skills,
    whatIDo,
  ] = await Promise.all([
    fetchNavigation(),
    fetchProfile(),
    fetchProjects(),
    fetchExperience(),
    fetchTestimonials(),
    fetchEducation(),
    fetchCertifications(),
    fetchSkills(),
    fetchWhatIDo(),
  ]);

  return (
    <main className='min-h-screen bg-background'>
      <ProfileSection data={profile} />
      <Navigation data={navigation} />
      <WhatIDo items={whatIDo} />
      <SkillsSection skills={skills} />
      <EducationSection education={education} certifications={certifications} />
      <ExperienceSection experiences={experiences} />
      <ProjectsSection projects={projects} />
      <TestimonialsSection testimonials={testimonials} />

      {/* 
    
      <Footer /> */}
    </main>
  );
}
