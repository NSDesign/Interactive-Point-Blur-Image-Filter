import React, { useState, useRef, useEffect } from 'react';
import { Move, Eye, EyeOff, Plus, Minus, RefreshCw } from 'lucide-react';

const RadialGradientImageFilter = () => {
  // State for image and configuration
  const [image, setImage] = useState(null);
  const [originalImage, setOriginalImage] = useState(null);
  const [blurPoints, setBlurPoints] = useState([]);
  const [showGradientMap, setShowGradientMap] = useState(false);
  const [blurIntensity, setBlurIntensity] = useState(10); // Global maximum blur amount
  const [invertGradient, setInvertGradient] = useState(false);
  const [editMode, setEditMode] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPointIndex, setDragPointIndex] = useState(null);
  const [selectedPointIndex, setSelectedPointIndex] = useState(null);
  const [forceRender, setForceRender] = useState(0); // Used to force re-render when needed
  
  // State for gradient visualization
  const [showOnlyGradient, setShowOnlyGradient] = useState(false);
  const [gradientOpacity, setGradientOpacity] = useState(0.7);
  
  // Refs for canvas elements
  const containerRef = useRef(null);
  const outputCanvasRef = useRef(null);
  const gradientCanvasRef = useRef(null);
  
  // Load placeholder image on component mount
  useEffect(() => {
    loadPlaceholderImage();
  }, []);
  
  // Load a placeholder image
  const loadPlaceholderImage = () => {
    const placeholderImage = new Image();
    placeholderImage.crossOrigin = "Anonymous";
    placeholderImage.src = "/api/placeholder/800/500";
    placeholderImage.onload = () => {
      console.log("Placeholder loaded:", placeholderImage.width, "x", placeholderImage.height);
      setImage(placeholderImage);
      setOriginalImage(placeholderImage);
      
      // Initialize with 3 random points
      const initialPoints = [];
      for (let i = 0; i < 3; i++) {
        initialPoints.push({
          x: Math.random() * placeholderImage.width,
          y: Math.random() * placeholderImage.height,
          intensity: 8, // Individual blur intensity for each point
          softness: 100
        });
      }
      setBlurPoints(newPoints);
    setSelectedPointIndex(null);
  };
  
  // Update the selected point's blur intensity
  const updateSelectedPointIntensity = (value) => {
    if (selectedPointIndex === null || selectedPointIndex >= blurPoints.length) return;
    
    setBlurPoints(prevPoints => {
      const newPoints = [...prevPoints];
      newPoints[selectedPointIndex] = { 
        ...newPoints[selectedPointIndex], 
        intensity: value
      };
      return newPoints;
    });
    
    // Force re-render to update effect
    setForceRender(prev => prev + 1);
  };
  
  // Update the selected point's softness
  const updateSelectedPointSoftness = (value) => {
    if (selectedPointIndex === null || selectedPointIndex >= blurPoints.length) return;
    
    setBlurPoints(prevPoints => {
      const newPoints = [...prevPoints];
      newPoints[selectedPointIndex] = { 
        ...newPoints[selectedPointIndex], 
        softness: value
      };
      return newPoints;
    });
    
    // Force re-render to update effect
    setForceRender(prev => prev + 1);
  };

  return (
    <div className="w-full flex flex-col gap-6 p-4 bg-gray-50 rounded-lg">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-bold text-gray-800">Radial Gradient Image Filter</h2>
        <p className="text-gray-600">Create selective blur effects using radial gradients</p>
      </div>
      
      {/* Control Panel */}
      <div className="flex flex-col gap-4 bg-white p-4 rounded-md shadow-sm">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Left column */}
          <div className="flex flex-col gap-3 w-full sm:w-1/3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Image</label>
              <div className="flex gap-2">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                  id="image-upload"
                />
                <label
                  htmlFor="image-upload"
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 cursor-pointer flex-grow text-center"
                >
                  Upload Image
                </label>
                <button
                  onClick={handleReset}
                  className="px-3 py-1 bg-gray-200 text-gray-700 text-sm rounded hover:bg-gray-300"
                >
                  Reset
                </button>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Display Options</label>
              <div className="flex">
                <button
                  onClick={() => setShowGradientMap(!showGradientMap)}
                  className={`px-3 py-1 text-sm rounded-l flex items-center justify-center gap-1 flex-grow ${
                    showGradientMap 
                      ? 'bg-blue-600 text-white hover:bg-blue-700' 
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {showGradientMap ? <Eye size={14} /> : <EyeOff size={14} />}
                  {showGradientMap ? "Showing Gradient" : "Show Gradient"}
                </button>
                <button
                  onClick={() => setEditMode(!editMode)}
                  className={`px-3 py-1 text-sm rounded-r flex items-center justify-center gap-1 flex-grow ${
                    editMode
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {editMode ? <Move size={14} /> : <Eye size={14} />}
                  {editMode ? "Edit Mode" : "View Mode"}
                </button>
              </div>
            </div>
            
            {showGradientMap && (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="invert-gradient"
                    checked={invertGradient}
                    onChange={() => setInvertGradient(!invertGradient)}
                    className="h-4 w-4"
                  />
                  <label htmlFor="invert-gradient" className="text-sm font-medium text-gray-700">
                    Invert Gradient
                  </label>
                </div>
              </div>
            )}
          </div>
          
          {/* Middle column */}
          <div className="flex flex-col gap-3 w-full sm:w-1/3">
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-700">Blur Points: {blurPoints.length}</label>
              <div className="flex gap-2">
                <button
                  onClick={addBlurPoint}
                  className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 flex items-center justify-center gap-1 flex-grow"
                  disabled={!editMode}
                >
                  <Plus size={14} /> Add Point
                </button>
                <button
                  onClick={removeBlurPoint}
                  className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700 flex items-center justify-center gap-1 flex-grow"
                  disabled={!editMode || blurPoints.length === 0}
                >
                  <Minus size={14} /> Remove
                </button>
                <button
                  onClick={randomizePoints}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 flex items-center justify-center gap-1 flex-grow"
                  disabled={!editMode}
                >
                  <RefreshCw size={14} /> Random
                </button>
              </div>
            </div>
            
            <div className="mt-2 text-xs text-gray-500">
              <p>Click to add/select, Shift+click to remove, drag to move points</p>
            </div>
          </div>
          
          {/* Right column - Point properties */}
          <div className="flex flex-col gap-3 w-full sm:w-1/3">
            {showGradientMap && (
              <div className="flex flex-col gap-2 mb-3">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-medium text-gray-700">Gradient Display</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="show-only-gradient"
                      checked={showOnlyGradient}
                      onChange={() => setShowOnlyGradient(!showOnlyGradient)}
                      className="h-4 w-4"
                    />
                    <label htmlFor="show-only-gradient" className="text-xs text-gray-600">
                      Gradient Only
                    </label>
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-600">
                    Gradient Opacity: {Math.round(gradientOpacity * 100)}%
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="1"
                    step="0.05"
                    value={gradientOpacity}
                    onChange={(e) => setGradientOpacity(parseFloat(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            )}
            
            <label className="text-sm font-medium text-gray-700">
              {selectedPointIndex !== null ? 
                `Point #${selectedPointIndex + 1} Properties` : 
                'Select a point to edit properties'}
            </label>
            
            <div className={`flex flex-col gap-2 p-2 rounded ${selectedPointIndex !== null ? 'bg-gray-100' : 'bg-gray-50'}`}>
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600">
                  Blur Intensity: {selectedPointIndex !== null && blurPoints[selectedPointIndex] 
                    ? blurPoints[selectedPointIndex].intensity 
                    : '0'}px
                </label>
                <input
                  type="range"
                  min="0"
                  max={blurIntensity}
                  step="1"
                  disabled={selectedPointIndex === null}
                  value={selectedPointIndex !== null && blurPoints[selectedPointIndex] 
                    ? blurPoints[selectedPointIndex].intensity 
                    : 0}
                  onChange={(e) => updateSelectedPointIntensity(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-xs text-gray-500 mt-1">
                  Individual blur amount (max: {blurIntensity}px)
                </div>
              </div>
              
              <div className="flex flex-col gap-1">
                <label className="text-xs text-gray-600">
                  Gradient Softness: {selectedPointIndex !== null && blurPoints[selectedPointIndex] 
                    ? blurPoints[selectedPointIndex].softness 
                    : '100'}%
                </label>
                <input
                  type="range"
                  min="10"
                  max="200"
                  disabled={selectedPointIndex === null}
                  value={selectedPointIndex !== null && blurPoints[selectedPointIndex] 
                    ? blurPoints[selectedPointIndex].softness 
                    : 100}
                  onChange={(e) => updateSelectedPointSoftness(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Global Blur Intensity Slider */}
      <div className="flex flex-col gap-1 bg-white p-3 rounded-md shadow-sm">
        <label className="text-sm font-medium text-gray-700">Global Blur Max ({blurIntensity}px)</label>
        <input
          type="range"
          min="1"
          max="30"
          value={blurIntensity}
          onChange={(e) => setBlurIntensity(parseInt(e.target.value))}
          className="w-full"
        />
        <p className="text-xs text-gray-500">Maximum blur amount applied to the image</p>
      </div>
      
      {/* Canvas Display */}
      <div 
        ref={containerRef}
        className="relative w-full h-full bg-gray-100 rounded-md overflow-hidden"
        style={{ cursor: editMode ? (isDragging ? 'grabbing' : 'crosshair') : 'default' }}
      >
        {image ? (
          <div 
            className="relative"
            style={{ 
              width: '100%',
              paddingBottom: `${(image.height / image.width) * 100}%`
            }}
          >
            {/* Gradient canvas (hidden) */}
            <canvas
              ref={gradientCanvasRef}
              className="hidden"
              width={image ? image.width : 0}
              height={image ? image.height : 0}
            />
            
            {/* Output canvas (visible) */}
            <canvas
              ref={outputCanvasRef}
              className="absolute top-0 left-0 w-full h-full"
              width={image ? image.width : 0}
              height={image ? image.height : 0}
              onClick={handleCanvasClick}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
            />
            
            {/* Point markers overlay */}
            {editMode && (
              <div 
                className="absolute top-0 left-0 w-full h-full pointer-events-none"
              >
                {blurPoints.map((point, index) => (
                  <div
                    key={index}
                    className={`absolute w-4 h-4 rounded-full border-2 transform -translate-x-1/2 -translate-y-1/2 ${
                      index === selectedPointIndex 
                        ? 'bg-yellow-500 border-white' 
                        : 'bg-blue-500 border-white'
                    }`}
                    style={{
                      left: `${(point.x / image.width) * 100}%`,
                      top: `${(point.y / image.height) * 100}%`,
                      zIndex: 10
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-64 flex items-center justify-center">
            <p className="text-gray-500">Loading image...</p>
          </div>
        )}
      </div>
      
      <div className="text-sm text-gray-600">
        <p>
          This filter creates a blur effect controlled by radial gradients. Each point creates a gradient that controls
          how much blur is applied to different areas of the image.
        </p>
        <ul className="list-disc pl-5 mt-2">
          <li>In <strong>Edit Mode</strong>, you can add, select, move, and delete points</li>
          <li>Select a point to edit its individual blur intensity and softness</li>
          <li>The <strong>Global Blur Max</strong> sets the maximum blur applied to any area</li>
          <li>Use the <strong>Show Gradient</strong> button to visualize the blur control map</li>
          <li>Switch to <strong>View Mode</strong> to see the final image without point markers</li>
        </ul>
      </div>
    </div>
  );
};

export default RadialGradientImageFilter;initialPoints);
      
      // Force initial render
      setTimeout(() => setForceRender(prev => prev + 1), 100);
    };
  };

  // Apply filter when parameters change
  useEffect(() => {
    if (!image) return;
    
    console.log("Applying filter, points:", blurPoints.length, "intensity:", blurIntensity);
    renderGradientMap();
    applyBlurFilter();
  }, [image, blurPoints, blurIntensity, invertGradient, showGradientMap, showOnlyGradient, gradientOpacity, forceRender]);
  
  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.onload = () => {
          setImage(img);
          setOriginalImage(img);
          
          // Generate new random points when a new image is loaded
          const initialPoints = [];
          for (let i = 0; i < 3; i++) {
            initialPoints.push({
              x: Math.random() * img.width,
              y: Math.random() * img.height,
              intensity: 8, // Individual blur intensity for each point
              softness: 100
            });
          }
          setBlurPoints(initialPoints);
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    }
  };
  
  // Reset to placeholder image
  const handleReset = () => {
    loadPlaceholderImage();
  };
  
  // Render the gradient map based on blur points
  const renderGradientMap = () => {
    if (!image || !gradientCanvasRef.current) return;
    
    const canvas = gradientCanvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions to match the image
    canvas.width = image.width;
    canvas.height = image.height;
    
    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // If no blur points, fill with black or white based on invert setting
    if (blurPoints.length === 0) {
      ctx.fillStyle = invertGradient ? '#fff' : '#000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      return;
    }
    
    // Reset composite operation
    ctx.globalCompositeOperation = 'source-over';
    
    // Fill with base color first (black if not inverted, white if inverted)
    ctx.fillStyle = invertGradient ? '#fff' : '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set composite operation for adding gradients
    // If inverted, we're removing from white background; if not inverted, we're adding to black background
    ctx.globalCompositeOperation = invertGradient ? 'destination-out' : 'lighten';
    
    // Draw each radial gradient
    blurPoints.forEach(point => {
      // Ensure point coordinates are valid numbers
      const safeX = isFinite(point.x) ? point.x : 0;
      const safeY = isFinite(point.y) ? point.y : 0;
      
      // Calculate max radius (distance to farthest corner)
      const distToTopLeft = Math.sqrt(Math.pow(safeX, 2) + Math.pow(safeY, 2));
      const distToTopRight = Math.sqrt(Math.pow(canvas.width - safeX, 2) + Math.pow(safeY, 2));
      const distToBottomLeft = Math.sqrt(Math.pow(safeX, 2) + Math.pow(canvas.height - safeY, 2));
      const distToBottomRight = Math.sqrt(Math.pow(canvas.width - safeX, 2) + Math.pow(canvas.height - safeY, 2));
      
      // Get max radius and ensure it's a finite value
      let maxRadius = Math.max(distToTopLeft, distToTopRight, distToBottomLeft, distToBottomRight);
      
      // Safety check to ensure radius is finite and positive
      if (!isFinite(maxRadius) || maxRadius <= 0) maxRadius = Math.max(canvas.width, canvas.height);
      
      // Use point-specific softness
      const pointSoftness = point.softness || 100;
      
      // Apply softness and ensure final radius is valid
      const gradientRadius = Math.min(maxRadius * pointSoftness / 100, 10000);
      
      // Create radial gradient
      const gradient = ctx.createRadialGradient(
        safeX, safeY, 0,
        safeX, safeY, gradientRadius
      );
      
      // Adjust gradient based on point intensity relative to the max
      const pointIntensity = point.intensity || 5;
      const maxIntensity = blurIntensity || 10;
      const effectiveStrength = Math.min(pointIntensity / maxIntensity, 1.0);
      
      // Gradient stops
      if (invertGradient) {
        gradient.addColorStop(0, `rgba(255, 255, 255, ${effectiveStrength})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      } else {
        gradient.addColorStop(0, `rgba(255, 255, 255, ${effectiveStrength})`);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      }
      
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    });
  };
  
  // Apply blur filter using the gradient map
  const applyBlurFilter = () => {
    if (!image || !outputCanvasRef.current || !gradientCanvasRef.current) return;
    
    const outputCanvas = outputCanvasRef.current;
    const ctx = outputCanvas.getContext('2d');
    
    // Set canvas dimensions to match the image
    outputCanvas.width = image.width;
    outputCanvas.height = image.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, outputCanvas.width, outputCanvas.height);
    
    // If showing only gradient map, don't draw the image
    if (!showOnlyGradient) {
      // Draw the original image first
      ctx.drawImage(image, 0, 0);
    }
    
    // If showing gradient map, overlay it with transparency
    if (showGradientMap) {
      // Draw the gradient map with configured opacity
      ctx.globalAlpha = gradientOpacity;
      ctx.drawImage(gradientCanvasRef.current, 0, 0);
      ctx.globalAlpha = 1.0;
      return;
    }
    
    // Check if we should apply blur
    if (blurIntensity > 0 && blurPoints.length > 0) {
      try {
        // Create canvas for the original image
        const origCanvas = document.createElement('canvas');
        origCanvas.width = image.width;
        origCanvas.height = image.height;
        const origCtx = origCanvas.getContext('2d');
        origCtx.drawImage(image, 0, 0);
        
        // Create canvas for fully blurred version
        const blurCanvas = document.createElement('canvas');
        blurCanvas.width = image.width;
        blurCanvas.height = image.height;
        const blurCtx = blurCanvas.getContext('2d');
        
        // Apply maximum blur filter
        blurCtx.filter = `blur(${blurIntensity}px)`;
        blurCtx.drawImage(image, 0, 0);
        
        // Get gradient map data
        const gradientCtx = gradientCanvasRef.current.getContext('2d');
        const gradientData = gradientCtx.getImageData(0, 0, image.width, image.height);
        
        // Get original image data
        const origData = origCtx.getImageData(0, 0, image.width, image.height);
        
        // Get blurred image data
        const blurData = blurCtx.getImageData(0, 0, image.width, image.height);
        
        // Create result data
        const resultData = ctx.createImageData(image.width, image.height);
        
        // Blend original and blurred images based on gradient map
        for (let i = 0; i < resultData.data.length; i += 4) {
          // Get pixel's blur amount from gradient (0-255)
          // Use red channel for the gradient value
          let blendFactor = gradientData.data[i] / 255;
          
          // Handle inversion if needed
          if (invertGradient) {
            blendFactor = 1 - blendFactor;
          }
          
          // Clamp to valid range
          blendFactor = Math.max(0, Math.min(1, blendFactor));
          
          // Blend RGB channels between original and blurred versions
          for (let j = 0; j < 3; j++) {
            resultData.data[i + j] = Math.round(
              origData.data[i + j] * (1 - blendFactor) + 
              blurData.data[i + j] * blendFactor
            );
          }
          
          // Copy alpha channel directly
          resultData.data[i + 3] = origData.data[i + 3];
        }
        
        // Draw the result to the output canvas
        ctx.putImageData(resultData, 0, 0);
        
      } catch (error) {
        console.error("Error applying blur:", error);
        // Fall back to just showing the original
        ctx.drawImage(image, 0, 0);
      }
    }
  };
  
  // Get real canvas coordinates from mouse event
  const getCanvasCoordinates = (e) => {
    if (!containerRef.current || !image) return { x: 0, y: 0 };
    
    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = image.width / rect.width;
    const scaleY = image.height / rect.height;
    
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  };
  
  // Find the index of a point at given coordinates
  const findPointAt = (x, y) => {
    if (!image) return -1;
    
    // Calculate scale for hit testing
    const rect = containerRef.current.getBoundingClientRect();
    const scaleX = rect.width / image.width;
    
    // Threshold for hit testing (scaled based on display size)
    const hitRadius = 20 / scaleX;
    
    return blurPoints.findIndex(point => {
      const distance = Math.sqrt(Math.pow(point.x - x, 2) + Math.pow(point.y - y, 2));
      return distance < hitRadius;
    });
  };
  
  // Handle mouse clicks on the canvas
  const handleCanvasClick = (e) => {
    if (!editMode || !image) return;
    
    const { x, y } = getCanvasCoordinates(e);
    
    // Check if shift key is pressed to remove a point
    if (e.shiftKey) {
      const pointIndex = findPointAt(x, y);
      
      if (pointIndex !== -1) {
        // Remove the point
        setBlurPoints(prevPoints => prevPoints.filter((_, i) => i !== pointIndex));
        if (selectedPointIndex === pointIndex) {
          setSelectedPointIndex(null);
        }
      }
    } else if (!isDragging) {
      // Check if clicking on an existing point to select it
      const pointIndex = findPointAt(x, y);
      
      if (pointIndex !== -1) {
        // Select the point
        setSelectedPointIndex(pointIndex);
      } else {
        // Add a new point
        const newPoint = { 
          x, 
          y, 
          intensity: Math.round(blurIntensity * 0.8), // Default to 80% of max blur
          softness: 100
        };
        
        setBlurPoints(prevPoints => {
          const newPoints = [...prevPoints, newPoint];
          // Set timeout to select the new point after state update completes
          setTimeout(() => setSelectedPointIndex(newPoints.length - 1), 0);
          return newPoints;
        });
      }
    }
  };
  
  // Handle mouse down for dragging
  const handleMouseDown = (e) => {
    if (!editMode || !image) return;
    
    const { x, y } = getCanvasCoordinates(e);
    
    // Find if we're clicking on a point
    const pointIndex = findPointAt(x, y);
    
    if (pointIndex !== -1) {
      e.preventDefault(); // Prevent text selection during drag
      setIsDragging(true);
      setDragPointIndex(pointIndex);
      setSelectedPointIndex(pointIndex);
    }
  };
  
  // Handle mouse move for dragging
  const handleMouseMove = (e) => {
    if (!isDragging || dragPointIndex === null || !image) return;
    
    const { x, y } = getCanvasCoordinates(e);
    
    // Update the point position
    setBlurPoints(prevPoints => {
      const newPoints = [...prevPoints];
      newPoints[dragPointIndex] = { 
        ...newPoints[dragPointIndex], 
        x: Math.max(0, Math.min(image.width, x)),
        y: Math.max(0, Math.min(image.height, y))
      };
      return newPoints;
    });
  };
  
  // Handle mouse up to end dragging
  const handleMouseUp = () => {
    setIsDragging(false);
    setDragPointIndex(null);
  };
  
  // Add a new blur point in the center
  const addBlurPoint = () => {
    if (!image) return;
    
    const newPoint = { 
      x: image.width / 2, 
      y: image.height / 2, 
      intensity: Math.round(blurIntensity * 0.8), // Default to 80% of max blur
      softness: 100 
    };
    
    setBlurPoints(prevPoints => [...prevPoints, newPoint]);
    setSelectedPointIndex(blurPoints.length); // Select the new point
  };
  
  // Remove the selected blur point or the last one
  const removeBlurPoint = () => {
    if (blurPoints.length === 0) return;
    
    if (selectedPointIndex !== null && selectedPointIndex < blurPoints.length) {
      setBlurPoints(prevPoints => prevPoints.filter((_, i) => i !== selectedPointIndex));
      setSelectedPointIndex(null);
    } else {
      setBlurPoints(prevPoints => prevPoints.slice(0, -1));
      if (selectedPointIndex === blurPoints.length - 1) {
        setSelectedPointIndex(null);
      }
    }
  };
  
  // Toggle random points
  const randomizePoints = () => {
    if (!image) return;
    
    const count = blurPoints.length > 0 ? blurPoints.length : 3;
    const newPoints = [];
    
    for (let i = 0; i < count; i++) {
      // Random intensity between 3 and blurIntensity
      const randomIntensity = Math.max(3, Math.floor(Math.random() * blurIntensity));
      
      newPoints.push({
        x: Math.random() * image.width,
        y: Math.random() * image.height,
        intensity: randomIntensity,
        softness: 50 + Math.floor(Math.random() * 100) // Random softness between 50-150
      });
    }
    
    setBlurPoints(