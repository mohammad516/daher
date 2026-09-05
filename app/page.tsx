// Server component — fetches all Mustapha Daher Center content from MongoDB
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Founder from "@/components/Founder";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import Clients from "@/components/Clients";
import KeyOfferings from "@/components/KeyOfferings";
import Partners from "@/components/Partners";
import Contact from "@/components/Contact";
import ImageDivider from "@/components/ImageDivider";
import Footer from "@/components/Footer";
import prisma from "@/lib/prisma";
import { getSiteContent } from "@/lib/siteContent";

// Keys we need from SiteContent
const SITE_CONTENT_KEYS = [
  // logo & nav
  "site.logo_url",
  "nav.home", "nav.about", "nav.services", "nav.testimonials", "nav.contact", "nav.get_quote",
  // hero
  "hero.badge",
  "hero.stat1_value", "hero.stat1_label",
  "hero.stat2_value", "hero.stat2_label",
  "hero.stat3_value", "hero.stat3_label",
  "hero.stat4_value", "hero.stat4_label",
  "hero.phone", "hero.location", "hero.cta_services",
  // about
  "about.title", "about.p1", "about.p2", "about.p3", "about.p4",
  "about.read_more", "about.read_less", "about.years_label", "about.excellence_label",
  "about.image", "about.image_secondary",
  // services
  "services.title", "services.subtitle", "services.view_more", "services.view_less", "services.our_projects",
  // founder
  "founder.badge", "founder.title",
  "founder.p1", "founder.p2", "founder.p3",
  "founder.name", "founder.role", "founder.image",
  // testimonials
  "testimonials.title",
  // clients & partners
  "clients.title", "partners.title",
  // maintenance
  "maintenance.title",
  // contact
  "contact.badge", "contact.title", "contact.title_highlight", "contact.subtitle",
  "contact.emergency_label", "contact.need_help",
  "contact.phone", "contact.email", "contact.address", "contact.support_hours",
  "contact.form_send", "contact.form_thankyou", "contact.form_received",
  // footer
  "footer.privacy", "footer.accessibility", "footer.copyright",
  "footer.facebook_url", "footer.instagram_url", "footer.linkedin_url", "footer.tiktok_url",
  // image divider
  "image_divider.image",
];

import { translateDeep } from "@/lib/translationService";

export const dynamic = "force-dynamic"; // always re-fetch from DB on each request

export default async function Home() {
  // Fetch all data in parallel
  const [sc, heroSlides, services, testimonials, clients, partners, maintenancePlans] =
    await Promise.all([
      getSiteContent(SITE_CONTENT_KEYS),
      prisma.daherHeroSlide.findMany({ orderBy: { order: "asc" } }),
      prisma.daherService.findMany({ orderBy: { order: "asc" } }),
      prisma.daherTestimonial.findMany({ orderBy: { order: "asc" } }),
      prisma.daherClient.findMany({ orderBy: { order: "asc" } }),
      prisma.daherPartner.findMany({ orderBy: { order: "asc" } }),
      prisma.daherMaintenancePlan.findMany({ orderBy: { order: "asc" } }),
    ]);

  // Deep translate all the data to Arabic
  const [scAr, heroSlidesAr, servicesAr, testimonialsAr, maintenancePlansAr] =
    await Promise.all([
      translateDeep(sc),
      translateDeep(heroSlides),
      translateDeep(services),
      translateDeep(testimonials),
      translateDeep(maintenancePlans),
    ]);

  return (
    <LanguageProvider dbContent={sc} dbContentAr={scAr}>
      <main className="flex flex-col">
        <Navbar logoUrl={sc["site.logo_url"]} sc={sc} scAr={scAr} />
        <Hero slides={heroSlides} slidesAr={heroSlidesAr} sc={sc} scAr={scAr} />
        <About sc={sc} scAr={scAr} />
        <Services services={services} servicesAr={servicesAr} sc={sc} scAr={scAr} />
        <Testimonials testimonials={testimonials} testimonialsAr={testimonialsAr} sc={sc} scAr={scAr} />
        <Contact sc={sc} scAr={scAr} />
        <ImageDivider imageUrl={sc["image_divider.image"]} />
        <Footer sc={sc} scAr={scAr} />
      </main>
    </LanguageProvider>
  );
}
