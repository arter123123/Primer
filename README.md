# Entity

Один ко многим: User → Order (один пользователь, много заказов).
Многие ко многим: Order ↔ Product через OrderItem (заказ может содержать много продуктов, продукт может быть в нескольких заказах).
Многие ко многим: Product ↔ Category (продукт может быть в нескольких категориях, категория содержит много продуктов).
Один к одному: User ↔ Profile (у пользователя один профиль).


# Entity and 
1. User (Пользователь)
Пользователь может иметь много заказов (Order) и один профиль (Profile).

User.java
java
Показать в строке
Связь один ко многим: User → Order (один пользователь может иметь много заказов).
Связь один к одному: User → Profile (у пользователя один профиль).
2. Order (Заказ)
Заказ связан с пользователем и содержит элементы заказа (OrderItem).

Order.java
java
Показать в строке
Связь многие к одному: Order → User (много заказов принадлежат одному пользователю).
Связь один ко многим: Order → OrderItem (один заказ содержит много элементов).
3. OrderItem (Элемент заказа)
Связывает заказы и продукты, реализуя отношение многие ко многим между Order и Product.

OrderItem.java
java
Показать в строке
Связь многие к одному: OrderItem → Order и OrderItem → Product.
4. Product (Продукт)
Продукт может принадлежать к нескольким категориям.

Product.java
java
Показать в строке
Связь многие ко многим: Product ↔ Category (продукт может быть в нескольких категориях, категория содержит много продуктов).
5. Category (Категория)
Категория может содержать много продуктов.

Category.java
java
Показать в строке
Связь многие ко многим: Category ↔ Product.
6. Profile (Профиль)
Дополнительная информация о пользователе.

Profile.java
java
Показать в строке
Связь один к одному: Profile → User.
7. Role (Роль)
Перечисление ролей для пользователей интернет-магазина.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
