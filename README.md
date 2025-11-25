# 💰 IKARY PAY - Mobile Wallet Application

<div align="center">

![IKARY PAY](https://img.shields.io/badge/IKARY-PAY-0EA5E9?style=for-the-badge)
![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Expo](https://img.shields.io/badge/Expo-000020?style=for-the-badge&logo=expo&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

**A modern, secure, and beautiful mobile wallet application with sky blue gradient theme**

[Features](#-features) • [Quick Start](#-quick-start) • [Documentation](#-documentation) • [Screenshots](#-screenshots)

</div>

---

## 🌟 Features

### 🔐 Authentication & Security
- ✅ Secure user registration and login
- ✅ JWT token-based authentication
- ✅ Automatic token refresh
- ✅ Password reset functionality
- ✅ Secure token storage using Expo SecureStore
- ✅ Session management

### 💳 Wallet Operations
- ✅ Real-time balance display
- ✅ Send money to recipients
- ✅ Transaction history with filters
- ✅ Detailed transaction information
- ✅ Pull-to-refresh functionality
- ✅ Pagination support

### 👤 Profile Management
- ✅ View and edit profile
- ✅ Account information display
- ✅ Wallet details
- ✅ Settings and preferences
- ✅ Secure logout

### 🎨 Design & UX
- ✅ Beautiful sky blue gradient theme
- ✅ Modern and clean UI
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Intuitive navigation
- ✅ Loading states and error handling

---

## 🚀 Quick Start

### Prerequisites

```bash
Node.js >= 18
npm or yarn
Expo CLI
```

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ikary_wallet_app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure API endpoint**
   
   Edit `config/api.config.ts`:
   ```typescript
   export const BASE_URL = 'http://YOUR_API_URL:3000/api';
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

5. **Run on your device**
   - Scan QR code with Expo Go app
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator

---

## 📱 Screenshots

### Authentication Screens
- **Login Screen**: Sky blue gradient header with secure login
- **Register Screen**: Easy account creation with validation
- **Password Reset**: Two-step password recovery

### Main Screens
- **Home Screen**: Balance display, quick actions, recent transactions
- **Transactions Screen**: Filterable transaction history
- **Profile Screen**: User information and settings
- **Payment Screen**: Send money with confirmation

---

## 📚 Documentation

### Complete Guides

- **[USAGE_GUIDE.md](./USAGE_GUIDE.md)** - Complete setup and usage instructions
- **[API_DOCUMENTATION.md](../API_DOCUMENTATION.md)** - Backend API documentation

### Project Structure

```
ikary_wallet_app/
├── app/                    # Screens and navigation
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main app tabs
│   ├── payment.tsx        # Payment screen
│   └── _layout.tsx        # Root navigation
├── components/ui/         # Reusable UI components
├── config/                # Configuration files
├── constants/             # Theme and constants
├── context/               # React Context (Auth)
├── services/              # API services
└── USAGE_GUIDE.md        # Detailed usage guide
```

---

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **State Management**: React Context API
- **HTTP Client**: Axios
- **Secure Storage**: Expo SecureStore
- **Icons**: Ionicons
- **Styling**: StyleSheet with custom theme

---

## 🎨 Theme

The app features a beautiful **sky blue gradient theme**:

- Primary: `#0EA5E9` (Sky Blue)
- Gradient: `#0EA5E9` → `#38BDF8` → `#7DD3FC`
- Success: `#10B981` (Green)
- Error: `#EF4444` (Red)
- Background: `#F8FAFC` (Light Blue-Gray)

---

## 🔧 Configuration

### API Configuration

**File**: `config/api.config.ts`

```typescript
// Development (Android Emulator)
export const BASE_URL = 'http://10.0.2.2:3000/api';

// Development (iOS Simulator)
export const BASE_URL = 'http://localhost:3000/api';

// Physical Device (Same Network)
export const BASE_URL = 'http://192.168.1.100:3000/api';

// Production
export const BASE_URL = 'https://api.ikarypay.com/api';
```

### Theme Configuration

**File**: `constants/theme.ts`

Customize colors, spacing, typography, and shadows.

---

## 🧪 Testing

### Test User Creation

```bash
# Using the app
1. Open app
2. Tap "Sign Up"
3. Fill details
4. Create account

# Using API
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "test123456"
  }'
```

### Test Credentials

```
Email: test@example.com
Password: test123456
```

---

## 🐛 Troubleshooting

### Common Issues

**Network Error:**
- Check backend is running
- Verify API URL in `config/api.config.ts`
- Use correct IP for physical devices

**401 Unauthorized:**
- Token expired - logout and login again
- Clear app data

**App Crashes:**
```bash
npm start -- --clear
```

See [USAGE_GUIDE.md](./USAGE_GUIDE.md) for detailed troubleshooting.

---

## 📦 Available Scripts

```bash
npm start          # Start development server
npm run android    # Run on Android
npm run ios        # Run on iOS
npm run web        # Run on web
npm run lint       # Run linter
```

---

## 🔒 Security

- ✅ Secure token storage with Expo SecureStore
- ✅ Automatic token refresh
- ✅ HTTPS in production
- ✅ Input validation
- ✅ Error handling
- ✅ Session management

---

## 🚧 Coming Soon

- 🔄 Push notifications
- 🔄 Biometric authentication (Face ID / Touch ID)
- 🔄 QR code payments
- 🔄 Transaction receipts
- 🔄 Multi-language support
- 🔄 Dark mode
- 🔄 Analytics dashboard

---

## 📄 License

Copyright © 2024 IKARY PAY. All rights reserved.

---

## 👥 Support

- **Email**: support@ikarypay.com
- **Documentation**: See USAGE_GUIDE.md
- **Issues**: Create GitHub issue

---

## 🙏 Acknowledgments

Built with:
- [Expo](https://expo.dev)
- [React Native](https://reactnative.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Expo Router](https://docs.expo.dev/router/introduction/)

---

<div align="center">

**Made with ❤️ by IKARY PAY Team**

[⬆ Back to Top](#-ikary-pay---mobile-wallet-application)

</div>
