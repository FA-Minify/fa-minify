
export type IconType = 'far' | 'fas' | 'fal' | 'fat' | 'fab';

export interface RemoveIconsConfig {
  usedIcons: {
    [type in IconType]?: string[];
  }
}
