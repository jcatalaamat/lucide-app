Welcome to One! This is a branch from one-basic to implement with tailwind

# One Tailwind Basic

A React Native project with Tailwind CSS styling.

## React 19 Compatibility Fix

This project uses React 19, which has compatibility issues with the `@react-native-masked-view/masked-view` package that's nested inside the `one` framework dependency.

### Issue

When running the application with React 19, you may encounter the following error:

```
Error building React Native bundle
× Expected ',', got '{'
```

This happens because the MaskedView.js file in the one framework's dependencies uses TypeScript syntax and JSX in a CommonJS context, which is not compatible with the bundler.

### Fix Applied

We replaced the original MaskedView.js implementation with a simplified version that:

1. Uses CommonJS `require()` instead of ES imports
2. Uses `React.createElement()` instead of JSX syntax
3. Uses `React.createClass()` instead of ES6 classes
4. Removes all TypeScript-specific syntax

The fixed file is located at:
```
node_modules/one/node_modules/@react-native-masked-view/masked-view/js/MaskedView.js
```

### How to Apply the Fix After Reinstalling Dependencies

If you reinstall dependencies (e.g., after a `yarn install` or `npm install`), you'll need to apply the fix again. You have two options:

#### Option 1: Manual Edit

Manually edit the file at `node_modules/one/node_modules/@react-native-masked-view/masked-view/js/MaskedView.js` and replace its contents with:

```javascript
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var React = require('react');
var ReactNative = require('react-native');
var View = ReactNative.View;
var StyleSheet = ReactNative.StyleSheet;
var requireNativeComponent = ReactNative.requireNativeComponent;

var RNCMaskedView = requireNativeComponent('RNCMaskedView');

/**
 * Renders the child view with a mask specified in the `maskElement` prop.
 */
var MaskedView = React.createClass({
  displayName: 'MaskedView',

  _hasWarnedInvalidRenderMask: false,

  render: function() {
    var props = this.props;
    var maskElement = props.maskElement;
    var children = props.children;
    var otherViewProps = Object.assign({}, props);
    delete otherViewProps.maskElement;
    delete otherViewProps.children;

    if (!React.isValidElement(maskElement)) {
      if (!this._hasWarnedInvalidRenderMask) {
        console.warn(
          'MaskedView: Invalid `maskElement` prop was passed to MaskedView. ' +
            'Expected a React Element. No mask will render.'
        );
        this._hasWarnedInvalidRenderMask = true;
      }
      return React.createElement(View, otherViewProps, children);
    }

    return React.createElement(
      RNCMaskedView,
      otherViewProps,
      React.createElement(
        View,
        {
          pointerEvents: 'none',
          style: {
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0
          }
        },
        maskElement
      ),
      children
    );
  }
});

module.exports = MaskedView;
```

#### Option 2: Using patch-package (Recommended)

1. Install patch-package if you haven't already:
   ```
   yarn add patch-package postinstall-postinstall --dev
   ```

2. Create the patch:
   ```
   npx patch-package one
   ```

3. Add a postinstall script to package.json:
   ```json
   "scripts": {
     "postinstall": "patch-package"
   }
   ```

   This will automatically apply the patch after every dependency installation.

### When This Fix Is Necessary

This fix is necessary when:

1. You're using React 19.x
2. You're using the `one` framework
3. You run into build errors related to `@react-native-masked-view/masked-view`

The issue will likely be resolved in future versions of the `one` framework when they update their dependencies to be compatible with React 19.

## Running the Project

```
# Install dependencies
yarn install

# Apply the patch (if using option 2)
npx patch-package one

# Run the development server
yarn dev
```

# One + Supabase + Drizzle Starter

This is a React Native project using One framework with Supabase for backend and Drizzle for database schema management.

## Supabase Configuration

This project uses Supabase with Drizzle ORM to manage database interactions. The setup allows you to define your database schema in code and still use all the features of Supabase.

### Connection Options

We've found that there are two ways to connect to your Supabase PostgreSQL database:

1. **Direct Connection** (may not be accessible from all networks):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.mlmoazsiwfswonkzbgie.supabase.co:5432/postgres
   ```

2. **Connection Pooler** (recommended, more reliable):
   ```
   postgresql://postgres.mlmoazsiwfswonkzbgie:[YOUR-PASSWORD]@aws-0-eu-west-3.pooler.supabase.com:6543/postgres
   ```

The pooler connection is recommended as it provides better reliability and can be accessed from most networks. The direct connection might not be accessible from all networks due to DNS resolution issues.

### Important Notes on Connection Strings:

- If your password contains special characters like `@` or `*`, they must be URL-encoded:
  - `@` should be encoded as `%40`
  - `*` should be encoded as `%2A`

- Example for encoding a password:
  ```javascript
  const encodedPassword = encodeURIComponent('your@password*with*special@chars').replace(/\*/g, '%2A');
  ```

## Setup Instructions

1. **Create a Supabase Project**:
   - Go to [Supabase](https://supabase.com) and create a new project
   - Note your project URL and anon key from Project Settings > API

2. **Configure Environment Variables**:
   - Create a `.env` file in the root of your project with the following:
   ```
   # Supabase API connection
   SUPABASE_URL=https://your-project-id.supabase.co
   SUPABASE_ANON_KEY=your-anon-key
   
   # Database connection for Drizzle (use the connection pooler)
   DATABASE_URL=postgresql://postgres.your-project-id:[YOUR-PASSWORD]@aws-0-eu-west-3.pooler.supabase.com:6543/postgres
   ```

3. **Generate Migration SQL**:
   ```bash
   npm run db:generate
   ```
   This will create SQL migration files in the `./drizzle` folder

4. **Apply Migration to Supabase**:
   - Navigate to your Supabase dashboard
   - Go to the SQL Editor
   - Copy and paste the contents of the generated migration files
   - Run the SQL to create your tables

5. **Seed Your Database** (optional):
   ```bash
   npm run db:seed
   ```

6. **Check Connection**:
   ```bash
   npm run db:check
   ```

## Row Level Security (RLS)

Note that when using the Supabase client, you may encounter "row-level security policy" errors. This is because Supabase uses RLS by default to protect your data. You'll need to configure appropriate RLS policies in the Supabase dashboard to allow the operations you need.

When using Drizzle with the direct database connection, RLS is bypassed, giving you full access to your data.

## Available Scripts

- `npm run db:generate` - Generate database migrations
- `npm run db:check` - Check database connection 
- `npm run db:seed` - Seed database with sample data
- `npm run db:setup` - Set up the database

## Project Structure

- `lib/supabase.ts` - Supabase client setup
- `lib/schema/index.ts` - Database schema definitions using Drizzle
- `lib/db/index.ts` - Database connection setup
- `scripts/` - Helper scripts for database operations
- `drizzle/` - Generated SQL migration files

## Tech Stack

- One framework for React Native
- Supabase for authentication, database, and storage
- Drizzle ORM for type-safe database access
- TailwindCSS for styling
