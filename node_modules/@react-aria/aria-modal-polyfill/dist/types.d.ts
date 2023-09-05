type Revert = () => void;
/**
 * Acts as a polyfill for `aria-modal` by watching for added modals and hiding any surrounding DOM elements with `aria-hidden`.
 */
export function watchModals(selector?: string, { document }?: {
    document?: Document;
}): Revert;

//# sourceMappingURL=types.d.ts.map
