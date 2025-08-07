# Codeial App - Code Structure and Asset Pipeline

## 🏗️ Overall Application Structure

```
codeial-web-app/
├── assets/                  # 📂 SOURCE FILES (Development)
│   ├── css/                # Compiled CSS from SCSS
│   ├── scss/               # Source SCSS files
│   └── js/                 # Source JavaScript files
│
├── public/                  # 📂 PROCESSED FILES (Production)
│   └── assets/             # Minified, versioned assets
│       ├── css/
│       ├── js/
│       └── rev-manifest.json
│
├── config/                  # 📂 Configuration files
├── controllers/             # 📂 Route handlers
├── models/                  # 📂 Database models
├── views/                   # 📂 EJS templates
├── routes/                  # 📂 Route definitions
├── uploads/                 # 📂 User uploaded files
├── workers/                 # 📂 Background job workers
├── mailers/                 # 📂 Email templates
└── gulpfile.js             # 📂 Build process configuration
```

## 🔄 Asset Pipeline Flow

### Development Environment (`NODE_ENV=development`)

```
1. SCSS Files (assets/scss/) 
   ↓ [SASS Middleware compiles]
   ↓
2. CSS Files (assets/css/)
   ↓ [Express serves directly]
   ↓
3. Browser receives CSS
```

### Production Environment (`NODE_ENV=production`)

```
1. SCSS Files (assets/scss/)
   ↓ [Gulp compiles]
   ↓
2. CSS Files (assets/css/)
   ↓ [Gulp minifies + versions]
   ↓
3. Minified CSS (public/assets/css/layout-43e5d0f990.css)
   ↓ [Express serves from public/]
   ↓
4. Browser receives optimized CSS
```

## 🎯 Why Two Asset Folders?

### `assets/` Folder (Source)
- **Purpose**: Development and source files
- **Contents**: 
  - Original SCSS files
  - Original JavaScript files
  - Unprocessed images
- **Used When**: Development environment
- **Served By**: Express middleware directly

### `public/assets/` Folder (Processed)
- **Purpose**: Production-ready, optimized files
- **Contents**:
  - Minified CSS with version hashes
  - Minified JavaScript with version hashes
  - Compressed images
  - `rev-manifest.json` (file mapping)
- **Used When**: Production environment
- **Served By**: Express static middleware

## 📝 How Asset Path Resolution Works

### In `config/view-helpers.js`:
```javascript
app.locals.assetPath = function(filePath){
    if (env.name == 'development'){
        return filePath; // Returns: 'css/layout.css'
    }
    
    return '/' + JSON.parse(
        fs.readFileSync(path.join(__dirname, '../public/assets/rev-manifest.json'))
    )[filePath]; // Returns: '/css/layout-43e5d0f990.css'
}
```

### In EJS Templates:
```html
<!-- This line: -->
<link rel="stylesheet" href="<%= assetPath('css/layout.css') %>">

<!-- Becomes in DEVELOPMENT: -->
<link rel="stylesheet" href="css/layout.css">

<!-- Becomes in PRODUCTION: -->
<link rel="stylesheet" href="/css/layout-43e5d0f990.css">
```

## 🔧 Express Static Middleware Configuration

### In `index.js`:
```javascript
// Serves the assets folder in development
app.use(express.static(env.asset_path)); 
// env.asset_path = "./assets" in development

// The public folder is automatically served by Express
// when files are built for production
```

### Environment Configuration (`config/environment.js`):
```javascript
const development = {
    asset_path: "./assets",  // Points to source files
    // ... other config
};

const production = {
    asset_path: process.env.CODEIAL_ASSET_PATH, // Points to public/assets
    // ... other config
};
```

## 🚀 Build Process (Gulp)

### Development Mode:
- SCSS files compiled to CSS on-the-fly
- Files served directly from `assets/` folder
- No minification or versioning

### Production Mode:
1. `gulp clean:assets` - Clears `public/assets/`
2. `gulp css` - Compiles SCSS → CSS → Minifies → Versions → Saves to `public/assets/`
3. `gulp js` - Minifies JS → Versions → Saves to `public/assets/`
4. `gulp images` - Compresses images → Versions → Saves to `public/assets/`
5. Creates `rev-manifest.json` with file mappings

## 📋 File Mapping Example

### `public/assets/rev-manifest.json`:
```json
{
  "css/layout.css": "css/layout-43e5d0f990.css",
  "css/header.css": "css/header-5624c7deef.css",
  "js/home_posts.js": "js/home_posts-5b6c172334.js"
}
```

## 🎨 SCSS Compilation Process

### 1. Source SCSS (`assets/scss/layout.scss`):
```scss
body{
    margin: 0;
    #layout-main{
        height: 100%;
        overflow: auto;
    }
}
```

### 2. Compiled CSS (`assets/css/layout.css`):
```css
body {
  margin: 0;
}
body #layout-main {
  height: 100%;
  overflow: auto;
}
```

### 3. Production CSS (`public/assets/css/layout-43e5d0f990.css`):
```css
body{margin:0}body #layout-main{height:100%;overflow:auto}
```

## 🔍 Why You Can't Use `public/assets/` Directly in Development

### Reasons:
1. **Files Don't Exist**: `public/assets/` is only populated during production builds
2. **Version Hashes**: File names include random hashes that change with each build
3. **Middleware Setup**: Express is configured to serve from `assets/` in development
4. **Build Process**: You need to run `gulp build` to generate `public/assets/` files

### To Use Production Assets in Development:
```bash
# Build production assets
gulp build

# Change environment to production
export NODE_ENV=production
# or
set NODE_ENV=production  # Windows

# Start server
npm start
```

## 🛠️ Common Commands

```bash
# Development (uses assets/ folder)
npm start

# Build for production
gulp build

# Run in production mode
npm run prod_start

# Clean and rebuild assets
gulp clean:assets && gulp build

# Compile SCSS only
gulp scss
```

## 🎯 Key Takeaways

1. **Development**: Uses `assets/` folder directly
2. **Production**: Uses processed files in `public/assets/`
3. **Asset Pipeline**: Handles compilation, minification, and versioning
4. **Version Hashes**: Prevent browser caching issues
5. **Environment-Based**: Different behavior based on `NODE_ENV`

This architecture provides:
- ⚡ Fast development (no build step needed)
- 🚀 Optimized production (minified, cached assets)  
- 🔄 Cache busting (version hashes)
- 📦 Asset management (single source of truth)