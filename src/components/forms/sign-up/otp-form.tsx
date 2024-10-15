import OTPInput from '@/components/otp';
import React from 'react';

type Props = {
  setOTP: React.Dispatch<React.SetStateAction<string>>;
  onOTP: string;
};

const OTPForm = ({ onOTP, setOTP }: Props) => {
  return (
    <>
      <h2 className="text-slateBlue md:text-4xl font-bold">Digite OTP</h2>
      <p className="text-iridium md:text-sm">
        Digite a senha única que foi enviada para seu e-mail.
      </p>
      <div className="w-full justify-center flex py-5">
        <OTPInput otp={onOTP} setOtp={setOTP} />
      </div>
    </>
  );
};

export default OTPForm;
