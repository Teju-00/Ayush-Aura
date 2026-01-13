# 🌿 AYUSH Herbal Plants - Website

A comprehensive website showcasing 100+ medicinal plants with 3D models, featuring a **mobile app download button** that directs users to app stores.

## 🚀 Features

### 🌐 Website
- **Responsive Design** - Works on all devices
- **3D Plant Models** - Interactive 3D viewing with Three.js
- **Offline Support** - Service worker caching
- **Performance Optimized** - Lazy loading, code splitting
- **Mobile App Download** - Direct links to Google Play & App Store

## 🛠️ Tech Stack

- **Frontend**: React 18, React Router DOM
- **Styling**: Styled Components
- **3D Graphics**: Three.js, React Three Fiber
- **Animations**: Framer Motion
- **PWA**: Service Worker, Manifest (offline support)

## 📱 Mobile App Download

The website includes a **"Download Mobile App"** button that:
- **Detects user's platform** (Android/iOS/Desktop)
- **Redirects to appropriate app store** (Google Play/App Store)
- **Provides fallback instructions** for desktop users

## 🚀 How to Use

### 🌐 Website
1. **Run the website**:
   ```bash
   npm start
   ```
2. **Access at**: `http://localhost:3000`
3. **Download mobile app**: Click "Download Mobile App" button

## 🔧 Development

### Project Structure
```
AYUSH AURA/
├── src/
│   ├── components/          # React components
│   ├── pages/              # Website pages
│   ├── utils/              # Utilities
│   └── data/               # Plant database
├── public/                 # Static assets
├── App.js                  # Main app component
└── package.json           # Dependencies
```

### Key Components
- **`App.js`** - Main application with routing
- **`Home.js`** - Landing page with download button
- **`Navbar.js`** - Navigation component
- **`PlantList.js`** - Plant browsing page
- **`PlantDetail.js`** - Individual plant details

## 🌐 Website Features

### Performance
- **Code Splitting** - Route-based lazy loading
- **Image Optimization** - Lazy loading, placeholders
- **3D Model Preloading** - Faster model loading

### Offline Support
- **Service Worker** - Caches essential assets
- **Offline Page** - Graceful fallback when offline

## 🚀 Deployment

### Website
1. **Build**: `npm run build`
2. **Deploy**: Upload `build/` folder to hosting
3. **HTTPS**: Required for service worker functionality

## 📋 Requirements

- **Node.js** 16+
- **Modern Browser** (Chrome, Firefox, Safari, Edge)
- **HTTPS** (for service worker features)

## 🔄 Data Source

- **Plant Database**: `src/data/plants.js`
- **3D Models**: Supabase storage
- **Images**: Optimized image URLs
- **Offline Cache**: Service worker caching

## 🎯 Current Status

- ✅ **Website functionality** complete
- ✅ **Mobile app download button** implemented
- ✅ **Offline support** via service worker
- ✅ **Performance optimization** with lazy loading
- ✅ **Mobile responsive** design

## 🚀 Next Steps

### Immediate
- [x] Website functionality
- [x] Mobile app download button
- [x] Offline support
- [x] Performance optimization

### Future
- [ ] Create separate mobile app project
- [ ] Update app store links with real app IDs
- [ ] Add analytics tracking
- [ ] Implement user accounts

## 🤝 Contributing

1. **Fork** the repository
2. **Create** feature branch
3. **Make** changes
4. **Test** functionality
5. **Submit** pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

- **Website Issues**: Check browser console
- **General Help**: Open GitHub issue

---

**🌿 AYUSH Herbal Plants** - Bringing traditional medicine to the digital age! 🌐✨
