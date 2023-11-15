import {
  StaticImageData,
  StaticImport,
} from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import * as React from 'react';

interface Props {
  image: string | StaticImport | StaticImageData;
  alt: string;
}

/**
 * @description image is 272x572
 */
const IPhone = (props: Props) => (
  <div className="relative mx-auto border-gray-800 dark:border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-xl">
    <div className="w-[148px] h-[18px] bg-gray-800 top-0 rounded-b-[1rem] left-1/2 -translate-x-1/2 absolute"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
    <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[178px] rounded-l-lg"></div>
    <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
    <div className="rounded-[2rem] overflow-hidden w-[272px] h-[572px] bg-white dark:bg-gray-800">
      <Image
        src={props.image}
        className="w-[272px] h-[572px]"
        alt={props.alt}
        itemProp="image"
        width={272}
        height={572}
      />
    </div>
  </div>
);

export default {
  IPhone,
};
