import Image from "next/image";

const Page = async () => {
  return (
    <div className="h-full flex flex-col items-center justify-center">
      <Image
        alt="로고"
        src="/image/logo_g.png"
        width={120}
        height={120}
        priority
        className="xl:hidden w-[120px] h-[120px]"
      />
      <span className="text-body_bm text-gray-600">
        이 페이지는 준비중입니다.
      </span>
    </div>
  );
};

export default Page;
