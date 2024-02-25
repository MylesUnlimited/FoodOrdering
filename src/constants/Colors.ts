const tintColorLight = '#2f95dc'; 
/* declares a constant variable named tintColorLight and assigns the hexadeximal code  #2f95dc, a shade of blue  */
const tintColorDark = '#fff';
/* declares a constant variable name tintColor dark and assigns the hexadecimal code #fff which is white*/

export default {/* starts the export of an object that contains the color themes for light and dark modes*/
  light: { /* starts the definition of the light mode theme*/
    text: '#000',/* defines text color as black*/
    background: '#fff',/* defines the background color as white */
    tint: tintColorLight,/* assigns tintColorLight to the tint property*/
    tabIconDefault: '#ccc',/* defines tab icons as a shade of gray */
    tabIconSelected: tintColorLight,/* line sets the color for selected tab icons as the shade of blue from the const variable tintColorLight */
  },
  dark: {/*starts the definition of the dark mode theme* */
    text: '#fff',/*defines text color as white */
    background: '#000',/* defines the background color as black */
    tint: tintColorDark,/* assigns tintColorDark to the tint property */
    tabIconDefault: '#ccc',/* defines tab icons as a shade of gray */
    tabIconSelected: tintColorDark,/* line sets the color for selected tab icons as the shade of blue from the const variable tintColorDark */
  },
};
