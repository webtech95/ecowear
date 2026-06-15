import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState({ loading: false, msg: "", error: false });

  const API_URL = process.env.REACT_APP_API_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, msg: "", error: false });

    try {
      await axios.post(`${API_URL}/contact/send`, form);
      setStatus({ loading: false, msg: "Message sent successfully!", error: false });
      setForm({ name: "", email: "", message: "" });
    } catch {
      setStatus({ loading: false, msg: "Failed to send message. Try again.", error: true });
    }
  };

  return (
    <div className="bg-neutral-50 text-gray-900">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            Get in Touch
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-xl mx-auto">
            Have a question, feedback, or collaboration idea?  
            We’d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8 space-y-5"
          >
            <div>
              <label className="text-sm font-medium text-gray-700">Name</label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-secondary"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700">Message</label>
              <textarea
                id="message"
                rows="5"
                value={form.message}
                onChange={handleChange}
                required
                className="mt-1 w-full px-4 py-2.5 rounded-lg border border-gray-300
                           focus:outline-none focus:ring-2 focus:ring-secondary resize-none"
              />
            </div>

            {/* Status Message */}
            {status.msg && (
              <p
                className={`text-sm ${
                  status.error ? "text-red-600" : "text-green-600"
                }`}
              >
                {status.msg}
              </p>
            )}

            <button
              type="submit"
              disabled={status.loading}
              className="w-full bg-primary text-white py-3 rounded-lg font-medium
                         transition-colors duration-150
                         hover:bg-secondary disabled:opacity-60"
            >
              {status.loading ? "Sending..." : "Send Message"}
            </button>
          </form>

          {/* Map */}
          <div className="rounded-xl overflow-hidden border border-gray-200
                          h-[300px] sm:h-[360px] md:h-[420px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.5975640721335!2d77.27508397495828!3d28.671766082298843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfc86ff9bef55%3A0xcbded5c8a601dca7!2sWelcome!5e0!3m2!1sen!2sin!4v1747492006342!5m2!1sen!2sin"
              className="w-full h-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Maps location"
            />
          </div>

        </div>
      </section>
    </div>
  );
};

export default Contact;
