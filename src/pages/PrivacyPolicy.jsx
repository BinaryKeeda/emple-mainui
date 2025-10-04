import React from 'react';
import LayoutComponent from '../layout/Layout';

const PrivacyPolicy = () => {
  return (
    <div className="bg-white text-gray-800 px-6  py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Privacy Policy</h1>

      

      <p className="mb-6">
        At <strong>BinaryKeeda</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website{' '}
        <a href="https://www.binarykeeda.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
          www.binarykeeda.com
        </a>.
      </p>

      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">1. Information We Collect</h2>
          <p>
            We may collect the following types of information:
          </p>
          <ul className="list-disc ml-6 space-y-1 mt-2">
            <li>Personal details such as name, email, phone number, etc.</li>
            <li>Login credentials for secure access (if applicable).</li>
            <li>Usage data such as IP address, browser type, and pages visited.</li>
            <li>Data provided voluntarily through contact forms or registrations.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">2. How We Use Your Information</h2>
          <ul className="list-disc ml-6 space-y-1">
            <li>To provide access to our services and dashboards.</li>
            <li>To improve our website performance and user experience.</li>
            <li>To communicate with you via email or phone.</li>
            <li>To analyze usage patterns and detect misuse or fraud.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">3. Data Sharing</h2>
          <p>
            We do <strong>not</strong> sell, trade, or rent your personal information to third parties. Your data may only be shared with:
          </p>
          <ul className="list-disc ml-6 space-y-1 mt-2">
            <li>Authorized team members who need access for technical or support reasons.</li>
            <li>Law enforcement or legal entities if required under applicable laws.</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">4. Data Security</h2>
          <p>
            We implement technical and organizational security measures to protect your personal data. However, no method of transmission over the internet is completely secure. We cannot guarantee absolute security.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">5. Cookies and Tracking</h2>
          <p>
            We may use cookies and similar technologies to enhance your browsing experience. You can control or disable cookies through your browser settings.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">6. Third-Party Services</h2>
          <p>
            Our website may include links to third-party services or tools. We are not responsible for the privacy practices or content of those websites.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">7. Your Rights</h2>
          <p>
            You have the right to request access to or correction of your personal data. You may also request deletion of your data, subject to legal and contractual obligations.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">8. Changes to This Policy</h2>
          <p>
            We reserve the right to modify this Privacy Policy at any time. Updates will be reflected on this page with a revised effective date.
          </p>
        </div>

      </section>
    </div>
  );
};

export default LayoutComponent(PrivacyPolicy);
