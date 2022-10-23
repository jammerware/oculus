export const template = `
<div id="oculus-root">
    <style></style>
    <div id="oculus-content-root">
        <ul>
            <li>Syntax highlighting</li>
            <li>Copy</li>
            <li>Start a CodePen</li>
        </ul>
        <hr />
        <div>
            <pre>
                <code class="language-bash">
                    <slot name="source">
                        ng generate component product-alerts
                    </slot>
                </code>
            </pre>
        </div>
    </div>
    <div id="oculus-script-root"></div>
</div>
`;