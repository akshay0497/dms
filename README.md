# DMS (Document Management System) - React Native App

## Overview
A bilingual (Hindi-first, English-second) mobile application built with React Native to manage and access document. It uses Redux-Saga for state management and supports dynamic translations using i18n. The app offers drawer and stack navigation with an industrial UI design, optimized for offline and educational use.

---

## Features
- Multilingual support (Hindi & English)
- Modular structure using Redux with Redux-Saga
- Offline accessible static content with images
- Drawer navigation with stacked screens
- Theme and language toggle
- Organized screen structure (Home, About, Cards)
- API-ready architecture with placeholder services

---

## Project Structure
```bash
akshay0497-dms/
├── android/                # Android native files
├── ios/                   # iOS native files
├── src/                   # Main app code
│   ├── components/        # Reusable UI components
│   ├── config/            # API configs
│   ├── constants/         # App constants like dimensions and static data
│   ├── localization/      # i18n translations and logic
│   ├── navigations/       # Drawer & Stack navigator setups
│   ├── redux/             # State management using Redux & Sagas
│   ├── screens/           # App screens (Login, Home, Cards, About)
│   ├── services/          # Placeholder for API services
│   └── theme/             # Theme configuration and context
```

---

## Installation
```bash
git clone https://github.com/akshay0497/akshay0497-dms.git
cd akshay0497-dms
npm install
```

---

## Running the App
### Start Metro Server
```bash
npx react-native start
```

### Android
```bash
npx react-native run-android
```

### iOS
```bash
npx pod-install
npx react-native run-ios
```

---

## Available Scripts
```bash
npm start            # Run Metro bundler
npm run android      # Run on Android
npm run ios          # Run on iOS
npm run lint         # Lint the code
npm test             # Run tests
```

---

## Contributing
1. Fork the repository
2. Create a new branch (`git checkout -b feature-name`)
3. Make your changes
4. Commit your changes (`git commit -m 'Add new feature'`)
5. Push to the branch (`git push origin feature-name`)
6. Create a Pull Request

---

## License
This project is licensed under the MIT License.

---
## Contact
For any inquiries, feel free to contact:
- **Developer:** Akshay Kumar Gupta
- **Email:** 1997akshay04@gmail.com
- **GitHub:** [GitHub Profile](https://github.com/akshay0497)

