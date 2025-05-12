# ElderCare Web App - React + TypeScript + Vite

The **ElderCare Web App** is a web application designed to provide healthcare services for the elderly, focusing on appointment management and user information handling through a user-friendly interface. This project employs **React**, **TypeScript**, and **Vite** to build a fast and easily scalable web application.

## Technologies Used

- **React**: A widely-used JavaScript library for building user interfaces.
- **TypeScript**: A superset of JavaScript that enhances type safety and improves the maintainability of the codebase.
- **Vite**: A modern build tool that enables fast development with Hot Module Replacement (HMR), providing a smooth and efficient development experience.

## Setup and Configuration

### Installation

To get started with the project, follow the steps below:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/huongmt3/FinalYearProject_ElderCare.git
   ```
2. **Install dependencies**:
    ```bash
   cd FinalYearProject_ElderCare
   npm install
   ```
3. **Run the application**:
    ```bash
   npm run dev
   ```
4. **Navigate to the application in your browser at**: 
   http://localhost:3000
   
## Docker Setup

To use Docker for deploying the application:

1. **Build the Docker image**:
   ```bash
   docker build . -t elder-care:latest
    ```
2. **Run the application with Docker**:
    ```bash
    docker run -p 3000:3000 elder-care
     ```
3. **Successfully deployed!**

  After a successful build, the deployed website will be accessible via the address:
  http://192.168.76:3000

## Key Features

- **Appointment Management**:  
  Allows users to schedule appointments with professionals and view their upcoming appointments.

- **Avoid Duplicate Scheduling**:  
  Automatically filters out time slots that have already been booked.

- **Notification and Appointment Status Updates**:  
  Both users and professionals can receive notifications and update the status of appointments.

- **User-Friendly Interface**:  
  A simple and intuitive design tailored to enhance user experience.