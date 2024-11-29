import { useState } from "react";
import emailjs from "emailjs-com";
import Swal from "sweetalert2";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

const Footer = () => {
  const [formData, setFormData] = useState({
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

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      message: formData.message,
    };

    emailjs
      .send("service_la0ceoq", "template_xsnp3he", templateParams, "ulGBMdxKs7GWi4dmd")
      .then(
        () => {
          Swal.fire({
            icon: 'success',
            title: 'Message Sent!',
            text: 'Your message was sent successfully.',
          });
          setFormData({ name: "", email: "", message: "" });
        },
        (err) => {
          console.error("Error sending message:", err);
          alert("Failed to send the message. Please try again later.");
        }
      );
  };

  return (
    <div className="mt-8">
      <div>
        <h2 className="text-4xl font-bold text-center sm:pb-5 sm:text-5xl">About Me</h2>
      </div>
      <div className="sm:flex">
        <div className="mt-5 sm:w-1/2 flex flex-col justify-around sm:gap-10">
          <div className="flex flex-col justify-start gap-4 sm:gap-8">
            <p className="text-base sm:text-lg text-center">Developed By: <strong>Kesava Prakash</strong></p>
            <p className="text-base sm:text-lg text-center">Phone Number: <strong>+91 9841787203</strong></p>
            <p className="text-base sm:text-lg text-center">Email: <strong>kesavaprakash1610@gmail.com</strong></p>
          </div>
          <div className="flex justify-evenly sm:mt-8 my-6">
            <a href="https://www.instagram.com/_.k3shav._.610._/" target="_blank" className="text-3xl sm:text-4xl"><FaInstagram /></a>
            <a href="https://www.linkedin.com/in/kesava-prakash-409825256/" target="_blank"><FaLinkedin className="text-3xl sm:text-4xl" /></a>
            <a href="https://github.com/keshav-610" target="_blank"><FaGithub className="text-3xl sm:text-4xl" /></a>
            <a href="https://x.com/k3shav610" target="_blank"><FaXTwitter className="text-3xl sm:text-4xl" /></a>
            <a href="https://www.facebook.com/keshav.prakash.1217" target="_blank"><FaFacebookSquare className="text-3xl sm:text-4xl" /></a>
          </div>
        </div>

        <div className="sm:w-1/2 mt-5 bg-slate-10">
          <form onSubmit={handleSubmit}>
            <div className="mb-4 flex flex-row items-center">
              <div className=" w-20 h-8 flex justify-start items-center"><label htmlFor="name" className="sm:text-base font-medium">Name</label></div>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border p-2 rounded-lg mx-3  focus:outline-none"
              />
            </div>

            <div className="mb-4 flex flex-row items-center">
              <div className="w-20 h-8 flex justify-start items-center"><label htmlFor="email" className="sm:text-base font-medium">Email</label></div>
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border p-2 rounded-lg mx-3  focus:outline-none"
              />
            </div>

            <div className="mb-4 flex flex-row items-center">
              <div className=" w-20 h-8 flex justify-start items-center"><label htmlFor="message" className="sm:text-base font-medium">Message</label></div>
              <textarea
                name="message"
                id="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="2"
                required
                className="w-full border p-2  mx-3  border-gray-300 rounded-lg focus:outline-none"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full py-3 mt-4 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition-all"
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
