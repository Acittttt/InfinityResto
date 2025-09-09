# Infinity Resto - Customer Ordering System

🍽️ **Phase 1: Customer Ordering Flow Prototype**

A modern, responsive web application for restaurant self-ordering via QR code table access.

## 🚀 Live Demo

**Production:** https://infinity-resto.vercel.app/meja/1

## 📱 Features

### ✅ Implemented (Phase 1)
- **QR Code Table Access** - URL pattern `/meja/{tableNumber}`
- **Menu Browsing** - Categories: Makanan & Minuman
- **Item Customization** - Mandatory variants selection
  - Food: Pedas / Tidak Pedas
  - Beverages: Dingin / Panas
- **Shopping Cart** - Add, modify quantities, remove items
- **Order Submission** - Validation & confirmation screen
- **Responsive Design** - Mobile-first approach

### 🎯 User Flow
1. Customer scans QR code → `/meja/{tableNumber}`
2. Browse menu by category (Makanan/Minuman)
3. Select items → Customize variants & quantity
4. Add to cart → Review order
5. Submit order → Confirmation screen

## 🛠️ Tech Stack

- **Frontend:** React 19 + TypeScript
- **Build Tool:** Vite
- **Routing:** React Router v7
- **State Management:** React Context API
- **Styling:** Custom CSS with mobile-first design
- **Icons:** Lucide React
- **Deployment:** Vercel

## 🏗️ Project Structure

```
src/
├── components/
│   ├── Layout.tsx              # Header, navigation, footer
│   ├── MenuDisplay.tsx         # Menu categories & items
│   ├── ItemCustomizationModal.tsx # Variant selection
│   └── CartDisplay.tsx         # Cart items management
├── pages/
│   ├── TableOrder.tsx          # Main menu page
│   ├── Cart.tsx               # Cart review page
│   └── OrderConfirmation.tsx   # Success page
├── context/
│   └── CartContext.tsx         # Cart state management
├── data/
│   └── menuData.ts            # Hardcoded menu items
└── index.css                  # Global styles
```

## 🚀 Development

### Prerequisites
- Node.js 18+
- npm or yarn

### Setup
```bash
# Clone repository
git clone <repository-url>
cd InfinityResto

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts
```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 📦 Deployment

### Vercel (Recommended)
1. **Connect GitHub repository** to Vercel
2. **Configure build settings:**
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. **Deploy** - automatic on push to main branch

### Important: SPA Routing Fix
The `vercel.json` file handles client-side routing:
```json
{
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

## 🎨 Design System

- **Colors:** Purple/blue gradient theme
- **Typography:** System fonts with responsive sizing
- **Layout:** Mobile-first responsive grid
- **Interactions:** Smooth transitions and hover effects

## 📊 Menu Data

Currently hardcoded in `src/data/menuData.ts`:
- **6 Food items** (Makanan) - Pedas/Tidak Pedas variants
- **6 Beverage items** (Minuman) - Dingin/Panas variants
- **Price formatting** in Indonesian Rupiah

## 🔄 State Management

**Cart Context** manages:
- Add items with variants
- Update quantities
- Remove items
- Calculate totals
- Persist during session

## 🎯 Phase 2 Planning

### Potential Features
- **Backend Integration** - Database & API
- **Kitchen Display System** (KDS)
- **Admin Panel** - Menu management
- **Payment Integration**
- **Order Tracking**
- **Real-time Updates**

## 🐛 Known Issues

- ✅ **Fixed:** TypeScript build errors on deployment
- ✅ **Fixed:** 404 errors on page refresh (SPA routing)

## 📞 Support

For issues or questions about the Infinity Resto application, please refer to the project documentation or contact the development team.

---

**Built with ❤️ for modern restaurant operations**