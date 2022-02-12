(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.faMinify = {}));
})(this, (function (exports) { 'use strict';

  function removeUnusedIcons(fileContent, config) {
    config = config || { usedIcons: {} };
    const usedIcons = config.usedIcons || {};
    fileContent = fileContent.replace(/(\(function\s*\(\)\s*\{[\s\S.]*?}\(\)\);)/gim, function() {
      const func = arguments[1];
      const matches = /\('(fa.)',/gi.exec(arguments[1]) || [];
      const type = matches[1];
      if (!type) {
        return func;
      }
      if (usedIcons[type] && usedIcons[type].length > 0) {
        return func;
      }
      return "";
    });
    fileContent = fileContent.replace(/(var\s+icons\s*=)([\s\S.]*?)(;[\s\S.]*?defineIcons\('(fa.)', icons\);)/gmi, function() {
      const fileIcons = arguments[2];
      const type = arguments[4];
      let iconObject = null;
      try {
        iconObject = JSON.parse(fileIcons);
      } catch (e) {
        iconObject = {};
      }
      if (usedIcons[type]) {
        Object.keys(iconObject).forEach((key) => {
          if (usedIcons[type].indexOf(key) < 0) {
            delete iconObject[key];
          }
        });
      }
      return arguments[1] + JSON.stringify(iconObject) + arguments[3];
    });
    return fileContent;
  }

  function getIconsFromFile(fileContent) {
    const icons = {
      fab: {},
      fal: {},
      far: {},
      fas: {}
    };
    fileContent = fileContent.replace(/var\s*icons\s*=([\s\S.]*?);[\s\S.]*?'(fa.)'/gmi, function() {
      const fileIcons = arguments[1];
      const type = arguments[2];
      let iconObject = null;
      try {
        iconObject = JSON.parse(fileIcons);
      } catch (e) {
        iconObject = {};
      }
      if (icons[type]) {
        Object.keys(iconObject).forEach((key) => {
          icons[type][key] = iconObject[key];
        });
      }
      return "";
    });
    return icons;
  }

  function getIconNamesFromFile(fileContent) {
    const icons = {
      far: [],
      fal: [],
      fas: [],
      fab: []
    };
    const fileIcons = getIconsFromFile(fileContent);
    Object.keys(icons || {}).forEach((iconType) => {
      icons[iconType] = Object.keys(fileIcons[iconType] || {});
    });
    return icons;
  }

  exports.getIconNamesFromFile = getIconNamesFromFile;
  exports.getIconsFromFile = getIconsFromFile;
  exports.removeUnusedIcons = removeUnusedIcons;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=index.js.map
