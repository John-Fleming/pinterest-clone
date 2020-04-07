# pinterest-clone

## Description
This project is a simplified clone of the popular social media app, Pinterest. Users first login using their Google accounts and then can create, delete, and update boards with individual pins related to their interests. This project was created as a class assignment for Nashville Software School in order to learn the fundamentals of NoSQL databases using Firebase and CRUD via Axios HTTP requests. 

Users create boards related to an area of personal interest where they can add individuals pins that contain image URLs to save ideas related to that ineterest. Each board contains buttons to view the individual board and its associate pins, as well as a button to delete the board and all of its pins. 

When viewing a specific board, a delete button will display when a user hovers their cursor over an individual pin, allowing them to delete that specific pin. 

## Screenshots
Google Authentication screen

![google login](./screenshots/login-screenshot.png)

After logging in, a user can view a collection of user boards

![boards view](./screenshots/boards-view.png)

When clicking on the view board button, users can view a collection of pins associiated with that specific board

![pins view](./screenshots/pins-view.png)

## How to Run
1. Clone this repo
1. Make sure you have http-server installed via npm. If not get it [here](https://www.npmjs.com/package/http-server)
1. On your command line, run `hs -p 9999`
1. In your browser, go to `http://localhost:9999`
