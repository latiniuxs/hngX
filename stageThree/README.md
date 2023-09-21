# Image Gallery App Built with React, Vite, and Tailwind CSS

## Overview

This project is a fully functional and responsive image gallery built using React, Vite, and Tailwind CSS. The gallery allows users to log in, view a collection of images, and interact with them using drag-and-drop functionality. Here are the key features and requirements:

### Features

- **Simple Authentication**: Users can log in using the following credentials:
  - Username: user@example.com
  - Password: 1Password
  - Proper form validation with error messages is implemented.

- **Image Display**: The gallery displays a grid layout of images with consistent spacing, sizing, and tags for each image.

- **Loading State**: A loading state is provided for when images are not yet ready for display. It includes a skeleton loader or loading spinner to indicate loading.

- **Search Functionality**: Users can search for images based on tags. The search field filters the image list dynamically.

- **Drag-and-Drop**: Authenticated users can drag and drop images within the gallery to rearrange them.

- **User-Friendly Feedback**: Smooth animations and visual cues are incorporated to provide feedback during drag-and-drop interactions.

- **Responsive Design**: The gallery is responsive and functions seamlessly on various devices, including mobile phones, tablets, and desktops.

- **Design Flexibility**: While meeting the above requirements, the project offers creative freedom to design a unique and appealing user interface.

## Getting Started

To set up and run the project locally, follow these steps:

1. **Install Dependencies**: In the project directory, run:

````
npm install
````

This command installs all the required packages listed in the `package.json` file.

2. **Run the Development Server**: Start the development server by running:

```
npm run dev
```
This command will launch the application, and you can access it in your web browser at `http://localhost:5173`.

## Project Structure

Here's an overview of the project's directory structure:

- **`src/`**: Contains the source code for the React application.
- **`public/`**: Includes static assets such as images.
- **`components/`**: Houses React components used throughout the application.
- **`firebase/`**: Contains Firebase configuration and authentication setup.

## Technology Stack

- **React**: The core library for building user interfaces.
- **Vite**: A fast and lightweight development server and build tool.
- **Tailwind CSS**: A utility-first CSS framework for styling the application.
- **Firebase**: Provides authentication services for user login.

## Contributing

Contributions to this project are welcome. Feel free to open issues, suggest improvements, or submit pull requests.

## License

This project is open-source and available under the [MIT License](LICENSE).

---


