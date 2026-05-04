interface OTPEmailProps {
    otpCode: string;
    title: string;
}
export declare const OTPEmail: {
    ({ otpCode, title }: OTPEmailProps): import("react/jsx-runtime").JSX.Element;
    PreviewProps: OTPEmailProps;
};
export default OTPEmail;
