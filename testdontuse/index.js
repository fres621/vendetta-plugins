(function(exports){"use strict";function n(){return eval(`
    import { Forms } from "@vendetta/ui/components";
    const { FormText } = Forms;

    React.createElement(
        FormText,
        null,
        "AAAAAAAAAAA"
    );
    `)}let o=[];var index={onLoad:function(){o.push(function(){console.log("uwu")})},onUnload:function(){for(const e of o)e()},settings:n};return exports.default=index,Object.defineProperty(exports,"__esModule",{value:!0}),exports})({});
