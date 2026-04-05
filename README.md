# KazCheck Safety Mobile

![Status](https://img.shields.io/badge/status-in%20progress-yellow)
![Tech](https://img.shields.io/badge/stack-Expo_55_|_React_Native_|_TypeScript_|_Supabase-blue)

A modern mobile application designed to protect users from phone scams in Kazakhstan. The app uses **Expo Router** for file-based navigation, strict **TypeScript** typing, and seamless **Supabase** integration for real-time reporting and risk calculation.

## 🚀 Key Features

- **Smart Number Verification**:
  - **Edge Functions Integration**: Instant number verification via cloud functions (`check-number`), returning risk levels and probability scores.
  - **Risk Visualization**: Dynamic components (Progress Bars, Badges) that adapt their colors based on the threat level (`safe`, `warning`, `danger`).
- **Reporting System**:
  - **Seamless Reporting Form**: Quick and easy submission of scammer data directly to the Supabase database.
  - **Automatic Typing**: Full synchronization of frontend types with the DB schema (`database.types.ts`).
- **Premium UX/UI**:
  - **Custom Widgets**: Modular cards for call history (`CallHistoryCard`) and risk details (`DetailsCard`).
  - **Vector Graphics**: Utilizing `@expo/vector-icons` (Ionicons) for lightweight and crisp icons across all screens.
  - **Global Styles**: A unified design system powered by centralized `Colors` and `globalStyles` configs.

## 🛠 Tech Stack

- **Core**: React Native, Expo SDK 55, TypeScript
- **Routing**: Expo Router (File-based routing)
- **Backend/BaaS**: Supabase (`@supabase/supabase-js`, Edge Functions)
- **UI Components**: Custom Architecture (no heavy UI libraries), Expo Vector Icons
- **Package Manager**: pnpm

## ⚙️ Getting Started

1.  **Clone the repository**

    ```bash
    git clone [your-repository-url-here]
    cd kazcheck-safety-mobile
    ```

2.  **Install dependencies**

    ```bash
    pnpm install
    ```

3.  **Environment Setup**
    Create a `.env.local` file in the root of the project and add your Supabase keys:

    ```text
    EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
    EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

4.  **Start the development server**

    ```bash
    npx expo start -c
    ```

5.  **Run on Device/Simulator**
    - Scan the QR code with **Expo Go** (Android/iOS).
    - Or press `w` to open in a web browser / `i` for iOS Simulator / `a` for Android Emulator.

## 🏗 Architecture & Decisions

- **Component-Based Architecture**: The UI is strictly divided into reusable layers: `shared` (base elements like Badges and ProgressBars), `widgets` (complex cards), and `sections` (large screen blocks).
- **Backend Isolation**: All database and API logic is encapsulated within the `supabase/` directory. The client is initialized once and reused throughout the app.
- **End-to-End Type Safety**: Utilizing auto-generated Supabase types ensures that data arriving from the backend strictly matches component interfaces.
- **Performance First**: We avoided heavy UI libraries in favor of native React Native components and `StyleSheet` to ensure 60fps and a minimal bundle size.

## 🎥 Project Structure

```text
kazcheck-safety-mobile/
  ├── app/                 # Screens & Routing (Expo Router)
  │   ├── index.tsx        # Home Screen (Search & Stats)
  │   ├── result.tsx       # Verification Result Screen
  │   └── report.tsx       # Submit Report Screen
  ├── components/          # Reusable UI
  │   ├── sections/        # Large logical blocks (ReportForm, DetailsCard)
  │   ├── shared/          # Base components (ProgressBar, Badge)
  │   └── widgets/         # Cards and list items (CallHistoryCard)
  ├── constants/           # Themes, Colors, Global Styles
  └── supabase/            # Backend Setup
      ├── index.ts         # Supabase Client Init
      └── database.types.ts# Auto-generated DB types
