import { FaInstagram } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <div>
      <footer className="bg-gray-100">
        <div className="relative mx-auto max-w-screen-xl px-4 py-1 sm:px-6 lg:px-8 lg:pt-12">
          <div className="lg:flex lg:items-start lg:justify-between">
            <div>
              <h1 className="text-4xl">LOGO</h1>

              <p className="mt-6 max-w-md text-2xl leading-relaxed text-gray-700 lg:text-left">
                Discover unique art <br />
                and craft treasures.
              </p>
            </div>

            <div className="">
              <h1 className="text-2xl font-semibold my-3">Contact Us</h1>

              <p>
                226 preston road,
                <br />
                ilford, london, <br />
                E12 5RL
              </p>

              <p className="mt-6">
                {" "}
                9876543210 <br />
                MediCentral@gmail.com
              </p>
            </div>

            <div>
              <h1 className="text-2xl my-3 font-semibold">Reach Us</h1>

              <div className=" grid grid-cols-2 gap-4 lg:grid-cols-2 w-64 lg:gap-8">
                <div className="h-16 w-16 flex justify-center items-center flex-col">
                  <FaInstagram className="h-8 w-8" />
                  <p className="text-sm">Instagram</p>
                </div>{" "}
                <div className="h-16 w-16 flex justify-center items-center flex-col">
                  <FaFacebookF className="h-8 w-8" />
                  <p className="text-sm">Facebook</p>
                </div>{" "}
                <div className="h-16 w-16 flex justify-center items-center flex-col">
                  <FaLinkedin className="h-8 w-8" />
                  <p className="text-sm">LinkedIn</p>
                </div>{" "}
                <div className="h-16 w-16 flex justify-center items-center flex-col">
                  <FaTwitter className="h-8 w-8" />
                  <p className="text-sm">Twitter</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
