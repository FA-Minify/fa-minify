"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const get_icons_from_file_1 = require("./get-icons-from-file");
function getIconNamesFromFile(fileContent) {
    const icons = {
        far: [],
        fal: [],
        fas: [],
        fab: []
    };
    // read icons from file content
    const fileIcons = get_icons_from_file_1.getIconsFromFile(fileContent);
    // convert fileIcons into target structure
    Object.keys(icons || {}).forEach(iconType => {
        icons[iconType] = Object.keys(fileIcons[iconType] || {});
    });
    // return found icons
    return icons;
}
exports.getIconNamesFromFile = getIconNamesFromFile;
;
