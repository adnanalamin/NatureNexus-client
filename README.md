# Nature Nexus

## Admin Details:
- **Username:** admin@naturenexus.com
- **Password:** 1@Asdfgh

## Live Site URL:
([Nature Nexus](https://naturenexus-232f7.firebaseapp.com/))

## Website Features:

1. **Comprehensive Navbar:**
   - Displays the website logo and name.
   - Includes navigation links: Home, Community, Blogs, About Us, Contact Us, Login/Register.
   - Shows the logged-in user’s profile picture, username, and email with a dropdown menu for Dashboard, Offer Announcements, and Logout.

2. **Engaging Banner/Slider Section:**
   - Eye-catching banners and sliders designed to match the website's theme, highlighting key features and special offers.

3. **Tourism and Travel Guide Section:**
   - **Overview Tab:** Engaging content with videos providing an enticing overview of the tours and services offered.
   - **Our Packages:** Features at least 3 clickable cards with:
     - Attractive spot photos with a wishlist heart icon.
     - Tour Type
     - Trip Title
     - Price
     - View Package button leading to detailed package information.
   - **Meet Our Tour Guides:** Lists tour guides with relevant information and a Details button leading to individual profiles.

4. **Tour Type Section:**
   - Displays all offered tour types, each being clickable to show detailed package information based on the selected type.
   - Each package includes information and a View Package button for detailed viewing.

5. **Tourist Story Section:**
   - Displays at least 4 tourist stories with relevant information and clickable details.
   - Includes a share button (using react-share package) for Facebook sharing.
   - An All Stories button leading to a page with all tourist stories.

6. **Footer:**
   - Contains relevant links and information for easy navigation and contact.

7. **Package Details Page:**
   - **Gallery Section:** Multiple images of the places tourists will visit.
   - **About The Tour Section:** Relevant information about the tour.
   - **Tour Plan:** Detailed itinerary with days and activities.
   - **Tour Guides List:** Clickable list of tour guides leading to their profiles.
   - **Booking Form:** Includes input fields for package name, tourist name, email, image URL, price, tour date, tour guide name, and a protected Book Now button.

8. **Tour Guide Profile Page:**
   - Shows detailed information about the tour guide, including name, profile picture, contact details, education, skills, work experience, and a review section for ratings and comments.

9. **Authentication:**
   - Login and Register pages with at least one social login option.
   - Links between login and register pages for easy navigation.

10. **Tourist Dashboard Page (Protected):**
    - **My Profile:** User’s information and pictures with a form for adding a story.
    - **My Bookings:** Table of all bookings with package name, tour guide name, tour date, tour price, status, Pay button, and Cancel button.
    - **My Wishlist:** Table of all wishlist items with Delete and Visit Details buttons.
    - **Request to Admin:** Button to request becoming a tour guide, showing request status.

11. **Tour Guide Dashboard Page (Protected):**
    - **My Profile:** Tour guide’s information and pictures with a form for adding a profile.
    - **My Assigned Tours:** Table of assigned tours with package name, tourist name, tour date, tour price, Accept button, and Reject button.

12. **Admin Dashboard Page (Protected):**
    - **My Profile:** Admin’s information and pictures.
    - **Add Package:** Form for adding new packages with relevant information.
    - **Manage Users:** Table of users with search, filter by role, and buttons to Make Admin or Make Tour Guide.

## Additional Features:
- **Pagination:** Implemented at the footer of all tables to show 10 users at a time.
- **JWT Authentication:** Used for secure login and session management.
- **Discount Message:** Animation to reveal a congratulations message and Apply button for users booking more than 3 times.
