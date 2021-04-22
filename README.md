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

- GET /
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout

  - body: (empty)

- GET /events
  - renders the event list + the create form
- POST /events/create
  - redirects to / if user is anonymous
  - body:
    - name
    - date
    - location
    - description
- GET /events/:id
  - renders the event detail page
  - includes the list of attendees
  - attend button if user not attending yet
- POST /events/:id/attend
  - redirects to / if user is anonymous
  - body: (empty - the user is already stored in the session)

## Models

1. User Model

- Username
- Email address
- Password

2. Admin Model

- Username
- Password

3. Info Model

- Status
- Type of Covid test: PCR, LAMP,
- Current date
- Travelling to
- Travelling from
- Quarantine thing
- Status -- WE ARE NOT SURE IN WHICH MODEL IT COULD GO

## Links

### Trello

[Link to your trello board](https://trello.com/b/H1ZRgHKI/sovid)

### Git

[Repository Link](https://github.com/Rumas97/Covid-Travel-Advice)

[Deploy Link](http://heroku.com)

### Slides

[Slides Link](http://slides.com)
