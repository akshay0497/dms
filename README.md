This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# MedCure - First Aid Guide App

MedCure is a bilingual (Hindi-first, English-second) React Native application that serves as a first-aid guide for medical emergencies. The app features an industrial design for its UI and uses Redux-Saga for state management. It also supports full application translation using i18n with Redux.

## Features

- **Bilingual Support:** Hindi-first, with English as a secondary language.
- **First-Aid Guidance:** Provides crucial medical emergency information.
- **Industrial UI Design:** Designed for easy navigation in emergency situations.
- **State Management with Redux-Saga:** Ensures smooth and predictable data handling.
- **Drawer & Stack Navigation:** Offers a seamless user experience.
- **Expandable API Support:** Uses array-based data, making it easy to integrate future APIs.

## Tech Stack

- **React Native**
- **TypeScript**
- **Redux & Redux-Saga**
- **React Navigation (Drawer & Stack Navigation)**
- **i18n for Localization**
- **Jest for Testing**
- **Metro Bundler**

## Installation

To set up the project, follow these steps:

### Prerequisites
- Node.js (>=14.x)
- npm or yarn
- React Native CLI
- Android Studio (for Android development)
- Xcode (for iOS development)

### Steps

1. Clone the repository:
   ```sh
   git clone https://github.com/swatiitgithub/Medcure-App.git
   cd medcure
   ```

2. Install dependencies:
   ```sh
   npm install
   # or
   yarn install
   ```

3. Set up iOS dependencies (MacOS only):
   ```sh
   cd ios
   pod install
   cd ..
   ```

4. Run the app:
   ```sh
   npm run android   # For Android
   npm run ios       # For iOS (MacOS only)
   ```

## Project Structure

```
└── medcure/
    ├── src/                   # Source code
    │   ├── assets/             # Images and media
    │   ├── constants/          # Constant values
    │   ├── localization/       # i18n files
    │   ├── navigations/        # Navigation setup
    │   ├── redux/              # Redux store, actions, and reducers
    │   ├── screens/            # Screen components
    ├── android/               # Android native code
    ├── ios/                   # iOS native code
    ├── package.json           # Dependencies and scripts
    ├── App.tsx                # Root component
    ├── README.md              # Project documentation
```

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.

## Contact
For any inquiries, feel free to contact:
- **Developer:** Swati Mishra
- **Email:** swatimishra3092002@gmail.com
- **GitHub:** [GitHub Profile](https://github.com/swatiitgithub)

---

This README provides a comprehensive overview of your project, making it easy for others to understand, install, and contribute to it.


# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
