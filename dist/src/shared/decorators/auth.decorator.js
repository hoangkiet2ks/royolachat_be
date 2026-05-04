"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsPublic = exports.Auth = exports.AUTH_TYPE_KEY = void 0;
const common_1 = require("@nestjs/common");
const auth_constant_1 = require("../constants/auth.constant");
exports.AUTH_TYPE_KEY = 'authType';
const Auth = (authType = auth_constant_1.AuthType.Bearer) => {
    return (0, common_1.SetMetadata)(exports.AUTH_TYPE_KEY, authType);
};
exports.Auth = Auth;
const IsPublic = () => (0, exports.Auth)(auth_constant_1.AuthType.None);
exports.IsPublic = IsPublic;
//# sourceMappingURL=auth.decorator.js.map