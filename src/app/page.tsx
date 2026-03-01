import { Suspense } from 'react';
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
import { BackToTop } from '@/components/ui/backToTop';

async function SkillsAsync({
  promise,
}: {
  promise: ReturnType<typeof fetchSkills>;
}) {
  return <SkillsSection skills={await promise} />;
}

async function EducationAsync({
  educationPromise,
  certificationsPromise,
}: {
  educationPromise: ReturnType<typeof fetchEducation>;
  certificationsPromise: ReturnType<typeof fetchCertifications>;
}) {
  const [education, certifications] = await Promise.all([
    educationPromise,
    certificationsPromise,
  ]);
  return (
    <EducationSection education={education} certifications={certifications} />
  );
}

async function ExperienceAsync({
  promise,
}: {
  promise: ReturnType<typeof fetchExperience>;
}) {
  return <ExperienceSection experiences={await promise} />;
}

async function ProjectsAsync({
  promise,
}: {
  promise: ReturnType<typeof fetchProjects>;
}) {
  return <ProjectsSection projects={await promise} />;
}

async function TestimonialsAsync({
  promise,
}: {
  promise: ReturnType<typeof fetchTestimonials>;
}) {
  return <TestimonialsSection testimonials={await promise} />;
}

export default async function Home() {
  // Start fetches immediately
  const navigationPromise = fetchNavigation();
  const profilePromise = fetchProfile();
  const whatIDoPromise = fetchWhatIDo();
  const projectsPromise = fetchProjects();
  const experiencesPromise = fetchExperience();
  const testimonialsPromise = fetchTestimonials();
  const educationPromise = fetchEducation();
  const certificationsPromise = fetchCertifications();
  const skillsPromise = fetchSkills();

  // Await above-the-fold content to ensure it's in the initial HTML for SEO and layout stability
  const [navigation, profile, whatIDo] = await Promise.all([
    navigationPromise,
    profilePromise,
    whatIDoPromise,
  ]);

  return (
    <main className='min-h-screen bg-background'>
      <Navigation data={navigation} />
      <ProfileSection data={profile} />
      <WhatIDo items={whatIDo} />

      {/* Stream below-the-fold content so it doesn't block initial render */}
      <Suspense fallback={null}>
        <SkillsAsync promise={skillsPromise} />
      </Suspense>
      <Suspense fallback={null}>
        <EducationAsync
          educationPromise={educationPromise}
          certificationsPromise={certificationsPromise}
        />
      </Suspense>
      <Suspense fallback={null}>
        <ExperienceAsync promise={experiencesPromise} />
      </Suspense>
      <Suspense fallback={null}>
        <ProjectsAsync promise={projectsPromise} />
      </Suspense>
      <Suspense fallback={null}>
        <TestimonialsAsync promise={testimonialsPromise} />
      </Suspense>
      <BackToTop />
    </main>
  );
}
