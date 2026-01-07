import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaClipboardCheck,
  FaCalendarAlt,
  FaFileAlt,
  FaUsers,
  FaCheckCircle,
  FaArrowRight,
  FaQuestionCircle,
  FaDownload,
} from "react-icons/fa";
import { API_BASE_URL } from "../api/config";

const AdmissionsOverview = () => {
  const [pageContent, setPageContent] = useState(null);
  const [admissionSteps, setAdmissionSteps] = useState([]);
  const [ageCriteria, setAgeCriteria] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [faqs, setFaqs] = useState([]);

  const iconMap = {
    ClipboardCheck: <FaClipboardCheck size={32} />,
    FileText: <FaFileAlt size={32} />,
    Users: <FaUsers size={32} />,
    CheckCircle: <FaCheckCircle size={32} />,
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchData = async () => {
      try {
        const [contentRes, stepsRes, criteriaRes, docsRes, faqsRes] = await Promise.all([
          fetch(`${API_BASE_URL}/api/admissions/page-content/current/`),
          fetch(`${API_BASE_URL}/api/admissions/steps/`),
          fetch(`${API_BASE_URL}/api/admissions/age-criteria/`),
          fetch(`${API_BASE_URL}/api/admissions/documents/`),
          fetch(`${API_BASE_URL}/api/admissions/faqs/`)
        ]);

        if (contentRes.ok) setPageContent(await contentRes.json());
        if (stepsRes.ok) setAdmissionSteps(await stepsRes.json());
        if (criteriaRes.ok) setAgeCriteria(await criteriaRes.json());
        if (docsRes.ok) setDocuments(await docsRes.json());
        if (faqsRes.ok) setFaqs(await faqsRes.json());
      } catch (error) {
        console.error("Error fetching admissions data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="font-sans bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[400px] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-secondary/90 z-10"></div>
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: `url(${pageContent?.hero_image ? (pageContent.hero_image.startsWith('http') ? pageContent.hero_image : `${API_BASE_URL}${pageContent.hero_image}`) : "https://images.unsplash.com/photo-1427504743380-dda7f8db5954?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"})`,
          }}
        ></div>
        <div className="relative z-20 container mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {pageContent?.hero_title || "Admissions Overview"}
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-200">
            {pageContent?.hero_description || "Join the Nethaji Vidyalayam family. A simple, transparent process to begin your child's journey of excellence."}
          </p>
        </div>
      </section>

      {/* Intro / Philosophy */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h4 className="text-primary font-bold uppercase tracking-widest mb-2">
                {pageContent?.why_sub_heading || "Why Choose Us?"}
              </h4>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {pageContent?.why_heading || "Nurturing Potential, Shaping Futures"}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {pageContent?.why_description || "At our school, we are committed to providing a nurturing and stimulating learning environment that supports the holistic development of every child. We combine strong academic foundations with values, creativity, and modern learning tools to prepare students for a bright future."}
              </p>
              <div className="flex gap-4">
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary">
                  <span className="block text-2xl font-bold text-secondary">
                    100%
                  </span>
                  <span className="text-sm text-gray-500">Pass Result</span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-primary">
                  <span className="block text-2xl font-bold text-secondary">
                    25+
                  </span>
                  <span className="text-sm text-gray-500">Years Legacy</span>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <img
                src={pageContent?.why_image ? (pageContent.why_image.startsWith('http') ? pageContent.why_image : `${API_BASE_URL}${pageContent.why_image}`) : "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"}
                alt="Students Learning"
                className="rounded-2xl shadow-2xl border-4 border-white"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Admission Process Steps */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-secondary mb-4">
              Admission Process
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our admission procedure is simple, transparent, and
              child-friendly. The steps include:
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {(admissionSteps.length > 0 ? admissionSteps : [
              { icon_name: "ClipboardCheck", title: "1. Registration", description: "Fill out the online enquiry form or visit the school office to collect the application form." },
              { icon_name: "FileText", title: "2. Application Submission", description: "Submit the completed form along with the necessary documents and the registration fee." },
              { icon_name: "Users", title: "3. Interaction / Assessment", description: "An informal interaction for Kindergarten or a written assessment for higher grades." },
              { icon_name: "CheckCircle", title: "4. Admission Confirmation", description: "Upon selection, pay the admission fee to secure the seat and complete formalities." }
            ]).map((step, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all relative overflow-hidden group"
              >
                <div className="absolute top-0 right-0 bg-primary/10 w-24 h-24 rounded-bl-full -mr-4 -mt-4 transition-all group-hover:bg-primary/20"></div>
                <div className="text-primary mb-6 relative z-10">
                  {iconMap[step.icon_name] || <FaClipboardCheck size={32} />}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Age Criteria */}
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center">
                <FaCalendarAlt className="mr-3 text-primary" /> Age Criteria (as of
                March 31st)
              </h3>
              <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-100 text-gray-700">
                      <th className="p-4 border-b font-semibold">Class</th>
                      <th className="p-4 border-b font-semibold">
                        Minimum Age
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {(ageCriteria.length > 0 ? ageCriteria : [
                      { grade: "Pre-KG", min_age: "3 Years" },
                      { grade: "LKG", min_age: "3-4 Years" },
                      { grade: "UKG", min_age: "4-5 Years" },
                      { grade: "Grade 1", min_age: "5-6 Years" }
                    ]).map((item, index) => (
                      <tr key={index}>
                        <td className="p-4">{item.grade}</td>
                        <td className="p-4">{item.min_age}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 p-4 bg-yellow-50 text-yellow-800 rounded-lg text-sm border border-yellow-100">
                * Age relaxation may be considered based on the child's
                readiness and Principal's discretion.
              </div>
            </div>

            {/* Documents Required */}
            <div>
              <h3 className="text-2xl font-bold text-secondary mb-6 flex items-center">
                <FaFileAlt className="mr-3 text-primary" /> Documents Required
              </h3>
              <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                <p>
                  (Please submit any one of the following, along with originals
                  for verification :)
                </p>
                <br />
                <ul className="space-y-4">
                  {(documents.length > 0 ? documents : [
                    { text: "Birth Certificate (Original + Copy)" },
                    { text: "Transfer Certificate (from previous school)" },
                    { text: "Passport Size Photographs (2 Nos)" }
                  ]).map((doc, index) => (
                    <li key={index} className="flex items-start">
                      <FaCheckCircle
                        size={20}
                        className="text-green-500 mr-3 mt-0.5 shrink-0"
                      />
                      <span className="text-gray-700">{doc.text}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    import('jspdf').then(({ default: jsPDF }) => {
                      const doc = new jsPDF();
                      const docsToList = documents.length > 0 ? documents : [
                        { text: "Birth Certificate (Original + )" },
                        { text: "Transfer Certificate (from previous school)" },
                        { text: "Passport Size Photographs (2 Nos)" },
                        { text: "Aadhar Card Copy of Student & Parents ( Original & Copy)" },
                        { text: "Community Certificate (if applicable)" }
                      ];

                      // Header
                      doc.setFontSize(22);
                      doc.setTextColor(255, 110, 48); // Primary Color
                      doc.text("Nethaji Vidhyalayam", 105, 20, null, null, "center");

                      // Subheader
                      doc.setFontSize(16);
                      doc.setTextColor(30, 36, 110); // Secondary Color
                      doc.text("Documents Required for Admission", 105, 30, null, null, "center");

                      // Content
                      doc.setFontSize(12);
                      doc.setTextColor(60, 60, 60);
                      let yPos = 50;

                      docsToList.forEach((item, index) => {
                        doc.text(`${index + 1}. ${item.text}`, 20, yPos);
                        yPos += 12;
                      });

                      // Footer
                      doc.setFontSize(10);
                      doc.setTextColor(128, 128, 128);
                      doc.text("Please submit originals alongside copies for formal verification.", 105, yPos + 20, null, null, "center");

                      doc.save("Nethaji_Admission_Documents.pdf");
                    });
                  }}
                  className="mt-8 w-full flex items-center justify-center gap-2 border-2 border-primary text-primary font-bold py-3 rounded-lg hover:bg-primary hover:text-white transition-all">
                  <FaDownload size={20} /> Download Checklist
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-secondary text-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-gray-300">
              Common queries from parents regarding the admission process.
            </p>
          </div>
          <div className="space-y-6">
            {(faqs.length > 0 ? faqs : [
              { question: "When does the admission process start?", answer: "Admissions for the upcoming academic year typically open in October." }
            ]).map((faq, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/20 transition-all"
              >
                <h4 className="text-xl font-bold mb-2 flex items-start gap-3">
                  <FaQuestionCircle size={24} className="text-primary shrink-0" />
                  {faq.question}
                </h4>
                <p className="text-gray-300 ml-9">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            {pageContent?.cta_title || "Ready to Join Us?"}
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {pageContent?.cta_description || "Take the first step towards your child's bright future. Schedule a campus visit or contact our admissions office today."}
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-primary hover:bg-primary-hover text-white px-10 py-4 rounded-full font-bold text-lg transition-all shadow-xl hover:shadow-primary/40"
            >
              Contact Admissions
            </Link>
            <button className="bg-white border-2 border-gray-200 text-gray-700 hover:border-primary hover:text-primary px-10 py-4 rounded-full font-bold text-lg transition-all">
              Download Brochure
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdmissionsOverview;
