<div align="center">

  # **IntelliHub AI Platform**

  ### _A Unified Workspace with Specialized AI Tools_

  <p>
    An AI-powered productivity platform integrating six core tools—Study Buddy, Text Tools, Code Helper, Creative Corner, Travel Planner, and Image Generator—into one seamless experience.
  </p>

<p> 

    <br />
  <img src="attached_assets/intlogo.jpg" alt="Intellihub Logo" width="150">
  <br />
  <a href="https://github.com/thecoderxyz/Intellihub/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/thecoderxyz/Intellihub?color=blue" alt="contributors" />
  </a>
  <a href="">
    <img src="https://img.shields.io/github/last-commit/thecoderxyz/Intellihub" alt="last update" />
  </a>
  <a href="https://github.com/thecoderxyz/Intellihub/network/members">
    <img src="https://img.shields.io/github/forks/thecoderxyz/Intellihub" alt="forks" />
  </a>
  <a href="https://github.com/thecoderxyz/Intellihub/stargazers">
    <img src="https://img.shields.io/github/stars/thecoderxyz/Intellihub" alt="stars" />
  </a>
  <a href="https://github.com/thecoderxyz/Intellihub/issues/">
    <img src="https://img.shields.io/github/issues/thecoderxyz/Intellihub" alt="open issues" />
  </a>
  <a href="https://github.com/thecoderxyz/Intellihub/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/thecoderxyz/Intellihub?color=brightgreen" alt="license" />
  </a>
</p>
</div>

---

## ✨ Core Features

IntelliHub provides a suite of powerful, AI-driven tools designed for various tasks, all accessible from a single dashboard.

| Feature             | Icon | Description                                             |
| ------------------- | :--: | ------------------------------------------------------- |
| **Study Buddy** |  🎓  | Provides educational assistance and generates study materials. |
| **Text Tools** |  📝  | Summarizes, reframes, and drafts content like emails.     |
| **Code Helper** |  💻  | Analyzes, explains, and generates code snippets.          |
| **Creative Corner** |  🎨  | Generates creative content, such as recipes.            |
| **Travel Planner** |  ✈️  | Creates detailed travel itineraries on demand.          |
| **Image Generator** |  🖼️  | Creates stunning visuals from text prompts using DALL-E 3. |


---

## 🛠️ Tech Stack

IntelliHub is built with a modern, type-safe, and scalable full-stack TypeScript architecture.

| Component      | Technology                                                                                                                                                                                                                                                                                                                                                                               |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend** | ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white) |
| **UI System** | ![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000?style=for-the-badge) ![Radix UI](https://img.shields.io/badge/Radix_UI-161618?style=for-the-badge)                                                                                                                                                                                                                                |
| **Backend** | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)                                                                                                                                                                      |
| **Database** | ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white) ![Drizzle ORM](https://img.shields.io/badge/Drizzle_ORM-C5F74F?style=for-the-badge) ![Neon](https://img.shields.io/badge/Neon-0A5752?style=for-the-badge)                                                                                                                            |
| **AI Services**| ![OpenAI](https://img.shields.io/badge/OpenAI-412991?style=for-the-badge&logo=openai&logoColor=white) (GPT-4 & DALL-E 3)                                                                                                                                                                                                                                                                                 |
| **Tooling** | ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge) ![TanStack Query](https://img.shields.io/badge/-TanStack_Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white)                                                                                                                                                                                                       |

---

## 🏗️ System Architecture Deep Dive

<details>
<summary><strong>Click to expand for detailed architecture information</strong></summary>

### Frontend Architecture
- **Framework Stack**: React 18 with TypeScript, using Vite for development and builds.
- **UI System**: `shadcn/ui` with Radix UI primitives and Tailwind CSS, following a clean, utility-focused design inspired by Linear.
- **State Management**: TanStack Query (React Query) for server state and a centralized `apiRequest` utility for fetch calls.
- **Routing**: Client-side routing handled by Wouter, with dedicated routes for the dashboard and each tool.
- **Styling**: Dark mode-first design with CSS variables and tool-specific accent colors for clear visual organization.

### Backend Architecture
- **Server Framework**: Express.js on Node.js with TypeScript.
- **API Structure**: RESTful API endpoints organized by feature (e.g., `/api/study`, `/api/text`, `/api/code`).
- **Request Validation**: Zod schemas for robust, runtime-safe request validation, with shared types between frontend and backend.
- **AI Integration**: Deep integration with the OpenAI API (GPT & DALL-E 3) using role-based system and user prompts.
- **Error Handling**: Centralized middleware for consistent error formatting and HTTP status codes.

### Data & Design
- **Data Storage**: Abstracted storage layer currently using in-memory storage (`MemStorage`). Drizzle ORM is configured for a future migration to a PostgreSQL database on Neon.
- **Design System**: A cohesive system using HSL colors, the `Inter` and `JetBrains Mono` fonts, and consistent component patterns from `shadcn/ui`.

</details>

---

## ⚙️ Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

* Node.js (v18 or later)
* npm or yarn
* Git

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/thecoderxyz/Intellihub.git](https://github.com/thecoderxyz/Intellihub.git)
    cd Intellihub
    ```

2.  **Install dependencies:**
    This project is a monorepo. Install dependencies for both frontend and backend from the root.
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    * Create a `.env` file in the `packages/backend` directory.
    * Copy the contents of `.env.example` into it.
    * Add your API keys:
        ```env
        OPENAI_API_KEY="your_openai_api_key"
        DATABASE_URL="your_neon_database_url"
        ```

4.  **Run the Development Server:**
    * From the root directory, start both the frontend and backend concurrently:
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

---

## 🤝 How to Contribute

Contributions make the open-source community an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1.  **Fork** the Project.
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`).
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`).
4.  Push to the Branch (`git push origin feature/AmazingFeature`).
5.  Open a **Pull Request**.

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 📧 Contact

Ranjit Nath

- **Instagram**: [@surdivine](https://www.instagram.com/surdivine)
- **Email**: imranjitnath@gmail.com
- **Project Link**: [https://github.com/thecoderxyz/Intellihub](https://github.com/thecoderxyz/Intellihub)

<div align="center">
<br>
<p>Built with TypeScript, passion, and a little bit of AI magic ✨</p>
</div>
