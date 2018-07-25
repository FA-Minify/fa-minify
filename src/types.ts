
export type IconType = 'far' | 'fas' | 'fal' | 'fab';

export interface RemoveIconsConfig {
  usedIcons: {
    [type in IconType]?: string[];
  }
}
