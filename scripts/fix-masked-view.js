#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths to the files we need to fix
const maskedViewJsPath = path.join(
  __dirname,
  '../node_modules/one/node_modules/@react-native-masked-view/masked-view/js/MaskedView.js'
);
const indexJsPath = path.join(
  __dirname,
  '../node_modules/one/node_modules/@react-native-masked-view/masked-view/index.js'
);

// Fixed content for MaskedView.js
const maskedViewContent = `/**
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
 * Renders the child view with a mask specified in the \`maskElement\` prop.
 *
 * \`\`\`
 * import React from 'react';
 * import { Text, View } from 'react-native';
 * import MaskedView from 'react-native-masked-view';
 *
 * class MyMaskedView extends React.Component {
 *   render() {
 *     return (
 *       <MaskedView
 *         style={{ flex: 1 }}
 *         maskElement={
 *           <View style={styles.maskContainerStyle}>
 *             <Text style={styles.maskTextStyle}>
 *               Basic Mask
 *             </Text>
 *           </View>
 *         }
 *       >
 *         <View style={{ flex: 1, backgroundColor: 'blue' }} />
 *       </MaskedView>
 *     );
 *   }
 * }
 * \`\`\`
 *
 * The above example will render a view with a blue background that fills its
 * parent, and then mask that view with text that says "Basic Mask".
 *
 * The alpha channel of the view rendered by the \`maskElement\` prop determines how
 * much of the view's content and background shows through. Fully or partially
 * opaque pixels allow the underlying content to show through but fully
 * transparent pixels block that content.
 *
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
          'MaskedView: Invalid \`maskElement\` prop was passed to MaskedView. ' +
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

module.exports = MaskedView;`;

// Fixed content for index.js
const indexContent = `var MaskedView = require('./js/MaskedView');

module.exports = MaskedView;`;

// Apply the fixes
try {
  if (fs.existsSync(maskedViewJsPath)) {
    fs.writeFileSync(maskedViewJsPath, maskedViewContent);
    console.log('✅ Successfully fixed MaskedView.js for React 19 compatibility');
  } else {
    console.log('⚠️ Could not find MaskedView.js at', maskedViewJsPath);
  }

  if (fs.existsSync(indexJsPath)) {
    fs.writeFileSync(indexJsPath, indexContent);
    console.log('✅ Successfully fixed index.js for React 19 compatibility');
  } else {
    console.log('⚠️ Could not find index.js at', indexJsPath);
  }

  console.log('🎉 React 19 compatibility fix for @react-native-masked-view/masked-view completed!');
} catch (error) {
  console.error('❌ Error applying React 19 compatibility fix:', error);
  process.exit(1);
} 