## Global Text Visibility Fix Summary

### Fixed Issues:
1. **More solutions heading** - Changed from text-white to text-[#0B1F3B] on light backgrounds
2. **Card text on image backgrounds** - Changed from text-[#0B1F3B] to text-white with drop-shadow
3. **FAQ questions** - Changed from text-white to text-[#0B1F3B] on light backgrounds

### Files Modified:
- /app/frontend/src/pages/solutions/industry/*.jsx (all 8 industry pages)
- /app/frontend/src/pages/solutions/Training.jsx
- /app/frontend/src/pages/Careers.jsx
- /app/frontend/src/pages/AboutUs.jsx
- /app/frontend/src/pages/products/GPUNodes.jsx
- /app/frontend/src/pages/products/Serverless.jsx

### Verification:
- FAQ text is now dark on light backgrounds
- More solutions heading is now dark on light backgrounds
- Card labels (TRAINING, INFERENCE, etc.) are now white on dark image backgrounds
