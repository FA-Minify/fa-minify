export declare type IconType = 'far' | 'fas' | 'fal' | 'fab';
export interface RemoveIconsConfig {
    usedIcons: {
        [type in IconType]?: string[];
    };
}
export declare function removeUnusedIcons(fileContent: string, config: RemoveIconsConfig): string;
export declare function getIcons(fileContent: string): {
    far: any[];
    fal: any[];
    fas: any[];
    fab: any[];
};
