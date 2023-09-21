import { useState, useEffect } from "react";
import { images } from "../Data/images";
import { auth } from "../firebase";
import Loader from "./Loading";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const ImageGallery = ({ onSignOut, user }) => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredImages, setFilteredImages] = useState(images); // Use a copy for filtering
  const [imageOrder, setImageOrder] = useState(
    images.map((image) => image.id.toString())
  );

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
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
      images.find((img) => img.id.toString() === imageId)
    );

    setFilteredImages(newFilteredImages);
  };

  useEffect(() => {
    // Filter images based on search term
    const newFilteredImages = images.filter((image) =>
      image.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredImages(newFilteredImages);
  }, [searchTerm]);

  return (
    <div className="flex "style={{ minHeight: 'calc(100vh - 64px)'}}>
      <div className="hidden sm:block w-1/6 p-4 bg-white text-black border-r-4">
        <h2 className="text-2xl mb-4">Photok</h2>
        <p className="truncate max-w-[200px]">Hello, {user.email}</p>
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
            className="bg-red-300 text-white te px-3 py-2 rounded mt-4 sm:text-sm hover:bg-red-600"
          >
            Sign Out
          </button>
        </div>
      )}

      <div className="w-full p-4 overflow-y-auto">
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
          <>            
          {filteredImages.length === 0 && searchTerm ? (
              <p className="text-center text-gray-600 mt-4">
                No results found for "{searchTerm}".
              </p>
            ) : (
            <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="image-list">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
                >
                  {filteredImages.map((image, index) => (
                    <Draggable
                      key={image.id}
                      draggableId={image.id.toString()}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="bg-gray-300 flex flex-col rounded overflow-hidden"
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
        </>
        )}
      </div>
    
    </div>
  );
};

export default ImageGallery;
