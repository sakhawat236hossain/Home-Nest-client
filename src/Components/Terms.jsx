import React from "react";

const Terms = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12 text-gray-700">
      <h1 className="text-4xl font-extrabold text-indigo-600 mb-10 text-center">
        Terms & Conditions
      </h1>

      <p className="mb-8 leading-relaxed text-gray-600 text-base text-justify">
        Welcome to{" "}
        <span className="font-semibold text-indigo-500">PropertyHub</span>. By
        accessing or using our website, you agree to comply with and be bound by
        the following terms and conditions. Please read them carefully before
        using our services.
      </p>

      {/* 1 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-indigo-500 mb-3">
          1. User Responsibilities
        </h2>
        <p className="leading-relaxed text-gray-700 text-justify">
          You are responsible for maintaining the confidentiality of your
          account and password. You agree to use the website only for lawful
          purposes and not to post any false, misleading, or fraudulent property
          listings.
        </p>
      </section>

      {/* 2 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-indigo-500 mb-3">
          2. Property Listings
        </h2>
        <p className="leading-relaxed text-gray-700 text-justify">
          All property information provided must be accurate, complete, and kept
          up to date. We reserve the right to review, edit, or remove any
          listing that violates our terms or appears suspicious.
        </p>
      </section>

      {/* 3 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-indigo-500 mb-3">
          3. Privacy Policy
        </h2>
        <p className="leading-relaxed text-gray-700 text-justify">
          We respect your privacy. Any personal information shared with{" "}
          <span className="font-semibold">PropertyHub</span> will remain
          confidential and will not be disclosed to third parties except as
          required by law or with your consent.
        </p>
      </section>

      {/* 4 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-indigo-500 mb-3">
          4. Limitation of Liability
        </h2>
        <p className="leading-relaxed text-gray-700 text-justify">
          PropertyHub is not responsible for any direct or indirect damages,
          losses, or disputes arising from the use of this platform or property
          transactions conducted through it. Users are encouraged to verify all
          property details independently.
        </p>
      </section>

      {/* 5 */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold text-indigo-500 mb-3">
          5. Changes to These Terms
        </h2>
        <p className="leading-relaxed text-gray-700 text-justify">
          We may modify or update these terms periodically. Updates will be
          posted on this page, and continued use of our website indicates your
          agreement to the latest version.
        </p>
      </section>

      <div className="mt-12 border-t border-gray-200 pt-6 text-center">
        <p className="text-gray-600 leading-relaxed">
          Thank you for using{" "}
          <span className="font-semibold text-indigo-500">PropertyHub</span>. We
          are committed to ensuring a secure, transparent, and trustworthy real
          estate experience for all our users.
        </p>
      </div>
    </div>
  );
};

export default Terms;
