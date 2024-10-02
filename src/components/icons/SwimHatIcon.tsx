import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const SwimHatIcon = (props: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M21.1771 16C21.1771 10.109 18.7509 4 12.0009 4C5.25093 4 2.8125 10.109 2.8125 16"
        strokeWidth="1.5"
      />
      <path
        d="M11.25 16.5C11.25 17.1546 10.8719 17.8239 10.1054 18.3604C9.3413 18.8953 8.2457 19.25 7 19.25C5.7543 19.25 4.6587 18.8953 3.89456 18.3604C3.12806 17.8239 2.75 17.1546 2.75 16.5C2.75 15.8454 3.12806 15.1761 3.89456 14.6396C4.6587 14.1047 5.7543 13.75 7 13.75C8.2457 13.75 9.3413 14.1047 10.1054 14.6396C10.8719 15.1761 11.25 15.8454 11.25 16.5Z"
        strokeWidth="1.5"
      />
      <path
        d="M21.25 16.5C21.25 17.1546 20.8719 17.8239 20.1054 18.3604C19.3413 18.8953 18.2457 19.25 17 19.25C15.7543 19.25 14.6587 18.8953 13.8946 18.3604C13.1281 17.8239 12.75 17.1546 12.75 16.5C12.75 15.8454 13.1281 15.1761 13.8946 14.6396C14.6587 14.1047 15.7543 13.75 17 13.75C18.2457 13.75 19.3413 14.1047 20.1054 14.6396C20.8719 15.1761 21.25 15.8454 21.25 16.5Z"
        strokeWidth="1.5"
      />
      <path d="M11 17H13" strokeWidth="1.5" />
      <path d="M4 11H20" strokeWidth="1.5" />
    </svg>
  );
};

export default SwimHatIcon;
