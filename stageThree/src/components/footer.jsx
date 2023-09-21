const Footer = () => {
  return (
    <footer className=" text-black py-4">
      <div className="container mx-auto relative bottom-0 mt-6 text-center">
        <p className="text-sm">&copy; {new Date().getFullYear()} Hiphotler. All Rights Reserved.</p>
        {/* <div className="mt-4">
          <a href="#" className="text-blue-400 hover:text-blue-800 mx-2">Facebook</a>
          <a href="#" className="text-blue-400 hover:text-blue-800 mx-2">Twitter</a>
          <a href="#" className="text-blue-400 hover:text-blue-800 mx-2">Instagram</a>
        </div> */}
      </div>
    </footer>
  );
};

export default Footer;
