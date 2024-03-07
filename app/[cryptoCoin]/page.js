"use client"
import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import { Card, CardContent } from "@/components/ui/card"
  
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
  } from "@material-tailwind/react";
  import { useEffect, useState } from "react";
import TradingViewWidget from "@/Widgets/TradingViewWidget";
import { useRouter } from 'next/navigation'

export default function Home({ params }) {
    const router = useRouter()
    // Make a GET request
    // fetch(`https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=${process.env.API_KEY}&ids='bitcoin'&vs_currencies=usd,inr`)
    // .then(response => {
    //     if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //     }
    //     console.log( response.json());
    // })
    // .then(data => {
    //     console.log(data);
    // })
    // .catch(error => {
    //     console.error('Error:', error);
    // });
    // var res;

    // useEffect(()=>{
        
    // },[])
    
    // console.log("a",res)
    // const ids=['bitcoin','ethereum','tether'];
    // var arr=[];
    // for(var i=0;i<3;i++)
    // {
        //     console.log(i);
        //     fetch(`https://api.coingecko.com/api/v3/coins/${ids[i]}?localization=false&tickers=false&market_data=false&community_data=false&developer_data=false&sparkline=false`, options)
        //     .then(response => response.json())
        //     .then(response => arr.push(response.json))
        //     .catch(err => console.error(err));
        // }
        // console.log(arr);
        // const [bitcoinPrice, setBitcoinPrice] = useState(null);

        // cosnt [crypto = "BITSTAMP:BTCUSD";
        
        const [bitcoinInc, setBitcoinInc] = useState(null);
        const [ethereumInc, setEthereumInc] = useState(null);
        const [tetherInc, settetherInc] = useState(null);
        const options = {method: 'GET', headers: {'x-cg-demo-api-key': process.env.API_KEY}};
        const [coin,setCoin]=useState()
        const [coinName,setCoinName]=useState()
        const [trend,setTrend]=useState([])
        // const [trend2,setTrend2]=useState([])
        const [str,setStr]=useState("")
        // async function getData2(){
        //     try{
        //         if(trend[0]?.item.id!=null){

        //             var str2= await trend[0]?.item?.id +"%2C"+ trend[1]?.item?.id +"%2C"+trend[2]?.item?.id;
        //             console.log("A");
        //             console.log(str2)
        //             setStr(str2)
        //         }
        //         // const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Ctether&vs_currencies=usd%2Cinr&include_24hr_change=true', options);
        //         // const data = await response.json();
        //         // setBitcoinInc(data.bitcoin.usd_24h_change);
        //         // setEthereumInc(data.ethereum.usd_24h_change);
        //         // settetherInc(data.tether.usd_24h_change);
        //     }
        //     catch(err){
        //         console.log(err)
        //     }
        // }

        async function getData2(){
            try{
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${params.cryptoCoin}`)
                const res = await response.json();
                setCoin(res?.symbol)
            }
            catch(err){
                console.log(err)
            }
        }

        async function getData(){
            try{
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${params.cryptoCoin}`)
                const res = await response.json();
                setCoin(res?.symbol)
                setCoinName(res?.name)

                const response1 = await fetch('https://api.coingecko.com/api/v3/search/trending', options);
                const res1 = await response1.json();
                setTrend(res1?.coins)
                // if(trend[0]?.item.name!=undefined){

                //     var str2= await trend[0]?.item?.id +"%2C"+ trend[1]?.item?.id +"%2C"+trend[2]?.item?.id;
                //     console.log("A");
                //     console.log(str2)
                //     setStr(str2)
                // }
            }
            catch(err){
                console.log(err)
            }
        }
        useEffect(()=>{
            getData()
            // setCoin(coin)
            // getData2()
        },[])

        // const handleClick = () => {
        //     console.log("click");
        //     getData()
        // }
        return (
    <div className="flex min-h-screen flex-col bg-[#EFF2F5] text-black gap-y-[20px] scrollbar-none scrollbar-track-transparent">
        <div className=" w-full h-[80px] bg-white flex flex-row relative">
            <div className="h-full absolute left-[60px] w-[96px] flex justify-center items-center">
                <Image alt="Image" src="/images/logo.png" height={128} width={128}></Image>
            </div>
            <div className="h-full right-[56px]  absolute flex justify-between items-center gap-[32px]">
                <div className="text-black">Crypto Taxes</div>
                <div onClick={() =>handleClick()} className="text-black">Free Tools</div>
                <div onClick={() =>handleClick()} className="text-black">Resource Center</div>
                <div onClick={() =>handleClick()} className="h-[40px] w-[130px] text-center rounded-[8px] p-[8px] ml-[13px] bg-gradient-to-r from-[#2870EA] to-[#1B4AEF] ">Get Started</div>
                
            </div>
        </div>
        <div className="mx-[20px] md:mx-[36px] lg:mx-[42px] xl:mx-[56px] flex flex-row"><div className="font-normal">Cryptocurrencies &gt;&gt;&nbsp;</div>  <div className="font-semibold"> {coinName}</div></div>
        <div className="mx-[20px] md:mx-[36px] lg:mx-[42px] xl:mx-[56px] w-[calc(100dvh-72px]] lg:w-[calc(100dvh-112px]) h-full flex flex-col lg:flex-row gap-[20px] ">
            <div className=" w-[100%] lg:w-[calc((100%-20px)*0.7)]  flex flex-col gap-[20px]">
                <div className="bg-black h-[500px] rounded-[8px] w-full overflow-hidden">
                    {coin && <TradingViewWidget coin={coin} />}
                </div>
                <Tabs value="Overview">
                    <TabsHeader className="" indicatorProps={{
                        className:
                            "",
                        }}> 
                        <Tab key={1} value={"Overview"}>
                            <div className="flex items-center  cursor-pointer">
                            Overview
                            </div>
                        </Tab>
                        <Tab key={2} value={"Fundamentals"}>
                            <div className="flex items-center  cursor-pointer">
                            Fundamentals
                            </div>
                        </Tab>
                        <Tab key={3} value={"News Insights"}>
                            <div className="flex items-center text-nowrap  cursor-pointer">
                            News Insights
                            </div>
                        </Tab>
                        <Tab key={4} value={"Sentiments"}>
                            <div className="flex items-center  cursor-pointer">
                            Sentiments
                            </div>
                        </Tab>
                        <Tab key={5} value={"Team"}>
                            <div className="flex items-center ">
                            Team
                            </div>
                        </Tab>
                        <Tab key={6} value={"Technicals"}>
                            <div className="flex items-center ">
                            Technicals
                            </div>
                        </Tab>
                        <Tab key={7} value={"Tokenomics"}>
                            <div className="flex items-center ">
                            Tokenomics
                            </div>
                        </Tab>
                        
                    </TabsHeader>
                    <TabsBody>
                        
                        <TabPanel className="p-0" key={1} value={"Overview"}>
                        <div className="bg-white min-h-[400px] flex flex-col w-full rounded-[8px] p-[24px] gap-[24px] mt-[16px]">
                            <div className="font-semibold text-[24px] text-black text-lg">Performance</div>
                            <div className="gap-[15px] w-full">
                                <div className="">Todays High</div>
                                <div className="">Todays High</div>
                                <div className="">Todays Low</div>
                                <div className="">Todays Low</div>
                            </div>
                            <div className="font-semibold text-[24px] text-black text-lg">Fundamentals</div>
                            <div className="gap-[15px] w-full">
                                <div className="">Todays High</div>
                                <div className="">Todays High</div>
                                <div className="">Todays Low</div>
                                <div className="">Todays Low</div>
                            </div>
                        </div>
                            
                        </TabPanel>
                        <TabPanel className="p-0" key={2} value={"Fundamentals"}>
                        <div className="bg-white min-h-[400px] flex flex-col w-full rounded-[8px] p-[24px] gap-[24px] mt-[16px]">
                            <div className="font-semibold text-[24px] text-black text-lg">Fundamentals</div>
                        </div>
                        </TabPanel>
                        <TabPanel className="p-0" key={3} value={"News Insights"}>
                        <div className="bg-white min-h-[400px] flex flex-col w-full rounded-[8px] p-[24px] gap-[24px] mt-[16px]">
                            <div className="font-semibold text-[24px] text-black text-lg">News Insights</div>
                        </div>                        
                        </TabPanel>
                        <TabPanel className="p-0" key={4} value={"Sentiments"}>
                        <div className="bg-white min-h-[400px] flex flex-col w-full rounded-[8px] p-[24px] gap-[24px] mt-[16px]">
                            <div className="font-semibold text-[24px] text-black text-lg">Sentiments</div>
                        </div>                        
                        </TabPanel>
                        <TabPanel className="p-0" key={5} value={"Team"}>
                        <div className="bg-white min-h-[400px] flex flex-col w-full rounded-[8px] p-[24px] gap-[24px] mt-[16px]">
                            <div className="font-semibold text-[24px] text-black text-lg">Team</div>
                            <div>Lorem ipsum dolor sit amet consectetur. Id consequat adipiscing arcu nibh. Eget mattis in mi integer sit egestas. Proin tempor id pretium quam. Facilisis purus convallis quam augue.</div>
                            <div className="bg-[#E8F4FD] me-[30px] gap-[6px] rounded-[8px] p-[11px] items-center flex flex-col md:flex-row">
                                <div className="flex flex-col h-full items-center justify-center gap-[13px] min-w-[128px] mx-[4px]">
                                    <div className="bg-white rounded-[6px]  h-[104px] w-[6rem]"></div>
                                    <div className="gap-[4px] flex items-center flex-col justify-center">
                                        <div className="text-[#0F1629] text-[15px] p-0 m-0 text-center">Praneel Bora</div>
                                        <div className="text-[#788F9B] text-[12px] -mt-[2px] p-0 m-0 text-center">Software Developer</div>
                                    </div>
                                </div>
                                <div className="flex flex-col h-full justify-center items-center text-[14px] font-normal text-justify py-[1rem] px-[0.5rem] me-[0.5rem]">Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu</div>
                            </div>
                            <div className="bg-[#E8F4FD] me-[30px] gap-[6px] rounded-[8px] p-[11px] items-center flex flex-col md:flex-row">
                                <div className="flex flex-col h-full items-center justify-center gap-[13px] min-w-[128px] mx-[4px]">
                                    <div className="bg-white rounded-[6px]  h-[104px] w-[6rem]"></div>
                                    <div className="gap-[4px] flex items-center flex-col justify-center">
                                        <div className="text-[#0F1629] text-[15px] p-0 m-0 text-center">Praneel Bora</div>
                                        <div className="text-[#788F9B] text-[12px] -mt-[2px] p-0 m-0 text-center">Software Developer</div>
                                    </div>
                                </div>
                                <div className="flex flex-col h-full justify-center items-center text-[14px] font-normal text-justify py-[1rem] px-[0.5rem] me-[0.5rem]">Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu</div>
                            </div>
                            <div className="bg-[#E8F4FD] me-[30px] gap-[6px] rounded-[8px] p-[11px] items-center flex flex-col md:flex-row">
                                <div className="flex flex-col h-full items-center justify-center gap-[13px] min-w-[128px] mx-[4px]">
                                    <div className="bg-white rounded-[6px]  h-[104px] w-[6rem]"></div>
                                    <div className="gap-[4px] flex items-center flex-col justify-center">
                                        <div className="text-[#0F1629] text-[15px] p-0 m-0 text-center">Praneel Bora</div>
                                        <div className="text-[#788F9B] text-[12px] -mt-[2px] p-0 m-0 text-center">Software Developer</div>
                                    </div>
                                </div>
                                <div className="flex flex-col h-full justify-center items-center text-[14px] font-normal text-justify py-[1rem] px-[0.5rem] me-[0.5rem]">Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu</div>
                            </div>
                            <div className="bg-[#E8F4FD] me-[30px] gap-[6px] rounded-[8px] p-[11px] items-center flex flex-col md:flex-row">
                                <div className="flex flex-col h-full items-center justify-center gap-[13px] min-w-[128px] mx-[4px]">
                                    <div className="bg-white rounded-[6px]  h-[104px] w-[6rem]"></div>
                                    <div className="gap-[4px] flex items-center flex-col justify-center">
                                        <div className="text-[#0F1629] text-[15px] p-0 m-0 text-center">Praneel Bora</div>
                                        <div className="text-[#788F9B] text-[12px] -mt-[2px] p-0 m-0 text-center">Software Developer</div>
                                    </div>
                                </div>
                                <div className="flex flex-col h-full justify-center items-center text-[14px] font-normal text-justify py-[1rem] px-[0.5rem] me-[0.5rem]">Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque sed pellentesque viverra. Consectetur proin amet ut id facilisi quis consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est ipsum. Malesuada etiam mi gravida praesent interdu</div>
                            </div>
                        </div>                        
                        </TabPanel>
                        <TabPanel className="p-0" key={6} value={"Technicals"}>
                        <div className="bg-white min-h-[400px] flex flex-col w-full rounded-[8px] p-[24px] gap-[24px] mt-[16px]">
                            <div className="font-semibold text-[24px] text-black text-lg">Technicals</div>
                        </div>                        
                        </TabPanel>
                        <TabPanel className="p-0" key={7} value={"Tokenomics"}>
                        <div className="bg-white min-h-[400px] flex flex-col w-full rounded-[8px] p-[24px] gap-[24px] mt-[16px]">
                            <div className="font-semibold text-[24px] text-black text-lg">Tokenomics</div>
                        </div>
                        </TabPanel>
                    </TabsBody>
                    </Tabs>

            </div>
            
            <div className="w-[100%] rounded-[8px] lg:w-[calc((100%-20px)*0.3)] flex flex-col gap-[20px]">
                <div className="h-[515px] bg-[#0052FE]"></div>
                {trend && <div className="bg-white flex flex-col gap-[24px] p-[24px]">
                    <div className="font-semibold text-[18px]">Trending Coins</div>
                    <div className="flex flex-col gap-[20px]">
                        {trend?.map((row,index) => {
                            if(index<3){
                                return(

                                    <div key={index} className="flex flex-row justify-between items-center cursor-pointer" onClick={() => router.push(`../${row?.item?.id.toLowerCase()}`)}>
                                        <div className="flex flex-row gap-[8px] h-[24px]">
                                            <Image alt="Image" src={`${row?.item?.thumb}`} width={24} height={24} />
                                            <div>{row?.item?.name} ({row?.item?.symbol})</div>
                                        </div>
                                        <div className={`${row?.item?.data?.price_change_percentage_24h?.usd>0?"bg-[#EBF9F4]":"bg-[#ee685538]"} rounded-[4px] px-[8px] py-[4px] gap-[8px] text-[16px] text-nowrap flex flex-row justify-center items-center`}> 
                                            <svg className={row?.item?.data?.price_change_percentage_24h?.usd>0?"":"rotate-180"} data-testid="geist-icon" fill="none" height="10" width="10" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"  style={{width:13,height:13}}><path fillRule="evenodd" clipRule="evenodd" d="M12 2L2 19.7778H22L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/></svg> 
                                            {Math.round(row?.item?.data?.price_change_percentage_24h?.usd*100)/100} %
                                        </div>
                                    </div>
                                )
                            }
                        })}
                    </div>
                </div>}
                
            </div>
            
        </div>
        <div className="w-[100%] min-h-[470px] bg-white">
            <div className="m-[45px] flex flex-col gap-[15px]">
                { trend && <>
                    <div className="font-semibold text-[18px]">Trending Coins</div>
                <Carousel className="w-[95%] relative  justify-between mx-[2.5%]">
                                <CarouselContent>
                                    {trend?.map((row, index) => (
                                        <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                                            <Card className="h-[160px] bg-transparent border-none m-0 p-0" onClick={() => router.push(`../${row?.item?.id.toLowerCase()}`)}>
                                                <CardContent className="flex flex-col m-0 p-[15px] border-[1px] h-full rounded-[8px]">
                                                <div className=" flex flex-row items-center"><div className="h-[22px] w-[22px]"><Image alt="Image" src={`${row?.item?.thumb}`} width={22} height={22} /></div>&nbsp;<div className="text-[14px] flex justify-center items-center">{row?.item?.name}</div>
                                                    <div className={`${row?.item?.data?.price_change_percentage_24h?.usd>0?"bg-[#EBF9F4]":"bg-[#ee685538]"} ms-[10px] rounded-[4px] px-[6px] py-[3px] gap-[6px] text-[13px] text-nowrap flex flex-row justify-center items-center`}> 
                                                        <svg className={row?.item?.data?.price_change_percentage_24h?.usd>0?"":"rotate-180"} data-testid="geist-icon" fill="none" height="5" width="5" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"  style={{width:13,height:13}}><path fillRule="evenodd" clipRule="evenodd" d="M12 2L2 19.7778H22L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/></svg> 
                                                        {Math.round(row?.item?.data?.price_change_percentage_24h?.usd*100)/100} %
                                                    </div>
                                                </div>
                                                <div className="text-[18px] pt-[4px] overflow-hidden text-nowrap">{row?.item?.data?.price}</div>
                                                <div className="w-full flex flex-row justify-center items-center"><Image alt="Image" src={`${row?.item?.data?.sparkline}`} width={180} height={60}/></div>
                                                
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                </Carousel>
                </> }   
                { trend && <>
                    <div className="font-semibold text-[18px]">Trending Coins</div>
                <Carousel className="w-[95%] relative  justify-between mx-[2.5%]">
                                <CarouselContent>
                                    {trend?.map((row, index) => (
                                        <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                                            <Card className="h-[160px] bg-transparent border-none m-0 p-0" onClick={() => router.push(`../${row?.item?.id.toLowerCase()}`)}>
                                                <CardContent className="flex flex-col m-0 p-[15px] border-[1px] h-full rounded-[8px]">
                                                <div className=" flex flex-row items-center"><div className="h-[22px] w-[22px]"><Image alt="Image" src={`${row?.item?.thumb}`} width={22} height={22} /></div>&nbsp;<div className="text-[14px] flex justify-center items-center">{row?.item?.name}</div>
                                                    <div className={`${row?.item?.data?.price_change_percentage_24h?.usd>0?"bg-[#EBF9F4]":"bg-[#ee685538]"} ms-[10px] rounded-[4px] px-[6px] py-[3px] gap-[6px] text-[13px] text-nowrap flex flex-row justify-center items-center`}> 
                                                        <svg className={row?.item?.data?.price_change_percentage_24h?.usd>0?"":"rotate-180"} data-testid="geist-icon" fill="none" height="5" width="5" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"  style={{width:13,height:13}}><path fillRule="evenodd" clipRule="evenodd" d="M12 2L2 19.7778H22L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/></svg> 
                                                        {Math.round(row?.item?.data?.price_change_percentage_24h?.usd*100)/100} %
                                                    </div>
                                                </div>
                                                <div className="text-[18px] pt-[4px] overflow-hidden text-nowrap">{row?.item?.data?.price}</div>
                                                <div className="w-full flex flex-row justify-center items-center"><Image alt="Image" src={`${row?.item?.data?.sparkline}`} width={180} height={60}/></div>
                                                
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                </Carousel>
                </> }
            </div>
                
        </div>
        
    </div>
);
}
