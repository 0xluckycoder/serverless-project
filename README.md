## About

This is a full-stack advertisement posting website that allows users to register and post ads from their account.

**TechStack**

- Frontend
  This website frontend is built in Reactjs library & Sass for styling. I'm also using Formik library for handle step form and Yup library to handle form validations.

- Backend
  Serverless Framework
  AWS rest api gateway
  lambda functions
  Cloudinary (image storage)

**Authentication**
The authentication system is still in development. I've added a simple auth system for now.

## TODO

### FrontEnd

- [x] - step form for create post
- [x] - make image list sortable
- [x] - user account
- [x] - edit post functionality
- [x] - validate every form data
- [x] - front posts feed
- [ ] - popup post modal
- [ ] - logout

### Backend

- [x] - setup serverless environment
- [x] - authentication routes
- [x] - CRUD post routes
- [x] - secure private routes
- [x] - handle errors with status codes
- [ ] - use rest end point to filter data
- [ ] - secure with api key
- [ ] - Refactor Authentication system

## API Routes

### Users

- createUser POST /dev/users (public)
- login POST /dev/auth public)
- getUser GET /dev/auth private)

### Posts

- createPost POST /dev/posts (private)
- postsByUser GET /dev/users/:id/posts (private)
- updatePost PUT /dev/posts/:id (private)
- getPostsById GET /dev/posts/:id (public)
