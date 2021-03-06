# Project Name

COVID TRAVEL ADVICE

## Description

Providing information about the covid travel restrictions in different countries.

## Pages

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I see what the app is about and directly find information
- **sign up** - As a user I want to sign up on the webpage so that I can enter information about the COVID travel restrictions in different countries
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **profile** - As a user I want to see my profile page to be able to edit it or delete it if I want to
- **create info** - As a user I want to create information so I can help others know about COVID travel restrictions
- **detail info** - As a user I want to see the details of COVID travel restrictions for a specific country
- **successful entry** - As a user I want to be able to see that I have entered the information correctly
- **admin entries** - As an admin I want verify the user entries.

## Backlog

List of other features outside of the MVPs scope

Profile page

- Upload my profile picture

Detail Info page

- Voting the information posted by the user
- Extra populate() to show more details of the user

Login page

- Login using Google, Facebook, etc.

Homepage

- Clickable map in the homepage
- About us and Contact page

## ROUTES:

**index.js**

- GET / (Homepage) **DONE**
  - renders /index.hbs the homepage

**auth.routes.js**

- GET /main (SignUp/LogIn MainPage) **DONE**

  - redirects to / if user logged in 
  - renders the /main-page.hbs (to log in or sign up)

- GET /auth/signup (sign up page) - **DONE**

  - renders the /signup-form.hbs
  - redirects to /signup-successfully if user signed up correctly
  - renders /signup-success.hbs

- POST /auth/signup **DONE**

  - redirects to /signup-successfully if user signed up correctly
  - body:
    - username
    - email address
    - password

- GET /auth/login (login page) **DONE**

  - redirects to /homepage or /create-information
  - renders the /login-form.hbs
  - if log in as admin, you go to the /verify-entries.hbs page

- POST /auth/login WE NEED ANOTHER GET ANOTHER POST FOR LOGIN AS ADMIN **DONE**

  - redirects to /homepage or /create-information
  - body:
    - username
    - password

- POST /auth/logout **DONE**

  - body: (empty)

- GET /profile/:id **DONE**

  - renders the /user-profile.hbs page

- GET /profile/:id/edit **DONE**

  - renders the /edit-profile.hbs page

- POST /profile/:id/edit **DONE**

  - params:
    - id
  - body:
    - username
    - email address
    - profile picture as backlog
  - renders the /user-profile.hbs

- GET /user-entries **Done**

  - renders /verify-entries.hbs

- POST /user-entries/:id/delete **Done**

  - params:
    - id
  - redirects to /verify-entries.hbs

- POST /user-entries/:id/verify //**Done** Use method findByIdAndUpdate()
  - params:
    - id
  - redirects to /verify-entries.hbs REDIRECT TO THE ROUTES NOT THE HB FILES

**covid-info.routes.js** (Shows info for a single country page)

- GET /travel-restrictions/:country **DONE without the dinamic**

  - renders the /country-info.hbs
  - includes the travel covid info for a country
  - includes the filter thing ASK LUIS --> If we need to put a POST route for Filtering
    //WAYS OF DOING THIS:

    1. When we apply filter. We are just fetching information. It could be a POST request

       - Render the view only with the things that we apply the filter for.
       - find

  - Displays the user name for each info entry. (.populate())
  - Includes status: pending or verifying

- GET /add-information // AUTHORIZE **DONE**

  - renders the /add-info-form.hbs

- POST /add-information // AUTHORIZE **DONE**
  - body:
    - travelling from
    - travelling to
    - quarantine required
    - covid test
    - current date
    - share your experience
  - redirects to /entry-success.hbs

## Models

1. User Model **DONE**

- Username: String
- Email address: String
- Password: String

2. Admin Model

- Username: String
- Password: String

3. Info Model **DONE**

- Status: String // Boolean or Enum
- Type of Covid test: PCR, LAMP,: String
- Current date: Number
- Travelling to: String
- Travelling from: String
- Quarantine thing: String
- UserId: {
  type: Schema.Types.ObjectId,
  ref: "User"
  }

##Seeds

- Admin.seeds.js

## Links

### Trello

[Link to our Trello board](https://trello.com/b/H1ZRgHKI/sovid)

### Git

[Repository Link](https://github.com/Rumas97/Covid-Travel-Advice)

[Deploy Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com)
