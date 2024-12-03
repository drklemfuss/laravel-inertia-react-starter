import { Head } from "@inertiajs/react";
import LandingLayout from "@/layouts/LandingLayout";
import { BenefitsSection } from "@/Pages/Landing/Partials/benefits";
import { CommunitySection } from "@/Pages/Landing/Partials/community";
import { ContactSection } from "@/Pages/Landing/Partials/contact";
import { FAQSection } from "@/Pages/Landing/Partials/faq";
import { FeaturesSection } from "@/Pages/Landing/Partials/features";
import { FooterSection } from "@/Pages/Landing/Partials/footer";
import { HeroSection } from "@/Pages/Landing/Partials/hero";
import { PricingSection } from "@/Pages/Landing/Partials/pricing";
import { ServicesSection } from "@/Pages/Landing/Partials/services";
import { SponsorsSection } from "@/Pages/Landing/Partials/sponsors";
import { TeamSection } from "@/Pages/Landing/Partials/team";
import { TestimonialSection } from "@/Pages/Landing/Partials/testimonial";

export const metadata = {
    title: "Shadcn - Inertia",
    description: "Free Shadcn/Inertia project for developers",
    viewport: "width=device-width, initial-scale=1",
};

export default function Home() {
    return (
        <LandingLayout>
            <Head title="Welcome - Inertia/React Shadcn" />
            <HeroSection />
            <SponsorsSection />
            <BenefitsSection />
            <FeaturesSection />
            <ServicesSection />
            <TestimonialSection />
            <TeamSection />
            <CommunitySection />
            <PricingSection />
            <ContactSection />
            <FAQSection />
            <FooterSection />
        </LandingLayout>
    );
}
