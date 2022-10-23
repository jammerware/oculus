export const template = `
<div id="oculus-root">
    <style id="oculus-style-root"></style>
    <div id="oculus-content-root">
        <ul>
            <li>Syntax highlighting</li>
            <li>Copy</li>
            <li>Start a CodePen</li>
        </ul>
        <hr />
        <div>
            <code>
            <slot name="source">
                ng generate component product-alerts
            </slot>
        </code>
        </div>
    </div>
</div>
`;