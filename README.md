# Smart Attendance System

Smart Attendance Management System is an application developed for daily attendance of student/
staff in colleges or schools or any other organizations. This project attempts to record attendance
through face detection and live location. The objective of this project is to develop a system for
managing attendance that can be used by all individuals in educational institutions or in any
organization. This software requires to store the user's own image to be detected. The system will
load the user’s image at the sign-up step. For giving attendance the user needs to sign in and the
real time image of the user will be captured to take the attendance and it will be matched with the
stored image of the person. The proposed system records attendance without allowing any chance
of proxy attendance by the students. The administrator maintains the database. After verifying the
user, the attendance will be taken, and it will be saved in an excel sheet with their live location and
time of attendance. In this approach, face recognition and face detection are used. This face
detection differentiates faces from non-faces and is therefore essential for accurate attendance.
The other strategy involves face recognition for marking the accurate attendance of the students.

## Table of Contents
- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Features

 - `Facial Recognition`: Utilizes the face-recognition library to recognize faces for attendance tracking.
 - `Responsive UI`: A responsive and dynamic user interface developed using React, Redux, and Material UI.
 - `Database`: Stores data in a PostgreSQL database for efficient data management.
 - `Cloudinary Integration`: Manages photo storage using Cloudinary, ensuring scalability and accessibility.

## Prerequisites

  Before you begin, ensure you have met the following requirements:

- Node.js and yarn installed on your system.
- Python and pip should be installed in your system ([Documentation](https://medium.com/geekculture/make-your-first-web-app-with-django-python-in-a-virtual-environment-4cce2241031d)).
- Make sure you have installed Django globally or have a Django virtual environment.
- Create a cloudinary account.
- Enable unsigned uploading to cloudinary ([Documentation](https://medium.com/@aalam-info-solutions-llp/how-to-upload-images-to-cloudinary-with-react-js-ad402f775818)).

## Installation

1. Clone the repository:

```bash
git clone git@github.com:asheshmandal2003/smart-attendance-system.git
```

2. Navigate to the project directory:

```bash
cd smart-attendance-system
```

3. Setup the `.env` files using `.example.env` file in the corresponding directory.

4. Run the backend server

```bash
cd server
pip install -r requirements.txt
python manage.py runserver
```

5. Run the frontend server:

```bash
cd client
yarn
yarn dev --port 3000
```
6. Open your browser and navigate to `http://localhost:3000`.

## Technologies Used

- `Backend`: Django, face-recognition library, Django REST Framework
- `Frontend`: React.js, React Router Dom, Redux.js, Material UI
- `Database`: PostgreSQL
- `Photo Storage`: Cloudinary

## Contributing

- Fork the repository.
- Create a new branch: git checkout -b feature/new-feature.
- Make your changes and commit them: git commit -m 'Add new feature'.
- Push to the branch: git push origin feature/new-feature.
- Submit a pull request.

## License

This project is licensed under the MIT License.
