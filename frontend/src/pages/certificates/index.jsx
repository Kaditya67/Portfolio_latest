import React, { useEffect, useState } from "react";
import api from "../../api/api.js";
import { CertificateCard } from "../../components/certificate-card.jsx";
import { Section } from "../../components/section.jsx";

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const fetchCertificates = async () => {
      try {
        const result = await api.getCertificates();
        console.debug("Certificates API result:", result);

        if (isMounted && result?.items?.length > 0) {
          setCertificates(result.items);
        } else {
          console.warn("Empty API response received");
        }
      } catch (err) {
        console.error("Error fetching certificates:", err);
        setError(true);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCertificates();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground dark:bg-neutral-900 dark:text-white p-8 transition-colors duration-300">
      <Section
        title="Certificates"
        subtitle="Selected certifications and badges that highlight my skills."
      >
        {loading ? (
          <p className="text-muted dark:text-neutral-400 text-center animate-pulse">
            Loading certificates...
          </p>
        ) : error ? (
          <p className="text-red-500 text-center">
            Failed to load certificates. Please try again later.
          </p>
        ) : certificates.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <CertificateCard key={cert.id || cert._id} cert={cert} />
            ))}
          </div>
        ) : (
          <p className="text-muted dark:text-neutral-400 text-center">
            No certificates found.
          </p>
        )}
      </Section>
    </main>
  );
};

export default Certificates;
