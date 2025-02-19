import Image from "next/image"

export default function LoadingLogo({size = 100} : Props
    
) {
  return (
    <div className="w-full h-full flex justify-center content-center">
        <Image src="/logo.svg" alt="logo" className="animate-pulse duration-700" width={size} height={size} /> 
    </div>
  )
};
 
type Props = {
    size?: number
}