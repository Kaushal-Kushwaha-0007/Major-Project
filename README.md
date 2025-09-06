Project: Wanderlust – Airbnb-like Travel Listing Platform
Tech Stack: Node.js, Express, MongoDB, EJS, Mongoose, Bootstrap

Developed a full-stack web application enabling users to view and explore travel property listings with dynamic routing and templating using EJS

Implemented CRUD functionalities for listings, integrated MongoDB for storage and retrieval, and used Mongoose for schema modeling

Designed intuitive frontend with Bootstrap and added form validations to enhance user experience

Handled server-side rendering, routing, and middleware for clean backend logic using Express.js

Integrated error handling and RESTful APIs to ensure scalability and robustness
Integrated Mapbox API to display dynamic maps based on listing locations

# 🚀 Project Flow

## 📊 Flowchart

![Project Flowchart](./major_project_flowchart.png)

---

## 🌐 Flow Explanation

### **1. User Interactions**
- 👤 A **User** interacts with the system through routes like `/signup`, `/login`, `/listings`, etc.  
- These requests pass through **Routes → Controllers → Database/Services**, and finally respond with **EJS-rendered views**.

---

### **2. 🔑 Authentication (Users)**
- **Signup (`/signup`)** → `usersController.signup`  
  - ✨ Creates new user → Stored in **MongoDB (Users)**  
  - ✅ Automatically logs in and redirects to `/listings`
- **Login (`/login`)** → Passport Local Strategy  
  - 🔍 Verifies credentials with **MongoDB (Users)**  
  - 📂 Starts a session and redirects to `/listings`
- **Logout (`/logout`)** → `usersController.logout`  
  - 🚪 Ends session and redirects to listings page

---

### **3. 🏡 Listings (Core CRUD)**
- **View Listings (`GET /listings`)** → `listingsController.index`  
  - 📥 Fetches all listings from **MongoDB (Listings)**  
  - 🎨 Renders with **EJS**
- **Search Listings (`GET /listings?q=...`)**  
  - 🔎 Queries by `title` or `location`  
  - 📋 Returns filtered results
- **Create Listing (`POST /listings`)** → `listingsController.createListing`  
  - 🖼️ Uses **Multer** to upload images → stored in Cloud  
  - 🗺️ Uses **Mapbox Geocoding API** to convert location → coordinates  
  - 💾 Saves new listing in **MongoDB (Listings)**  
  - ↪️ Redirects to `/listings`
- **Show Listing (`GET /listings/:id`)** → `listingsController.showListing`  
  - 📌 Fetches listing + reviews + owner (via `.populate`)  
  - 🎨 Renders with **EJS**
- **Update Listing (`PUT /listings/:id`)** → `listingsController.updateListing`  
  - 📤 Updates MongoDB data  
  - 🖼️ Handles new image (via **Multer**) if provided  
- **Delete Listing (`DELETE /listings/:id`)** → `listingsController.destroyListing`  
  - 🗑️ Deletes listing from **MongoDB**

---

### **4. 📝 Reviews (Nested in Listings)**
- **Create Review (`POST /listings/:id/reviews`)** → `reviewsController.createReview`  
  - 🆕 Creates new review in **MongoDB (Reviews)**  
  - 🔗 Links review ID to listing’s `reviews[]` array  
  - ↪️ Redirects back to listing page
- **Delete Review (`DELETE /listings/:id/reviews/:reviewId`)** → `reviewsController.destroyReview`  
  - ❌ Removes review from **MongoDB (Reviews)**  
  - 🔗 Unlinks from the associated listing

---

### **5. 🛡️ Middleware**
- 🔒 `isLoggedIn` → Only logged-in users can create/update/delete  
- 👑 `isOwner` → Only the listing owner can edit/delete  
- ✍️ `isReviewAuthor` → Only the review author can delete  
- ✅ `validateListing` & `validateReview` → Input validation (Joi)

---

### **6. 🌍 External Services**
- 🗺️ **Mapbox Geocoding API** → Converts location text → longitude & latitude  
- 🖼️ **Multer + Cloud Storage** → Handles image uploads for listings  
- 🎨 **EJS Templates** → Renders all dynamic views
