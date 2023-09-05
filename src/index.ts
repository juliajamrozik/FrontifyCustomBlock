import { defineBlock } from '@frontify/guideline-blocks-settings';

import { ContentBlock } from './Block';
import { settings } from './settings';
import './index.css';
// eslint-disable-next-line @typescript-eslint/no-unused-vars

export default defineBlock({
    block: ContentBlock,
    settings,
});
