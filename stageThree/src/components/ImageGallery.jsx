import { useState, useEffect } from "react";
import { images } from "../Data/images";
import { auth } from "../firebase";
import Loader from "./Loading";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ImageGallery = ({ onSignOut }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [originalImages, setOriginalImages] = useState(images); // Store original images
  const [filteredImages, setFilteredImages] = useState(originalImages); // Use a copy for filtering
  const [imageOrder, setImageOrder] = useState(
    originalImages.map((image) => image.id.toString())
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      onSignOut();
      navigate("/logout");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const checkWindowWidth = () => {
    if (window.innerWidth >= 640) {
      setMobileMenuOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", checkWindowWidth);
    return () => {
      window.removeEventListener("resize", checkWindowWidth);
    };
  }, []);

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const reorderedImages = Array.from(imageOrder);
    const [movedImage] = reorderedImages.splice(result.source.index, 1);
    reorderedImages.splice(result.destination.index, 0, movedImage);

    setImageOrder(reorderedImages);

    // Update the filteredImages based on the new order
    const newFilteredImages = reorderedImages.map((imageId) =>
      originalImages.find((img) => img.id.toString() === imageId)
    );

    setFilteredImages(newFilteredImages);
  };

  useEffect(() => {
    // Filter images based on search term
    const newFilteredImages = originalImages.filter((image) =>
      image.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredImages(newFilteredImages);
  }, [searchTerm, originalImages]);

  return (
    <div className="flex relative">
      <div className="hidden sm:block w-1/6 p-4 bg-white text-black border">
        <h2 className="text-2xl mb-4">Photok</h2>
        <p>Hello, User</p>
        <button
          onClick={handleSignOut}
          className="bg-red-500 text-white px-3 py-2 rounded mt-4 hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>

      <button
        onClick={toggleMobileMenu}
        className={`sm:hidden absolute right-4 top-4 text-2xl z-10 ${
          mobileMenuOpen ? "hidden" : ""
        }`}
      >
        ☰
      </button>

      {mobileMenuOpen && (
        <div className="absolute top-0 left-0 w-full h-full bg-white text-black flex flex-col items-center">
          <button
            onClick={toggleMobileMenu}
            className="absolute right-4 top-4 text-2xl z-10"
          >
            ✕
          </button>

          <h2 className="text-2xl mb-4 mt-8">Photok</h2>
          <p>Hello, User</p>
          <button
            onClick={handleSignOut}
            className="bg-red-500 text-white te px-3 py-2 rounded mt-4 sm:text-sm hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      )}

      <div className="w-full p-4">
        <nav className="mb-4 flex md:flex-row-reverse items-center">
          <input
            type="text"
            placeholder="Search by tags..."
            className="flex flex-row-reverse w-4/5 sm:w-3/5 p-2 border border-gray-300 rounded"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={toggleMobileMenu}
            className={`${
              mobileMenuOpen ? "sm:hidden" : "hidden"
            } ml-2 text-2xl z-10`}
          ></button>
        </nav>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <Loader type="TailSpin" color="#00BFFF" height={80} width={80} />
          </div>
        ) : (
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="image.id">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {filteredImages.map((image, index) => (
                    <Draggable
                      key={image.id.toString()}
                      draggableId={image.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-300 flex flex-col items-center rounded overflow-hidden"
                        >
                          <img
                            src={`./images/${image.url}.jpeg`}
                            alt={image.tag}
                            className="w-full h-48 object-cover"
                          />
                          <div className="mt-2">
                            <p className="font-semibold">{image.tag}</p>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        )}
      </div>
    </div>
  );
};

export default ImageGallery;
