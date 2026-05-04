"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPEmail = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const components_1 = require("@react-email/components");
const logoUrl = 'https://scontent.fsgn24-1.fna.fbcdn.net/v/t39.30808-1/451313593_1228721121622599_7501337870300383532_n.jpg?stp=dst-jpg_s200x200_tt6&_nc_cat=102&ccb=1-7&_nc_sid=e99d92&_nc_eui2=AeHLhvCtouE1I3jKP1-_fL5R3F19icR1JhvcXX2JxHUmG6XzPeBvkUkTQNxODS4wqliG-SCAfwRPMJqCLL3Bo1Mz&_nc_ohc=q2H01RNlD5kQ7kNvwH5MR7l&_nc_oc=Adncmyxp9Z5nmQv1b0zzaVfbbX2NG0oWPjKimmigsno-EXIwqheWJLx8TejvEz1kWjU&_nc_zt=24&_nc_ht=scontent.fsgn24-1.fna&_nc_gid=5-xUgH9k-lOCIC86ZpkqIA&oh=00_AfqkJGMypT-X3iDoUslHpXWm0DaaOQvvJ17ShBRc29qXLw&oe=69795AED';
const OTPEmail = ({ otpCode, title }) => ((0, jsx_runtime_1.jsxs)(components_1.Html, { children: [(0, jsx_runtime_1.jsx)(components_1.Head, { children: (0, jsx_runtime_1.jsx)("title", { children: title }) }), (0, jsx_runtime_1.jsxs)(components_1.Body, { style: main, children: [(0, jsx_runtime_1.jsxs)(components_1.Container, { style: container, children: [(0, jsx_runtime_1.jsx)(components_1.Img, { src: logoUrl, width: "212", height: "88", alt: "Logo", style: logo }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: tertiary, children: "M\u00E3 x\u00E1c th\u1EF1c OTP" }), (0, jsx_runtime_1.jsx)(components_1.Heading, { style: secondary, children: "H\u00E3y nh\u1EADp m\u00E3 x\u00E1c th\u1EF1c OTP sau v\u00E0o website" }), (0, jsx_runtime_1.jsx)(components_1.Section, { style: codeContainer, children: (0, jsx_runtime_1.jsx)(components_1.Text, { style: code, children: otpCode }) }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: paragraph, children: "N\u1EBFu b\u1EA1n kh\u00F4ng ch\u1EE7 \u0111\u1ED9ng th\u1EF1c hi\u1EC7n h\u00E0nh \u0111\u1ED9ng n\u00E0y, xin h\u00E3y b\u1ECF qua email?" })] }), (0, jsx_runtime_1.jsx)(components_1.Text, { style: footer, children: "From H\u1EA3i \u0110\u0103ng" })] })] }));
exports.OTPEmail = OTPEmail;
exports.OTPEmail.PreviewProps = {
    otpCode: '144833',
    title: 'Mã OTP',
};
exports.default = exports.OTPEmail;
const main = {
    backgroundColor: '#ffffff',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
};
const container = {
    backgroundColor: '#ffffff',
    border: '1px solid #eee',
    borderRadius: '5px',
    boxShadow: '0 5px 10px rgba(20,50,70,.2)',
    marginTop: '20px',
    maxWidth: '360px',
    margin: '0 auto',
    padding: '68px 0 130px',
};
const logo = {
    margin: '0 auto',
    width: '70px',
    height: '70px',
    borderRadius: '100%',
};
const tertiary = {
    color: '#0a85ea',
    fontSize: '11px',
    fontWeight: 700,
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
    height: '16px',
    letterSpacing: '0',
    lineHeight: '16px',
    margin: '16px 8px 8px 8px',
    textTransform: 'uppercase',
    textAlign: 'center',
};
const secondary = {
    color: '#000',
    display: 'inline-block',
    fontFamily: 'HelveticaNeue-Medium,Helvetica,Arial,sans-serif',
    fontSize: '20px',
    fontWeight: 500,
    lineHeight: '24px',
    marginBottom: '0',
    marginTop: '0',
    textAlign: 'center',
};
const codeContainer = {
    background: 'rgba(0,0,0,.05)',
    borderRadius: '4px',
    margin: '16px auto 14px',
    verticalAlign: 'middle',
    width: '280px',
};
const code = {
    color: '#000',
    display: 'inline-block',
    fontFamily: 'HelveticaNeue-Bold',
    fontSize: '32px',
    fontWeight: 700,
    letterSpacing: '6px',
    lineHeight: '40px',
    paddingBottom: '8px',
    paddingTop: '8px',
    margin: '0 auto',
    width: '100%',
    textAlign: 'center',
};
const paragraph = {
    color: '#444',
    fontSize: '15px',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
    letterSpacing: '0',
    lineHeight: '23px',
    padding: '0 40px',
    margin: '0',
    textAlign: 'center',
};
const link = {
    color: '#444',
    textDecoration: 'underline',
};
const footer = {
    color: '#000',
    fontSize: '12px',
    fontWeight: 800,
    letterSpacing: '0',
    lineHeight: '23px',
    margin: '0',
    marginTop: '20px',
    fontFamily: 'HelveticaNeue,Helvetica,Arial,sans-serif',
    textAlign: 'center',
    textTransform: 'uppercase',
};
//# sourceMappingURL=otp.js.map