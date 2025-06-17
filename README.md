# TeraBox Video Viewer

A modern, lightweight web application for viewing TeraBox videos online without downloads or installations.

## Features

- 🎥 **Direct Video Viewing**: Watch TeraBox videos directly in your browser
- 📱 **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern UI**: Beautiful, production-ready interface with smooth animations
- 🔒 **Privacy Focused**: No data collection or user tracking
- ⚡ **Lightweight**: Fast loading and minimal resource usage
- 🔗 **Multiple URL Formats**: Supports various TeraBox URL patterns

## Supported URL Formats

- `https://terabox.com/s/xxxxxxxxx`
- `https://terabox.com/sharing/link?surl=xxxxxxxxx`
- `https://1024terabox.com/s/xxxxxxxxx`
- `https://teraboxapp.com/s/xxxxxxxxx`

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 16+ installed on your system
- npm or yarn package manager

### Installation & Development

1. **Clone or download this project**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open your browser and visit:** `http://localhost:5173`

### Building for Production

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **The static files will be generated in the `dist` folder**

## Deployment to GitHub Pages

### Method 1: Using GitHub Actions (Recommended)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/terabox-video-viewer.git
   git push -u origin main
   ```

2. **Create `.github/workflows/deploy.yml`:**
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v3
         
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
             cache: 'npm'
             
         - name: Install dependencies
           run: npm ci
           
         - name: Build
           run: npm run build
           
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./dist
   ```

3. **Enable GitHub Pages:**
   - Go to your repository settings
   - Navigate to "Pages" section
   - Select "Deploy from a branch"
   - Choose "gh-pages" branch
   - Click "Save"

### Method 2: Manual Deployment

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Push the dist folder to gh-pages branch:**
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

3. **Enable GitHub Pages (same as Method 1, step 3)**

### Method 3: Using GitHub Desktop

1. **Build the project locally:**
   ```bash
   npm run build
   ```

2. **Use GitHub Desktop to:**
   - Create a new repository
   - Upload the `dist` folder contents
   - Commit and push to main branch

3. **Enable GitHub Pages in repository settings**

## Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Site header with branding
│   ├── UrlInput.tsx    # URL input form
│   ├── VideoPlayer.tsx # Video player component
│   ├── ErrorMessage.tsx# Error handling UI
│   ├── LoadingSpinner.tsx # Loading animation
│   └── Footer.tsx      # Site footer
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles

public/
└── video-icon.svg     # Custom favicon
```

## Customization

### Styling
- Edit `tailwind.config.js` for theme customization
- Modify component styles in individual `.tsx` files
- Update global styles in `src/index.css`

### Functionality
- Modify URL patterns in `src/App.tsx` (extractVideoData function)
- Add new embed strategies for better compatibility
- Customize error messages and UI text

### Branding
- Update site title in `index.html`
- Replace favicon in `public/video-icon.svg`
- Modify header branding in `src/components/Header.tsx`

## Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

## Limitations

- TeraBox videos must be publicly shared to work
- Some videos may have embedding restrictions
- CORS policies may prevent direct embedding
- Requires JavaScript enabled

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Support

If you encounter any issues:

1. Check that your TeraBox URL is publicly accessible
2. Try different URL formats
3. Ensure your browser allows iframe embedding
4. Check browser console for detailed error messages

---

**Note**: This tool respects TeraBox's terms of service and only helps view already shared content. It does not store, download, or redistribute any videos.