import { Section } from '@/components/ui/section';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export function PrivacyPolicy() {
  return (
    <div className='bg-background text-foreground'>
      <div className='container mx-auto max-w-7xl px-6 pt-12'>
        <Link
          href='/'
          className='inline-flex items-center text-muted-foreground hover:text-primary transition-colors group'
        >
          <ArrowLeft className='mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1' />
          Tilbage til forsiden
        </Link>
      </div>

      <Section
        id='privacy-policy'
        title='Privatlivspolitik & Cookie-deklaration'
        description='Information om, hvordan denne hjemmeside bruger cookies, og hvordan vi håndterer dine data i overensstemmelse med GDPR.'
        background='gradient'
      >
        <div className='max-w-3xl mx-auto space-y-12'>
          {/* Introduction */}
          <div className='space-y-4'>
            <h3 className='text-2xl font-semibold text-foreground'>Oversigt</h3>
            <p className='text-muted-foreground leading-relaxed'>
              Denne privatlivspolitik og cookie-deklaration forklarer, hvordan
              denne portefølje indsamler og bruger information. Mit mål er at
              respektere dit privatliv, samtidig med at jeg sikrer en hurtig og
              velfungerende oplevelse. Siden benytter sig udelukkende af
              nødvendige værktøjer for basal funktionalitet, samt minimale
              analyseværktøjer til at samle anonymiseret statistik over sidens
              ydeevne.
            </p>
          </div>

          {/* Cookies Section */}
          <div className='space-y-4'>
            <h3 className='text-2xl font-semibold text-foreground'>
              Hvad er cookies, og hvordan bruger vi dem?
            </h3>
            <p className='text-muted-foreground leading-relaxed'>
              En cookie er en lille tekstfil, som gemmes på din computer, tablet
              eller mobiltelefon for at kunne genkende udstyret, huske
              indstillinger (såsom dit cookie-samtykke) og udføre statistik. Vi
              benytter os af følgende typer cookies baseret på de valg, du
              foretager:
            </p>
            <ul className='list-disc pl-6 space-y-3 text-muted-foreground mt-4'>
              <li>
                <strong className='text-foreground'>Nødvendige cookies:</strong>{' '}
                Disse cookies er påkrævede for at hjemmesiden kan fungere
                korrekt. Dette inkluderer blandt andet at gemme dine præferencer
                for samtykke via Cookie-Script. Disse kan ikke fravælges.
              </li>
              <li>
                <strong className='text-foreground'>
                  Statistik- og Analyse-cookies:
                </strong>{' '}
                Vi benytter Vercel Analytics og Vercel Speed Insights for at
                forbedre sidens ydeevne og samle anonymiseret data om, hvordan
                siden bliver brugt. Dette samles kun med dit aktive samtykke.
              </li>
            </ul>
          </div>

          {/* Consent Section */}
          <div className='space-y-4'>
            <h3 className='text-2xl font-semibold text-foreground'>
              Håndtering af dit samtykke
            </h3>
            <p className='text-muted-foreground leading-relaxed'>
              Du har til enhver tid ret til at ændre eller tilbagetrække dit
              samtykke i forhold til cookies, der ikke er strengt nødvendige for
              sidens drift. Du kan nemt opdatere dine præferencer ved at klikke
              på Cookie-Script ikonet nederst på skærmen for at genåbne
              kontrolpanelet. Alternativt kan du slette eller blokere cookies
              direkte igennem indstillingerne i din foretrukne browser.
            </p>
          </div>

          {/* Third Party Services */}
          <div className='space-y-4'>
            <h3 className='text-2xl font-semibold text-foreground'>
              Tredjepartstjenester
            </h3>
            <p className='text-muted-foreground leading-relaxed'>
              For at drive og udvikle denne portefølje benytter vi en række
              pålidelige tredjepartstjenester:
            </p>
            <ul className='list-disc pl-6 space-y-3 text-muted-foreground mt-4'>
              <li>
                <strong className='text-foreground'>Vercel:</strong> Bruges til
                hosting og hastighedsoptimering. Vercel kan indsamle tekniske
                serverlogs bestående af anonymiseret IP-adresse og brugeragent.
              </li>
              <li>
                <strong className='text-foreground'>Sanity.io:</strong> Benyttes
                som Headless CMS, der leverer data og indhold til siden.
              </li>
              <li>
                <strong className='text-foreground'>Cookie-Script:</strong>{' '}
                Bruges til at dokumentere og håndtere dit samtykke, så siden
                overholder GDPR og ePrivacy-direktivet.
              </li>
            </ul>
            <p className='text-muted-foreground leading-relaxed mt-4'>
              Vi deler eller sælger på intet tidspunkt dine personlige data
              videre til tredjeparter med markedsføringsformål for øje.
            </p>
          </div>

          {/* Contact */}
          <div className='space-y-4'>
            <h3 className='text-2xl font-semibold text-foreground'>Kontakt</h3>
            <p className='text-muted-foreground leading-relaxed'>
              Har du spørgsmål til min privatlivspolitik, brug af cookies eller
              dine rettigheder, er du altid velkommen til at række ud til mig
              direkte via sidens kontaktmuligheder på forsiden.
            </p>
          </div>

          <div className='pt-8 border-t border-border'>
            <p className='text-sm text-muted-foreground text-center'>
              Sidst opdateret: Marts 2026
            </p>
          </div>
        </div>
      </Section>
    </div>
  );
}
