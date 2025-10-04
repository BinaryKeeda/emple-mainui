import React, { useState } from "react";
import Header from "../../layout/Header";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { BASE_URL } from "../../lib/config";
import { useSnackbar } from "notistack";

const ContactUs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Example API call
      // const res = await axios.post(`${BASE_URL}/contact`, { name, email, message });
      await axios.post(`${BASE_URL}/api/data//user/contact` , {
        name,email,message
      },{withCredentials:true});

      // if (res.status === 200) {
      enqueueSnackbar("Form Submitted Successfully", { variant: "success" });
      // }

      setName("");
      setEmail("");
      setMessage("");
    } catch (e) {
      enqueueSnackbar("Error Occurred", { variant: "error" });
      console.error(e);
    }
  };

  return (
    <div className="bg-gradient-to-b from-white via-green-50 to-white dark:from-gray-900 dark:to-gray-950 min-h-screen text-gray-800 dark:text-gray-100">
      <Header />
      <section className="max-w-6xl mx-auto px-4 py-10">
        <div className="text-center mb-12" data-aos="fade-down">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600 mb-4">
            Contact Us
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
            Have questions, feedback, or just want to connect with the BinaryKeeda team? We’d love to hear from you!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-8" data-aos="fade-right">
            <div>
              <h2 className="text-2xl font-semibold mb-2">
                📍{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  Address
                </span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                BinaryKeeda, Sector 21, Noida, India
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-2">
                📧{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  Email
                </span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                contact@binarykeeda.com
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-green-600 dark:text-green-400 mb-2">
                📞{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-red-600">
                  Phone
                </span>
              </h2>
              <p className="text-lg text-gray-700 dark:text-gray-300">
                +91 7497918739
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl"
            data-aos="fade-left"
          >
            <div>
              <label className="block mb-2 font-medium">Name</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-900"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="you@example.com"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-900"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-medium">Message</label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows="5"
                placeholder="Write your message here..."
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 dark:bg-gray-900"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white font-semibold px-6 py-3 rounded-md shadow-md transition-transform transform hover:scale-105"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
