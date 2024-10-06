import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

const SolidPhoneIcon = (props: Props) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M10.3072 10.5995L11.8138 9.16566C12.2262 8.77312 12.5161 8.2617 12.6464 7.697C12.7768 7.1323 12.7416 6.54007 12.5454 5.99626L11.9016 4.21264C11.6616 3.54693 11.1859 3.00134 10.5715 2.68722C9.95709 2.37309 9.25035 2.3141 8.59547 2.52229C6.1859 3.28732 4.33379 5.61155 4.90389 8.37222C5.2788 10.1879 5.99564 12.4669 7.35558 14.8925C8.49506 16.9353 9.92866 18.7854 11.6067 20.3788C13.6217 22.2819 16.5003 21.8061 18.3524 20.0145C18.8486 19.5339 19.1496 18.8752 19.1942 18.1724C19.2388 17.4696 19.0237 16.7756 18.5925 16.2316L17.4123 14.7438C17.0566 14.2952 16.5798 13.9671 16.0431 13.8017C15.5064 13.6363 14.9344 13.6411 14.4003 13.8156L12.4513 14.4531C12.376 14.373 12.2903 14.2778 12.1944 14.1675C11.7935 13.7076 11.439 13.2064 11.1363 12.6717C10.8416 12.1322 10.6007 11.5629 10.4174 10.9726C10.3782 10.849 10.3414 10.7247 10.3072 10.5995Z" />
    </svg>
  );
};

export default SolidPhoneIcon;
