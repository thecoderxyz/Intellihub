# IntelliHub AI Platform

## Overview

IntelliHub is an AI-powered productivity platform that provides multiple specialized tools in a unified workspace. The application offers six core features: Study Buddy (educational assistance), Text Tools (content manipulation), Code Helper (code analysis and generation), Creative Corner (recipe generation), Travel Planner (itinerary creation), and Image Generator (AI image creation). Built as a full-stack TypeScript application, it uses React with shadcn/ui components on the frontend and Express with OpenAI integration on the backend.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Stack**: React 18 with TypeScript, using Vite as the build tool and development server. The application follows a component-based architecture with client-side routing handled by Wouter.

**UI System**: Implements shadcn/ui design system with Radix UI primitives and Tailwind CSS. The design follows a "Design System-Based (Utility-Focused Application)" approach inspired by Linear's clean interface, prioritizing function over form with consistent interactions and clear information hierarchy.

**State Management**: Uses TanStack Query (React Query) for server state management with custom query client configuration. API requests are handled through a centralized `apiRequest` utility that manages fetch calls with proper error handling and credentials.

**Routing Structure**: Page-based routing with dedicated routes for each tool:
- `/` - Dashboard (overview of all tools)
- `/study` - Study Buddy
- `/text` - Text Tools
- `/code` - Code Helper
- `/creative` - Creative Corner
- `/travel` - Travel Planner
- `/image` - Image Generator

**Component Organization**: Components are organized into:
- `components/ui/` - Reusable shadcn/ui components (buttons, cards, inputs, etc.)
- `components/` - Application-specific components (AppSidebar, OutputDisplay, ThemeProvider)
- `pages/` - Route-level page components
- `hooks/` - Custom React hooks (use-mobile, use-toast)

**Styling Approach**: Dark mode-first design using CSS variables and Tailwind utility classes. The theme uses a carefully crafted color palette with tool-specific accent colors for visual categorization (blue for Study Buddy, teal for Text Tools, purple for Code Helper, etc.).

### Backend Architecture

**Server Framework**: Express.js running on Node.js with TypeScript. The server implements middleware for JSON parsing, URL encoding, and request logging with duration tracking.

**API Structure**: RESTful API endpoints organized by feature:
- `POST /api/study` - Study Buddy operations (explain, questions, mcqs, lessonPlan)
- `POST /api/text/summarize` - Text summarization
- `POST /api/text/email` - Email draft generation
- `POST /api/text/tone-shift` - Tone adjustment
- `POST /api/code` - Code analysis and generation
- `POST /api/creative` - Recipe generation
- `POST /api/travel` - Travel itinerary creation
- `POST /api/image` - Image generation

**Request Validation**: All API endpoints use Zod schemas for runtime type validation and request parsing, ensuring type safety between frontend and backend through shared schema definitions in `shared/schema.ts`.

**AI Integration**: OpenAI API integration with GPT-5 for text generation and DALL-E 3 for image generation. The system uses role-based prompting with system prompts defining AI behavior and user prompts containing specific requests.

**Development vs Production**: Vite integration in development mode for HMR (Hot Module Replacement) and static file serving in production. The build process bundles both frontend (Vite) and backend (esbuild) separately.

**Error Handling**: Centralized error handling middleware that catches errors, formats them consistently, and returns appropriate HTTP status codes with error messages.

### Data Storage

**Current Implementation**: In-memory storage using a `MemStorage` class that implements an `IStorage` interface. The storage layer is abstracted to allow future migration to persistent database solutions.

**Database Configuration**: Drizzle ORM is configured for PostgreSQL with Neon serverless database support. Schema definitions are located in `shared/schema.ts` with migrations output to `./migrations`. The database is not currently in active use but infrastructure is prepared.

**User Management**: Basic user storage interface with methods for creating users and retrieving by ID or username, though authentication is not currently implemented in the application.

### Design System

**Color System**: Uses HSL color values with CSS custom properties for theming. Implements a dark mode design with:
- Background layers at different opacity levels
- Tool-specific accent colors for categorization
- Interaction states (hover, active, focus) with calculated color variations
- Text hierarchy using gray scale values

**Typography**: Inter font family for general text and JetBrains Mono for code displays. Font weights range from 400-800 to support different hierarchies.

**Component Patterns**: Consistent use of shadcn/ui component patterns with variants for different states and sizes. Components use class-variance-authority for managing variant-based styling.

## External Dependencies

### AI Services
- **OpenAI API**: Primary AI service using GPT-5 for text generation across all tools (study materials, text manipulation, code assistance, creative content, travel planning) and DALL-E 3 for image generation. Requires `OPENAI_API_KEY` environment variable.

### Database
- **Neon Database**: Configured for PostgreSQL serverless database with Drizzle ORM. Requires `DATABASE_URL` environment variable. Currently set up but not actively used; in-memory storage is the active implementation.

### UI Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives (@radix-ui/* packages) for building the component library
- **shadcn/ui**: Design system built on top of Radix UI with Tailwind CSS styling
- **Lucide React**: Icon library for consistent iconography throughout the application

### Development Tools
- **Vite**: Frontend build tool and development server with HMR support
- **Replit Plugins**: Development-specific plugins for runtime error modals, cartographer, and dev banner (only active in development)

### Utility Libraries
- **Zod**: Runtime type validation and schema definition, shared between frontend and backend
- **TanStack Query**: Server state management and data fetching
- **Wouter**: Lightweight client-side routing
- **date-fns**: Date manipulation and formatting
- **clsx & tailwind-merge**: Utility class name management