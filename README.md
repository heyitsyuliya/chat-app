### All you need to know to start the app :)

- Demo can be found [here]()
- To start the app, first cd into `/client` and run `npm start`
- To start the dev server, cd into `/server` and run `npm run dev-start` to start the dev server

### About the app
This is a very simple messaging app that is build with following tech stack:
- React
- React Hooks
- Bootstrap
- Socket.io

All messages and contacts are stored in local storage.

### User Stories:
- As a user I want to be able to log into the app if I have my ID created
- As a user I want to sign up if I don't have an ID created
- As a user I want to be able to create a Thread
- As a user I want to be able to create a Contact
- As a user I want to be able to view Contacts, Threads and the chat area
- As a user I want to be able to send and receive messages
- As a user I want to be able to delete threads

### To do:
- [ ] Try implementing styled components?
- [ ] Make UI improvements: dark background, rounder message bubbles, change send button and message field
- [ ] Implemet a button that clears local storage
  - [x] Implement 'Clear local storage' UI button
  - [ ] Make sure that button clears all local storage for contacts, threads and users
- [x] Add ability to delete threads
  - [x] When creating a thread, Assign an ID for that thread
  - [x] store that ID in local storage
  - [x] pass that thread into deleteThread function
  - [x] find the item in local storage
  - [x] delete the item
- [ ] Play a sound when sending and receiving messages

👇👇👇You probably won't need this, but I'll just keep this here anyway👇👇👇

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
