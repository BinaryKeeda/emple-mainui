import React from 'react';
import LayoutComponent from '../layout/Layout'; // Ensure this wraps the component with Header/Footer

const TermsAndConditions = () => {
  return (
    <div className="bg-white text-gray-800  px-6 py-12 max-w-7xl mx-auto">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">Terms and Conditions</h1>

      <p className="mb-8 text-sm text-gray-500 text-center">
        {/* <strong>Effective Date:</strong> [Insert Date] */}
      </p>

      <p className="mb-6">
        Welcome to <strong>BinaryKeeda</strong>. By accessing or using our website{' '}
        <a href="https://www.binarykeeda.com" className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">
          www.binarykeeda.com
        </a>, you agree to comply with and be bound by the following Terms and Conditions. Please read them carefully.
      </p>

      <section className="space-y-6">
        {[
          {
            title: '1. Intellectual Property Rights',
            content:
              'All content on this website—including graphics, text, logos, software, and source code—is the intellectual property of BinaryKeeda unless otherwise stated. You may not reproduce, distribute, or use any content for commercial purposes without prior written permission. Unauthorized use may lead to legal consequences.'
          },
          {
            title: '2. Website Use Restrictions',
            content: (
              <ul className="list-disc ml-6 space-y-1">
                <li>No illegal, fraudulent, or unethical usage.</li>
                <li>No unauthorized access to data or backend systems.</li>
                <li>No scraping, bots, or cloning the site.</li>
                <li>No interference with site performance (e.g., DoS attacks).</li>
                <li>No spam or irrelevant marketing through site forms.</li>
              </ul>
            )
          },
          {
            title: '3. Data Confidentiality',
            content:
              'All data hosted or shared via this site (such as reports, internal tools, or user details) is confidential. Sharing or reusing such content outside authorized contexts is strictly prohibited and may result in legal action.'
          },
          {
            title: '4. No Rights Granted',
            content:
              'Use of the website does not grant you any ownership or license of our intellectual property, designs, or business logic.'
          },
          {
            title: '5. Third-Party Links',
            content:
              'We may include third-party links for convenience. We do not control or endorse external content and are not liable for any harm or damages arising from their use.'
          },
          {
            title: '6. Website Availability',
            content:
              'While we aim for continuous uptime, we may temporarily or permanently suspend access without notice. We do not guarantee uninterrupted service.'
          },
          {
            title: '7. Limitation of Liability',
            content:
              'BinaryKeeda is not responsible for any direct or indirect damages arising from the use or inability to use our website or content.'
          },
          {
            title: '8. Changes to Terms',
            content:
              'We reserve the right to update these Terms at any time. Continued use of the site constitutes your agreement to the updated terms.'
          },
          {
            title: '9. Governing Law',
            content:
              'These Terms are governed by the laws of India. Any disputes shall fall under the exclusive jurisdiction of the courts in Shahjahanpur, Uttar Pradesh.'
          },
        ].map((section, idx) => (
          <div key={idx}>
            <h2 className="text-xl font-semibold mb-2">{section.title}</h2>
            <div className="text-gray-700">{section.content}</div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default LayoutComponent(TermsAndConditions);
