# Blog Post App

A **Blog Post App** built using modern web development tools and best practices. This app enables users to interact with public blog data through a user-friendly interface while demonstrating proficiency in building robust and efficient applications.

## Table of Contents

- [Tech Stack](#tech-stack)
- [Features](#features)
- [Pages](#pages)

## Tech Stack

- **Next.js v13 (Page Router)**
- **TypeScript**
- **Axios**
- **TanStack Query (v5)**
- **Tailwind CSS (v3)**
- **Ant Design (v5)**
- **GoRest API**

## Features

- **User Authentication**: A login page to enter credentials, including the GoRest API token.
- **Post List**: Display a list of blog posts from GoRest.
- **Post Detail**: A detailed page for each post, including user information and actions for creating, editing, or deleting posts.
- **Create Post**: An interface to create a new blog post by providing a title and body.
- **Edit Post**: Pre-filled input fields for editing an existing post’s title and body.
- **Delete Post**: An option to delete a post from the list.
- **Responsive Design**: The app is fully responsive and optimized for mobile and desktop views.

## Pages

### `/login`

A login page where users can enter their **name** and **GoRest token**.

**Required Fields:**

- Name
- GoRest Token

### `/posts`

A page that shows a list of posts fetched from the GoRest API. Each post is clickable and links to its detailed view.

### `/posts/[id]?user_id=[userId]`

A page displaying the details of a specific post, including:

- The post's **title** and **body**
- The **user information** (author)
- Actions to:
  - **Create a new post** (requires title and body)
  - **Edit** an existing post (pre-filled with current post data)
  - **Delete** a post

### `/posts/update?post_id=[postId]`

A page that allows editing an existing post. The title and body fields are pre-filled with the current post data, and users can modify them and submit the changes.
