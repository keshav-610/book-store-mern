import { useState } from "react";
import emailjs from "emailjs-com";

const Footer = () => {
  const [FormData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .sendForm("service_la0ceoq", "template_xsnp3he", e.target, "ulGBMdxKs7GWi4dmd")
      .then(() => {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); 
      })
      .catch((err) => {
        console.error("Error sending message:", err);
        alert("Failed to send the message. Please try again later.");
      });
  };

  return (
    <div className="py-8">
      <div>
        <h2 className="text-2xl font-bold sm:text-3xl">About Me</h2>
      </div>
      <div className="mt-4">
        <div className="flex gap-2 flex-col sm:w-1/2">
          <h3 className="text-lg">
            <span className="font-semibold">Developed by</span>{" "}
            <span className="text-lg">Kesava Prakash</span>
          </h3>
          <h3 className="text-lg">
            <span className="font-semibold">Phone Number :</span>{" "}
            <span className="text-lg">+91 9841787203</span>
          </h3>
          <h3 className="text-lg">
            <span className="font-semibold">Email :</span>{" "}
            <span style={{ fontSize: "16.3px" }}>kesavaprakash1610@gmail.com</span>
          </h3>
        </div>
        <div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="border"
              id="name"
              name="name" // Match the key in FormData state
              value={FormData.name}
              required
              onChange={handleInputChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email" // Match the key in FormData state
              id="email"
              value={FormData.email}
              required
              className="border"
              onChange={handleInputChange}
            />
            <label htmlFor="message">Message</label>
            <textarea
              name="message" // Match the key in FormData state
              id="message"
              onChange={handleInputChange}
              value={FormData.message}
              rows="5"
            ></textarea>
            <button
              type="submit"
              className="mt-3 px-4 py-2 rounded bg-yellow-500 font-semibold text-white hover:bg-yellow-600 w-full"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Footer;
