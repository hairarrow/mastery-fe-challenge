This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Load Board

A single page app that lets users view a list of loads and filter or sort them.

## Set up

After you clone this repo, you'll need to install dependencies before you can run the project:

```
$ git clone https://github.com/hairarrow/mastery-fe-challenge.git
$ cd mastery-fe-challenge
$ yarn
$ yarn start
```

## Notes

-   I tried to as much as I could in under an hour
-   I used typescript to add strongly typed features to the code. I was able to quickly generate types using JSON-to-typescript, and this enabled some great tooling in vscode that boosted my productivity
-   Another decision I made considering the time was to use [Antd](https://ant.design) since their well-built components provide significant user features that already deliver great UX and accessibility.
-   You'll find the models and reducer in `src/Context.ts`

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
