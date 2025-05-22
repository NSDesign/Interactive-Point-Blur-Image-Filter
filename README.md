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