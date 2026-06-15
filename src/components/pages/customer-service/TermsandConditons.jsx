import PageWrapper from "../../PageWrapper";

const TermsConditions = () => {
return (
<PageWrapper title="Agreements and Terms"
    subtitle="Customer agreements, service terms, and policies governing the use of EcoWear products, services, and websites.">

    {/* ===================== INDEX ===================== */}
    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <h2 className="text-xl text-white font-semibold mb-4">
            Customer Agreements and User Terms
        </h2>
        <ul className="list-disc pl-6 space-y-1 text-gray-300">
            <li>Main Services Agreement</li>
            <li>Region-Specific Terms</li>
            <li>Professional Services Terms</li>
            <li>Innovation Services Terms</li>
        </ul>
    </div>

    {/* ===================== SERVICES ===================== */}
    <Section title="Main Services Agreement">
        <p>
            These terms govern your access to and use of EcoWear’s products,
            subscriptions, applications, and services (“Services”). By using
            EcoWear Services, you agree to comply with all applicable terms,
            policies, and guidelines referenced herein.
        </p>
    </Section>

    <Section title="Region-Specific Terms">
        <p>
            Certain Services may be subject to additional regional, country-specific,
            or jurisdiction-specific terms depending on your location. These terms
            supplement the Main Services Agreement.
        </p>
    </Section>

    <Section title="Professional Services Terms">
        <p>
            Professional services such as consulting, customization, onboarding,
            or technical support are governed by separate Professional Services
            Agreements where applicable.
        </p>
    </Section>

    {/* ===================== INNOVATION ===================== */}
    <Section title="Innovation Services">
        <ul className="list-disc pl-6 space-y-1">
            <li>Application Developer and API License Agreement</li>
            <li>Marketplace Terms of Use</li>
            <li>Feature Deprecation Policy</li>
            <li>Assignments and Transfers</li>
            <li>Reseller Subscription Services Agreement</li>
        </ul>
    </Section>

    {/* ===================== PRIVACY ===================== */}
    <Section title="Privacy and Data Protection">
        <ul className="list-disc pl-6 space-y-1">
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
            <li>Data Processing Agreement (DPA)</li>
            <li>CCPA Addendum</li>
            <li>LGPD Addendum</li>
            <li>Business Associate Agreement (BAA)</li>
            <li>Government Data Request Policy</li>
        </ul>
    </Section>

    {/* ===================== POLICIES ===================== */}
    <Section title="Policies">
        <ul className="list-disc pl-6 space-y-1">
            <li>Data Deletion Policy</li>
            <li>Promotional Credits Policy</li>
            <li>Regional Data Hosting Policy</li>
            <li>Sub-processor Policy</li>
            <li>User Content and Conduct Policy</li>
        </ul>
    </Section>

    {/* ===================== PRODUCT TERMS ===================== */}
    <Section title="Product Terms">
        <ul className="list-disc pl-6 space-y-1">
            <li>Accessibility Policy</li>
            <li>In-Product Cookies Policy</li>
            <li>Service-Specific Terms</li>
            <li>Free Trial & Beta Services Terms</li>
        </ul>
    </Section>

    {/* ===================== WEBSITE TERMS ===================== */}
    <Section title="Website Terms of Use">
        <p>
            Effective as of <strong>1 February 2024</strong>, these Website Terms
            govern your access to and use of EcoWear websites, including all
            content, features, and services made available through the websites.
        </p>

        <p>
            By accessing or using the websites, you agree to be bound by these
            Terms, our Privacy Policy, and our Cookie Policy. If you do not agree,
            you must discontinue use of the websites.
        </p>
    </Section>

    {/* ===================== USER CONTENT ===================== */}
    <Section title="User Content and Conduct">
        <p>
            Users may submit content where interactive features are available.
            You are solely responsible for any content you submit and must ensure
            that it does not violate applicable laws, intellectual property rights,
            or these Terms.
        </p>

        <p>
            EcoWear reserves the right to remove or moderate content that violates
            these guidelines without prior notice.
        </p>
    </Section>

    {/* ===================== DISCLAIMER ===================== */}
    <Section title="Disclaimer of Warranties and Limitation of Liability">
        <p>
            EcoWear Services and websites are provided on an “as-is” and
            “as-available” basis without warranties of any kind, whether express
            or implied.
        </p>

        <p>
            To the fullest extent permitted by law, EcoWear shall not be liable
            for any indirect, incidental, consequential, or punitive damages
            arising from your use of the Services or websites.
        </p>
    </Section>

    {/* ===================== GOVERNING LAW ===================== */}
    <Section title="Governing Law">
        <p>
            These Terms shall be governed by and construed in accordance with the
            laws of the jurisdiction in which EcoWear is incorporated, without
            regard to conflict-of-law principles.
        </p>
    </Section>

    {/* ===================== REVISION ===================== */}
    <Section title="Revision History">
        <p>
            These Terms were last updated on <strong>1 February 2024</strong>.
            Non-English translations are provided for convenience only; the English
            version controls in the event of any conflict.
        </p>
    </Section>

</PageWrapper>
);
};

const Section = ({ title, children }) => (
<div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
    <h2 className="text-xl font-semibold text-white mb-3">
        {title}
    </h2>
    <div className="space-y-3 text-gray-300 leading-relaxed">
        {children}
    </div>
</div>
);

export default TermsConditions;