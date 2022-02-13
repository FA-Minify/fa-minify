
export type IconType = 'far' | 'fas' | 'fal' | 'fat' | 'fab';

/** The format of icons as saved in the `all.js` file. */
export type FileIconFormat = [number, number, Array<unknown>, string, string];

export interface RemoveIconsConfig {
  usedIcons: {
    [type in IconType]?: string[];
  }
}
