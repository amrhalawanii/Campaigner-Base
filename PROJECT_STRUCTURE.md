# Project Structure

This document describes the organized structure of the Campaigner project following Next.js and React best practices.

## 📁 Directory Structure

```
Campainger Base/
├── app/                          # Next.js App Router
│   ├── (content)/               # Content browsing routes (route group)
│   │   ├── campaigns/           # Campaign listing & detail pages
│   │   ├── brands/              # Brand listing & detail pages
│   │   ├── agencies/            # Agency listing & detail pages
│   │   ├── case-studies/        # Case study pages
│   │   ├── industry/            # Industry filter pages
│   │   ├── channel/             # Channel filter pages
│   │   └── product/             # Product filter pages
│   ├── (user)/                  # User-specific routes (route group)
│   │   ├── profile/             # User profile page
│   │   ├── my-campaigns/        # User's campaigns
│   │   ├── saved-campaigns/     # Saved campaigns
│   │   ├── trending-campaigns/  # Trending campaigns
│   │   └── you-might-like/      # Recommendations
│   ├── (auth)/                  # Authentication routes (route group)
│   │   ├── sign-in/             # Sign in page
│   │   ├── register/            # Registration page
│   │   └── recover-password/    # Password recovery
│   ├── (settings)/              # Settings/utility routes (route group)
│   │   ├── language/            # Language settings
│   │   └── time/                 # Time filter settings
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                 # Home page
│   └── globals.css              # Global styles
│
├── components/                   # React components
│   ├── layout/                  # Layout components
│   │   ├── navbar.tsx           # Navigation bar
│   │   ├── footer.tsx           # Footer component
│   │   └── theme-provider.tsx   # Theme context provider
│   ├── campaign/                # Campaign-related components
│   │   ├── campaign-card.tsx    # Campaign card component
│   │   ├── campaign-section.tsx # Campaign section/listing
│   │   └── case-study-card.tsx  # Case study card
│   ├── user/                    # User-related components
│   │   └── user-dropdown.tsx    # User menu dropdown
│   ├── search/                  # Search components
│   │   └── search-modal.tsx     # Search modal/dialog
│   ├── shared/                  # Shared/common components
│   │   ├── share-dialog.tsx     # Share dialog component
│   │   └── category-tile.tsx   # Category tile component
│   ├── ui/                      # Design system components (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── ... (50+ UI components)
│   └── index.ts                # Component exports (barrel file)
│
├── lib/                          # Utility libraries
│   ├── contexts/                # React contexts
│   │   └── search-context.tsx  # Search state context
│   ├── data/                    # Data files
│   │   └── campaign-data.ts    # Campaign data & types
│   ├── utils.ts                 # Utility functions
│   └── index.ts                 # Library exports (barrel file)
│
├── hooks/                        # Custom React hooks
│   ├── use-mobile.ts            # Mobile detection hook
│   └── use-toast.ts             # Toast notification hook
│
├── public/                       # Static assets
│   ├── logo.png
│   ├── *.jpg                    # Campaign images
│   └── *.png                    # Icons & images
│
└── styles/                       # Additional styles
    └── globals.css
```

## 🎯 Organization Principles

### 1. **Feature-Based Component Organization**
Components are organized by feature/domain rather than by type:
- `components/campaign/` - All campaign-related components
- `components/user/` - All user-related components
- `components/layout/` - Layout components used across the app

### 2. **Route Groups for App Organization**
Next.js route groups `(group-name)` organize routes without affecting URLs:
- `(content)/` - All content browsing routes
- `(user)/` - User-specific routes
- `(auth)/` - Authentication routes
- `(settings)/` - Settings/utility routes

**Note:** Route groups don't appear in URLs. `/campaigns` works the same whether it's in `app/campaigns/` or `app/(content)/campaigns/`.

### 3. **Separation of Concerns**
- **Components**: UI components only
- **Lib**: Business logic, contexts, data, utilities
- **Hooks**: Reusable React hooks
- **App**: Routing and page components

### 4. **Barrel Exports**
Index files (`index.ts`) provide clean imports:
```typescript
// Instead of:
import { Navbar } from "@/components/layout/navbar"
import { CampaignCard } from "@/components/campaign/campaign-card"

// You can use:
import { Navbar, CampaignCard } from "@/components"
```

## 📝 Import Paths

### Components
```typescript
// Layout components
import { Navbar, Footer } from "@/components/layout/navbar"
import { Navbar, Footer } from "@/components" // via barrel export

// Campaign components
import { CampaignCard } from "@/components/campaign/campaign-card"
import { CampaignCard } from "@/components" // via barrel export

// UI components (shadcn/ui)
import { Button } from "@/components/ui/button"
```

### Libraries
```typescript
// Contexts
import { useSearch } from "@/lib/contexts/search-context"
import { useSearch } from "@/lib" // via barrel export

// Data
import { campaigns } from "@/lib/data/campaign-data"
import { campaigns } from "@/lib" // via barrel export

// Utils
import { cn } from "@/lib/utils"
import { cn } from "@/lib" // via barrel export
```

### Hooks
```typescript
import { useIsMobile } from "@/hooks/use-mobile"
import { useToast } from "@/hooks/use-toast"
```

## 🔄 Dynamic Routes

Next.js uses `[id]` folders for dynamic routes:
- `app/(content)/campaigns/[id]/page.tsx` → `/campaigns/1`, `/campaigns/2`, etc.
- `app/(content)/brands/[id]/page.tsx` → `/brands/nike`, `/brands/adidas`, etc.

This is the **standard Next.js pattern** and is not unorganized.

## 🚀 Benefits of This Structure

1. **Scalability**: Easy to add new features without cluttering
2. **Discoverability**: Developers can quickly find related files
3. **Maintainability**: Clear separation of concerns
4. **Consistency**: Follows Next.js and React best practices
5. **Team Collaboration**: Multiple developers can work on different features without conflicts

## 📚 Additional Resources

- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Next.js Route Groups](https://nextjs.org/docs/app/building-your-application/routing/route-groups)
- [React Component Organization](https://react.dev/learn/thinking-in-react)

