#!/bin/bash

# Radial Gradient Image Filter - Project Setup Script
# This script creates a complete React project structure

echo "🎨 Setting up Radial Gradient Image Filter project..."

# Create project directory
PROJECT_NAME="radial-gradient-filter"
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

# Create directory structure
mkdir -p public src/components

echo "📁 Creating project structure..."

# Create package.json
cat > package.json << 'EOF'
{
  "name": "radial-gradient-image-filter",
  "version": "1.0.0",
  "description": "A React component for applying selective blur effects using radial gradients",
  "main": "src/index.js",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "lucide-react": "^0.263.1"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "keywords": [
    "react",
    "image-filter",
    "blur",
    "gradient",
    "canvas",
    "image-processing"
  ],
  "author": "Your Name",
  "license": "MIT"
}
EOF

# Create public/index.html
cat > public/index.html << 'EOF'
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <meta
      name="description"
      content="Radial Gradient Image Filter - Create selective blur effects using radial gradients"
    />
    <title>Radial Gradient Image Filter</title>
    <script src="https://cdn.tailwindcss.com"></script>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
  </body>
</html>
EOF

# Create src/index.js
cat > src/index.js << 'EOF'
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
EOF

# Create src/App.js
cat > src/App.js << 'EOF'
import React from 'react';
import RadialGradientImageFilter from './components/RadialGradientImageFilter';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <RadialGradientImageFilter />
      </div>
    </div>
  );
}

export default App;
EOF

# Create src/index.css
cat > src/index.css << 'EOF'
body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

/* Custom styles for better mobile experience */
@media (max-width: 640px) {
  .container {
    padding-left: 1rem;
    padding-right: 1rem;
  }
}

/* Ensure canvas responsiveness */
canvas {
  max-width: 100%;
  height: auto;
}

/* Custom slider styles for better visibility */
input[type="range"] {
  appearance: none;
  height: 6px;
  border-radius: 3px;
  background: #e5e7eb;
  outline: none;
}

input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

input[type="range"]::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: 2px solid white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
EOF

# Create .gitignore
cat > .gitignore << 'EOF'
# Dependencies
/node_modules
/.pnp
.pnp.js

# Testing
/coverage

# Production
/build

# Misc
.DS_Store
.env.local
.env.development.local
.env.test.local
.env.production.local

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Editor directories and files
.vscode/
.idea/
*.swp
*.swo
*~

# OS generated files
Thumbs.db
ehthumbs.db
EOF

echo "📝 Creating README.md..."

# Create README.md with comprehensive documentation
cat > README.md << 'EOF'
# Radial Gradient Image Filter

A React component that creates selective blur effects on images using radial gradients. This tool allows you to add multiple blur points to an image, each with customizable intensity and softness, creating professional-looking depth-of-field and focus effects.

## 🎯 Features

- **Interactive Blur Points**: Click to add blur points, drag to move them, shift+click to remove
- **Individual Point Control**: Each blur point has its own intensity and softness settings
- **Gradient Visualization**: Toggle gradient map overlay to see exactly where blur will be applied
- **Flexible Display Options**: View gradient only, adjust opacity, or invert the gradient effect
- **Real-time Preview**: See changes instantly as you adjust settings
- **Image Upload**: Support for common image formats with drag-and-drop functionality

## 🚀 Quick Start

1. **Clone and setup**:
```bash
git clone <your-repo-url>
cd radial-gradient-image-filter
npm install
npm start
```

2. **Open [http://localhost:3000](http://localhost:3000)** to view it in the browser.

## 📖 Usage Guide

### Basic Operation

1. **Load an Image**: Click "Upload Image" to select your image file, or use the default placeholder
2. **Add Blur Points**: Click anywhere on the image to add a new blur point
3. **Select Points**: Click on existing points (blue circles) to select them (turns yellow when selected)
4. **Move Points**: Drag blur points to reposition them
5. **Remove Points**: Shift+click on a point to remove it, or use the "Remove" button

### Controls Overview

#### 🎛️ Display Options
- **Show Gradient**: Toggle visualization of the gradient map overlay
- **Edit Mode/View Mode**: Switch between editing points and viewing the final result
- **Invert Gradient**: Reverse the gradient effect (only visible when gradient is shown)
- **Gradient Only**: Show only the gradient map without the underlying image
- **Gradient Opacity**: Control how strongly the gradient overlay appears (10-100%)

#### 🔧 Blur Settings
- **Global Blur Max**: Sets the maximum blur intensity that can be applied (1-30px)
- **Point Blur Intensity**: Individual blur amount for the selected point (0 to Global Max)
- **Gradient Softness**: Controls how gradual the blur transition is (10-200%)

#### 📍 Point Management
- **Add Point**: Creates a new blur point in the center of the image
- **Remove**: Removes the selected point (or last point if none selected)
- **Random**: Generates random points with varying intensities and positions

### 🎮 Keyboard Shortcuts

- **Click**: Add new blur point or select existing point
- **Drag**: Move selected blur point
- **Shift + Click**: Remove blur point

## 🛠️ Technical Details

### How It Works

The component uses HTML5 Canvas to:

1. **Generate Gradient Maps**: Creates radial gradients for each blur point
2. **Apply Selective Blur**: Blends original and blurred versions based on gradient intensity
3. **Real-time Processing**: Updates the effect as you modify points and settings

### Browser Compatibility

- ✅ **Desktop**: Works well on all modern browsers (Chrome, Firefox, Safari, Edge)
- ⚠️ **Mobile**: Basic functionality works, but some advanced Canvas features may have limitations on iOS Safari

### Performance Considerations

- Large images may take longer to process
- Multiple blur points increase processing time
- Consider resizing very large images for better performance

## 📁 Project Structure

```
src/
├── components/
│   └── RadialGradientImageFilter.js  # Main component
├── App.js                           # App wrapper
├── index.js                         # React entry point
└── index.css                        # Styles
```

## 🎨 Customization

### Modifying Default Settings

Edit the component's initial state in `RadialGradientImageFilter.js`:

```javascript
const [blurIntensity, setBlurIntensity] = useState(10); // Default max blur
const [gradientOpacity, setGradientOpacity] = useState(0.7); // Default opacity
```

### Adding New Features

The component is designed to be extensible. Consider these areas for enhancement:

- Export functionality (save processed images)
- Preset blur patterns
- Animation support
- Additional blend modes
- Undo/redo functionality

## 🐛 Troubleshooting

### Common Issues

1. **Blur not visible**: 
   - Ensure blur intensity is set above 0
   - Check that blur points are properly positioned
   - Verify gradient map is generating correctly

2. **Performance issues**:
   - Try reducing image size
   - Limit number of blur points
   - Lower the maximum blur intensity

3. **Mobile compatibility**:
   - Some Canvas filter effects may not work on older mobile browsers
   - Consider providing fallback functionality

### Browser Console

Check the browser console for error messages. The component includes error handling and will log issues with:
- Image loading
- Canvas operations
- Filter application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Built with React and HTML5 Canvas
- Icons provided by Lucide React
- Inspired by professional photo editing tools like Photoshop's blur effects

---

Made with ❤️ for creative image processing
EOF

echo "⚠️  Note: You'll need to manually add the RadialGradientImageFilter.js component file to src/components/"
echo "The component code is available in the artifact above."
echo ""
echo "✅ Project structure created successfully!"
echo ""
echo "📋 Next steps:"
echo "1. Add RadialGradientImageFilter.js to src/components/"
echo "2. Run 'npm install' to install dependencies"
echo "3. Run 'npm start' to start the development server"
echo "4. Open http://localhost:3000 in your browser"

echo ""
echo "📦 Project created in: $(pwd)"