import { DropdownSize, IconEnum, defineSettings } from '@frontify/guideline-blocks-settings';

export const ASSET_SETTINGS_ID = 'images';

export const settings = defineSettings({
    main: [
        {
            id: 'main-dropdown',
            type: 'dropdown',
            defaultValue: 'example_block',
            size: DropdownSize.Large,
            disabled: true,
            choices: [
                {
                    value: 'example_block',
                    icon: IconEnum.BuildingBlock,
                    label: 'Example Block',
                },
            ],
        },
    ],
    content: [
        {
            id: ASSET_SETTINGS_ID,
            type: 'assetInput',
        },
    ],
});
