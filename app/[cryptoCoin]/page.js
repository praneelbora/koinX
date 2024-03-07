"use client"
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, } from "@/components/ui/carousel"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsHeader, TabsBody, Tab, TabPanel,} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import TradingViewWidget from "@/Widgets/TradingViewWidget";
import { useRouter } from 'next/navigation'
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, } from "@/components/ui/navigation-menu"
export default function Home({ params }) {
    const router = useRouter()
        const options = {method: 'GET', headers: {'x-cg-demo-api-key': process.env.API_KEY}};
        const [fullCoin,setFullCoin]=useState({})
        const [market,setMarket]=useState([])
        const [trend,setTrend]=useState([])
        async function getData(){
            try{
                const response = await fetch(`https://api.coingecko.com/api/v3/coins/${params.cryptoCoin}`)            
                const res = await response.json();
                setFullCoin(res)
                const response1 = await fetch('https://api.coingecko.com/api/v3/search/trending', options);
                const res1 = await response1.json();
                setTrend(res1?.coins)
                const marketData = await fetch('https://api.coingecko.com/api/v3/global')
                const res2 = await marketData.json();
                setMarket(res2)

                setPerc(fullCoin?.market_data?.current_price?.usd)
            }
            catch(err){
                console.log(err)
            }
        }
        
        useEffect(()=>{
            getData()

        },[])

        return (
    <div className="flex min-h-screen flex-col bg-[#EFF2F5] text-black gap-y-[20px] scrollbar-none scrollbar-track-transparent">
       
        <div className=" w-full h-[80px] bg-white flex flex-row relative">
            <div className="h-full absolute left-[60px] w-[96px] flex justify-center items-center cursor-pointer" >
            <Image alt="Image" src="/images/logo.png" height={128} width={128} />
            </div>
            <div className="h-full right-[56px]  absolute flex justify-between items-center gap-[32px]">
                <div className="text-black cursor-pointer">Crypto Taxes</div>
                <div className="text-black cursor-pointer">Free Tools</div>
                <div className="text-black cursor-pointer">Resource Center</div>
                <div className="h-[40px] w-[130px] text-center rounded-[8px] p-[8px] ml-[13px] bg-gradient-to-r from-[#2870EA] to-[#1B4AEF] text-white cursor-pointer">Get Started</div>
                
            </div>
        </div>
        <div className="mx-[20px] md:mx-[36px] lg:mx-[42px] xl:mx-[56px] flex flex-row"><div className="font-normal">Cryptocurrencies &gt;&gt;&nbsp;</div>  <div className="font-semibold"> {fullCoin?.name}</div></div>
        <div className="mx-[20px] md:mx-[36px] lg:mx-[42px] xl:mx-[56px] w-[calc(100dvh-72px]] lg:w-[calc(100dvh-112px]) h-full flex flex-col lg:flex-row gap-[20px] ">
            <div className=" w-[100%] lg:w-[calc((100%-20px)*0.7)]  flex flex-col gap-[20px]">
                <div className="bg-white flex flex-col gap-[20px] p-[20px]">
                    <div className="flex flex-row gap-[8px] items-center">
                        <div className=""><Image src={fullCoin?.image?.thumb} alt="image" height={28} width={28}/></div>
                        <div className="text-[20px] font-semibold">{fullCoin?.name}</div>
                        <div className="text-[20px] font-semibold">{}</div>
                        <div className="text-[16px] text-[#5D667B] font-semibold">{fullCoin?.symbol?.toUpperCase()}</div>
                    </div>
                    
                    

                    <div className="bg-black h-[500px] w-full overflow-hidden">
                        {fullCoin?.symbol && <TradingViewWidget coin={fullCoin?.symbol} />}
                    </div>
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
                        <Tab key={3} value={"News"}>
                            <div className="flex items-center text-nowrap  cursor-pointer">
                            News
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
                        <Tab key={6} value={"Tokenomics"}>
                            <div className="flex items-center ">
                            Tokenomics
                            </div>
                        </Tab>
                        <Tab key={7} value={"About"}>
                            <div className="flex items-center ">
                            About
                            </div>
                        </Tab>
                        
                    </TabsHeader>
                    <TabsBody>
                        
                        <TabPanel className="p-0" key={1} value={"Overview"}>
                        <div className="bg-white min-h-[400px] flex flex-col w-full rounded-[8px] p-[24px] gap-[24px] mt-[16px]">
                            <div className="font-semibold text-[24px] text-black text-lg">About</div>
                            <div className="flex flex-col gap-[12px]">
                                {fullCoin?.description?.en.split('.').slice(0, 2).join('.')}.
                            </div>

                            <div className="font-semibold text-[24px] text-black text-lg">Performance</div>
                            <div className="flex flex-col gap-[12px]">
                                <div className="flex flex-wrap justify-between">
                                    <div className="w-[90%] md:w-[45%] min-h-[40px] flex flex-col justify-around">
                                        <div className="gap-[15px] w-full flex flex-row items-center justify-between">
                                            <div className="text-[14px] text-[#44475B]">{fullCoin?.name} Price: </div>
                                            <div className="">$ {fullCoin?.market_data?.low_24h?.usd}</div>
                                        </div>
                                    </div>
                                    <div className="w-[90%] md:w-[45%] min-h-[40px] flex flex-col justify-around">
                                        <div className="gap-[15px] w-full flex flex-row items-center justify-between">
                                            <div className="text-[14px] text-[#44475B]">Percentage Change: </div>
                                            <div className="flex flex-row items-center gap-[6px]">
                                                <svg className={fullCoin?.market_data?.price_change_percentage_24h_in_currency?.usd>0?"text-green-500":"text-red-500 rotate-180"} data-testid="geist-icon" fill="none" height="10" width="10" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"  style={{width:13,height:13}}><path fillRule="evenodd" clipRule="evenodd" d="M12 2L2 19.7778H22L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/></svg> 
                                            {fullCoin?.market_data?.price_change_percentage_24h_in_currency?.usd} %</div>
                                        </div>
                                    </div>
                                </div>

                                
                                <div className="gap-[15px] w-full flex flex-row items-center justify-between">
                                    <div className=" flex flex-col justify-center items-center">
                                        <div className="text-[14px] text-[#44475B] text-nowrap">Todays Low</div>
                                        <div className="">$ {fullCoin?.market_data?.low_24h?.usd}</div>
                                    </div>
                                    <div className="w-[70%] bg-gradient-to-r from-[#FF4949] via-[#FFAF11] to-[#11EB68] h-[5px]"></div>
                                        {/* <br></br> */}
                                        {/* <div className={`h-[15px] bg-black ms-[${Math.round(((fullCoin?.market_data?.current_price?.usd-fullCoin?.market_data?.low_24h?.usd)/(fullCoin?.market_data?.high_24h?.usd-fullCoin?.market_data?.low_24h?.usd))*100)}%]`}></div> */}
                                    <div className=" flex flex-col justify-center items-center">

                                        <div className="text-[14px] text-[#44475B] text-nowrap">Todays High</div>
                                        <div className="">$ {fullCoin?.market_data?.high_24h?.usd}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                            
                        </TabPanel>
                        <TabPanel className="p-0" key={2} value={"Fundamentals"}>
                        <div className="bg-white min-h-[400px] flex flex-col w-full rounded-[8px] p-[24px] gap-[24px] mt-[16px]">
                            <div className="font-semibold text-[24px] text-black text-lg">Fundamentals</div>
                            <div className="flex flex-wrap w-full justify-between px-[3%]">
                                <div className="w-[90%] md:w-[45%] min-h-[60px] flex flex-col justify-around">
                                    <div className="gap-[15px] w-full flex flex-row items-center justify-between">
                                        <div className="text-[14px] text-[#44475B]">{fullCoin?.name} Price: </div>
                                        <div className="">$ {fullCoin?.market_data?.low_24h?.usd}</div>
                                    </div>
                                    <div className="w-full bg-slate-300 h-[2px]"></div>
                                </div>
                                <div className="w-[90%] md:w-[45%] min-h-[60px] flex flex-col justify-around">
                                    <div className="gap-[15px] w-full flex flex-row items-center justify-between">
                                        <div className="text-[14px] text-[#44475B]">30 Days % Change: </div>
                                        <div className="flex flex-row items-center gap-[6px]">
                                                <svg className={fullCoin?.market_data?.price_change_percentage_24h_in_currency?.usd>0?"text-green-500":"text-red-500 rotate-180"} data-testid="geist-icon" fill="none" height="10" width="10" shapeRendering="geometricPrecision" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" viewBox="0 0 24 24"  style={{width:13,height:13}}><path fillRule="evenodd" clipRule="evenodd" d="M12 2L2 19.7778H22L12 2Z" fill="currentColor" stroke="currentColor" strokeWidth="1.5"/></svg> 
                                            <div className=""> {fullCoin?.market_data?.price_change_percentage_30d_in_currency?.usd}%</div>
                                    </div>
                                    </div>
                                    <div className="w-full bg-slate-300 h-[2px]"></div>
                                </div>
                                
                                <div className="w-[90%] md:w-[45%] min-h-[60px] flex flex-col justify-around">
                                    <div className="gap-[15px] w-full flex flex-row items-center justify-between">
                                        <div className="text-[14px] text-[#44475B]">24h High: </div>
                                        <div className="">$ {fullCoin?.market_data?.high_24h?.usd}</div>
                                    </div>
                                    <div className="w-full bg-slate-300 h-[2px]"></div>
                                </div>
                                <div className="w-[90%] md:w-[45%] min-h-[60px] flex flex-col justify-around">
                                    <div className="gap-[15px] w-full flex flex-row items-center justify-between">
                                        <div className="text-[14px] text-[#44475B]">24h Low: </div>
                                        <div className="">$ {fullCoin?.market_data?.low_24h?.usd}</div>
                                    </div>
                                    <div className="w-full bg-slate-300 h-[2px]"></div>
                                </div>
                                <div className="w-[90%] md:w-[45%] min-h-[60px] flex flex-col justify-around">
                                    <div className="gap-[15px] w-full flex flex-row items-center justify-between">
                                        <div className="text-[14px] text-[#44475B]">Total Volume: </div>
                                        <div className="">$ {fullCoin?.market_data?.total_volume?.usd}</div>
                                    </div>
                                    <div className="w-full bg-slate-300 h-[2px]"></div>
                                </div>
                                <div className="w-[90%] md:w-[45%] min-h-[60px] flex flex-col justify-around">
                                    <div className="gap-[15px] w-full flex flex-row items-center justify-between">
                                        <div className="text-[14px] text-[#44475B]">Market Cap: </div>
                                        <div className="">$ {Math.round(market?.data?.total_market_cap?.usd)}</div>
                                    </div>
                                    <div className="w-full bg-slate-300 h-[2px]"></div>
                                </div>
                                <div className="w-[90%] md:w-[45%] min-h-[60px] flex flex-col justify-around">
                                    <div className="gap-[15px] w-full flex flex-row items-center justify-between">
                                        <div className="text-[14px] text-[#44475B]">Volume/Market Cap: </div>
                                        <div className="">{Math.round(fullCoin?.market_data?.total_volume?.usd/market?.data?.total_market_cap?.usd*100000000)/100000000}</div>
                                    </div>
                                    <div className="w-full bg-slate-300 h-[2px]"></div>
                                </div>
                                <div className="w-[90%] md:w-[45%] min-h-[60px] flex flex-col justify-around">
                                    <div className="gap-[15px] w-full flex flex-row items-center justify-between">
                                        <div className="text-[14px] text-[#44475B]">Market Cap %: </div>
                                        <div className="">{Math.round(market?.data?.market_cap_percentage[`${fullCoin?.symbol}`]*100000)/100000} %</div>
                                    </div>
                                    <div className="w-full bg-slate-300 h-[2px]"></div>
                                </div>
                                
                            </div>
                        </div>
                        </TabPanel>
                        <TabPanel className="p-0" key={3} value={"News"}>
                        <div className="bg-white min-h-[400px] flex flex-col w-full rounded-[8px] p-[24px] gap-[24px] mt-[16px]">
                            <div className="font-semibold text-[24px] text-black text-lg">Related News</div>
                            <div className="text-[#3E424A]">Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit lobortis tristique pharetra. Diam id et lectus urna et tellus aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus. Ultricies urna volutpat pendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus. </div>
                            <div className="text-[#3E424A]">Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit lobortis tristique pharetra. Diam id et lectus urna et tellus aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus. Ultricies urna volutpat pendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus. Diam praesent massa dapibus magna aliquam a dictumst volutpat. Egestas vitae pellentesque auctor amet. Nunc sagittis libero adipiscing cursus felis pellentesque interdum. Odio cursus phasellus velit in senectus enim dui. Turpis tristique placerat interdum sed volutpat. Id imperdiet magna eget eros donec cursus nunc. Mauris faucibus diam mi nunc praesent massa turpis a. Integer dignissim augue viverra nulla et quis lobortis phasellus. Integer pellentesque enim convallis ultricies at. Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam massa vel convallis duis ac. Mi adipiscing semper scelerisque porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia congue ipsum fames amet dui. Purus ultrices tincidunt volutpat in eget. Ullamcorper dui</div>
                        </div>                        
                        </TabPanel>
                        <TabPanel className="p-0" key={4} value={"Sentiments"}>
                        <div className="bg-white min-h-[400px] flex flex-col w-full rounded-[8px] p-[24px] gap-[24px] mt-[16px]">
                            <div className="font-semibold text-[24px] text-black text-lg">Sentiments</div>
                            <div className="flex flex-col gap-[15px]">
                                <div className="flex flex-row items-center">

                                    <div className="font-semibold text-[16px] text-[#44475B] me-[4px]">Key Events </div>
                                    <Image className="cursor-pointer" src="/images/i.png" alt="i" height={14} width={14} />
                                </div>
                                <Carousel className=" ms-[5%] w-[90%] relative  justify-between mx-[2.5%]">
                                <CarouselContent>
                                        <CarouselItem key={0} className="basis-1/2 md:basis-1/2 lg:basis-1/2 xl:basis-1/2">
                                            <Card className="h-[200px] bg-[#E8F4FD] border-none m-0 p-0">
                                                <CardContent className="flex flex-row m-0 p-[15px] justify-start gap-[8px] h-full rounded-[8px]">
                                                    <div className="min-h-[40px] min-w-[40px]">
                                                        <Image src="/images/icon1.png" alt="icon" width={40} height={40} />
                                                    </div>
                                                    <div className="flex flex-col items-center gap-[7px] pe-[10px]">
                                                        <div className="text-[14px] line-clamp-2">Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.</div>
                                                        <div  className="text-[12px] text-[#3E5765] line-clamp-6">Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra natoque lacinia libero enim.</div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                        <CarouselItem key={0} className="basis-1/2 md:basis-1/2 lg:basis-1/2 xl:basis-1/2">
                                            <Card className="h-[200px] bg-[#EBF9F4] border-none m-0 p-0">
                                            <CardContent className="flex flex-row m-0 p-[15px] justify-start gap-[8px] h-full rounded-[8px]">
                                                    <div className="min-h-[40px] min-w-[40px]">
                                                        <Image src="/images/icon2.png" alt="icon" width={40} height={40} />
                                                    </div>
                                                    <div className="flex flex-col items-center gap-[7px] pe-[10px]">
                                                        <div className="text-[14px] line-clamp-2">Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.</div>
                                                        <div  className="text-[12px] text-[#3E5765] line-clamp-6">Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra natoque lacinia libero enim. </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                        <CarouselItem key={0} className="basis-1/2 md:basis-1/2 lg:basis-1/2 xl:basis-1/2">
                                            <Card className="h-[200px] bg-[#E8F4FD] border-none m-0 p-0">
                                                <CardContent className="flex flex-row m-0 p-[15px] justify-start gap-[8px] h-full rounded-[8px]">
                                                    <div className="min-h-[40px] min-w-[40px]">
                                                        <Image src="/images/icon1.png" alt="icon" width={40} height={40} />
                                                    </div>
                                                    <div className="flex flex-col items-center gap-[7px] pe-[10px]">
                                                        <div className="text-[14px] line-clamp-2">Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.</div>
                                                        <div  className="text-[12px] text-[#3E5765] line-clamp-6">Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra natoque lacinia libero enim.</div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                        <CarouselItem key={0} className="basis-1/2 md:basis-1/2 lg:basis-1/2 xl:basis-1/2">
                                            <Card className="h-[200px] bg-[#EBF9F4] border-none m-0 p-0">
                                            <CardContent className="flex flex-row m-0 p-[15px] justify-start gap-[8px] h-full rounded-[8px]">
                                                    <div className="min-h-[40px] min-w-[40px]">
                                                        <Image src="/images/icon2.png" alt="icon" width={40} height={40} />
                                                    </div>
                                                    <div className="flex flex-col items-center gap-[7px] pe-[10px]">
                                                        <div className="text-[14px] line-clamp-2">Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.</div>
                                                        <div  className="text-[12px] text-[#3E5765] line-clamp-6">Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra natoque lacinia libero enim. </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                        <CarouselItem key={0} className="basis-1/2 md:basis-1/2 lg:basis-1/2 xl:basis-1/2">
                                            <Card className="h-[200px] bg-[#E8F4FD] border-none m-0 p-0">
                                                <CardContent className="flex flex-row m-0 p-[15px] justify-start gap-[8px] h-full rounded-[8px]">
                                                    <div className="min-h-[40px] min-w-[40px]">
                                                        <Image src="/images/icon1.png" alt="icon" width={40} height={40} />
                                                    </div>
                                                    <div className="flex flex-col items-center gap-[7px] pe-[10px]">
                                                        <div className="text-[14px] line-clamp-2">Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.</div>
                                                        <div  className="text-[12px] text-[#3E5765] line-clamp-6">Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra natoque lacinia libero enim.</div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                        <CarouselItem key={0} className="basis-1/2 md:basis-1/2 lg:basis-1/2 xl:basis-1/2">
                                            <Card className="h-[200px] bg-[#EBF9F4] border-none m-0 p-0">
                                            <CardContent className="flex flex-row m-0 p-[15px] justify-start gap-[8px] h-full rounded-[8px]">
                                                    <div className="min-h-[40px] min-w-[40px]">
                                                        <Image src="/images/icon2.png" alt="icon" width={40} height={40} />
                                                    </div>
                                                    <div className="flex flex-col items-center gap-[7px] pe-[10px]">
                                                        <div className="text-[14px] line-clamp-2">Lorem ipsum dolor sit amet consectetur. Dui vel quis dignissim mattis enim tincidunt.</div>
                                                        <div  className="text-[12px] text-[#3E5765] line-clamp-6">Lorem ipsum dolor sit amet consectetur. Ac phasellus risus est faucibus metus quis. Amet sapien quam viverra adipiscing condimentum. Ac consectetur et pretium in a bibendum in. Sed vitae sit nisi viverra natoque lacinia libero enim. </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                                </Carousel>
                            </div>
                            <div className="flex flex-col gap-[15px]">
                                <div className="flex flex-row items-center">

                                    <div className="font-semibold text-[16px] text-[#44475B] me-[4px]">Analyst Estimates </div>
                                    <Image className="cursor-pointer" src="/images/i.png" alt="i" height={14} width={14} />
                                </div>
                                <div className="flex flex-row gap-[30px]">
                                    <div className="rounded-full bg-[#EBF9F4] h-[120px] w-[120px] flex justify-center items-center text-[36px] text-[#0FBA83] font-semibold">76%</div>
                                    <div className="flex flex-col justify-between py-[10px]">
                                        <div className="flex flex-row items-center gap-[15px]">
                                            <div className="w-[30px]">Buy</div>
                                            <div className="w-[456px] bg-[#00B386] h-[6px] rounded-[2px]"></div>
                                            <div className="text-[12px] text-[#7C7E8C]">76%</div>
                                        </div>
                                        <div className="flex flex-row items-center gap-[15px]">
                                            <div className="w-[30px]">Hold</div>
                                            <div className="w-[56px] bg-[#C7C8CE] h-[6px] rounded-[2px]"></div>
                                            <div className="text-[12px] text-[#7C7E8C]">8%</div>
                                        </div>
                                        <div className="flex flex-row items-center gap-[15px]">
                                            <div className="w-[30px]">Sell</div>
                                            <div className="w-[96px] bg-[#F7324C] h-[6px] rounded-[2px]"></div>
                                            <div className="text-[12px] text-[#7C7E8C]">16%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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
                        <TabPanel className="p-0" key={6} value={"Tokenomics"}>
                        <div className="bg-white min-h-[400px] flex flex-col w-full rounded-[8px] p-[24px] gap-[24px] mt-[16px]">
                            <div className="font-semibold text-[24px] text-black text-lg">Tokenomics</div>
                            <div className="font-semibold text-[14px] text-black">Initial Distribution</div>
                                <Image src="/images/chart.png" width={150} height={150} alt="chart" />
                                <div className="text-[#3E424A]">Lorem ipsum dolor sit amet consectetur. Cras aliquet tristique ornare vestibulum nunc dignissim vel consequat. Leo etiam nascetur bibendum amet enim sit eget leo amet. At metus orci augue fusce eleifend lectus eu fusce adipiscing. Volutpat ultrices nibh sodales massa habitasse urna felis augue. Gravida aliquam fermentum augue eu. Imperdiet bibendum amet aliquam donec. Eget justo dui metus odio rutrum. Vel ipsum eget in at curabitur sem posuere facilisis vitae. Sed lorem sit mauris id eget arcu ut. Vulputate ipsum aliquet odio nisi eu ac risus.</div>
                        </div>                           
                        </TabPanel>
                        <TabPanel className="p-0" key={7} value={"About"}>
                        <div className="bg-white min-h-[400px] flex flex-col w-full rounded-[8px] p-[24px] gap-[24px] mt-[16px]">
                            <div className="font-semibold text-[24px] text-black text-lg">{fullCoin?.name} - What is {fullCoin?.name}?</div>
                            <div className="text-[#3E424A]">Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit lobortis tristique pharetra. Diam id et lectus urna et tellus aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus. Ultricies urna volutpat pendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus. </div>
                            <div className="text-[#3E424A]">Lorem ipsum dolor sit amet consectetur. Aliquam placerat sit lobortis tristique pharetra. Diam id et lectus urna et tellus aliquam dictum at. Viverra diam suspendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus. Ultricies urna volutpat pendisse enim facilisi diam ut sed. Quam scelerisque fermentum sapien morbi sodales odio sed rhoncus. Diam praesent massa dapibus magna aliquam a dictumst volutpat. Egestas vitae pellentesque auctor amet. Nunc sagittis libero adipiscing cursus felis pellentesque interdum. Odio cursus phasellus velit in senectus enim dui. Turpis tristique placerat interdum sed volutpat. Id imperdiet magna eget eros donec cursus nunc. Mauris faucibus diam mi nunc praesent massa turpis a. Integer dignissim augue viverra nulla et quis lobortis phasellus. Integer pellentesque enim convallis ultricies at. Fermentum hendrerit imperdiet nulla viverra faucibus. Sit aliquam massa vel convallis duis ac. Mi adipiscing semper scelerisque porttitor pulvinar nunc risus. Fermentum potenti iaculis lacinia congue ipsum fames amet dui. Purus ultrices tincidunt volutpat in eget. Ullamcorper dui</div>
                        </div>
                        </TabPanel>
                    </TabsBody>
                    </Tabs>

            </div>
            
            <div className="w-[100%] rounded-[8px] lg:w-[calc((100%-20px)*0.3)] flex flex-col gap-[20px]">
                <div className="min-h-[515px] bg-[#0052FE] rounded-[8px] gap-[30px] py-[30px] px-[20px] flex flex-col items-center">
                    <div className="text-center text-white flex flex-col gap-[14px]">
                        <div  className="text-[28px] lg:text-[24px] mx-[24px] font-bold text-wrap">Get Started with KoinX for FREE</div>
                        <div  className="text-[20px] mx-[30px] lg:mx-0 text-wrap lg:text-[14px] ">With our range of features that you can equip for free,KoinX allows you to be more educated and aware of your tax reports.</div>
                    </div>
                    <Image src="/images/image.png" alt="image" height={168} width={178} />
                    <div className="bg-white text-[16px] my-[10px] font-semibold w-[230px] h-[48px] rounded-[8px] flex justify-center items-center gap-[6px] cursor-pointer">Get Started for FREE <Image src="/images/arrow.png" alt="arrow" height={20} width={20} /></div>
                </div>
                <div className="bg-white flex flex-col gap-[24px] p-[24px]">
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
                </div>
            </div>
            
        </div>
        <div className="w-[100%] min-h-[470px] bg-white">
            <div className="m-[45px] flex flex-col gap-[15px]">
                <div className="font-semibold text-[18px]">You May Also Like</div>
                <Carousel className="w-[95%] relative  justify-between mx-[2.5%]">
                                <CarouselContent>
                                    {trend?.map((row, index) => (
                                        <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                                            <Card className="h-[170px] bg-transparent border-none m-0 p-0" onClick={() => router.push(`../${row?.item?.id.toLowerCase()}`)}>
                                                <CardContent className="flex flex-col m-0 p-[15px] border-[1px] h-full rounded-[8px]">
                                                <div className=" flex flex-row items-center"><div className="flex justify-center h-[22px] w-[22px] items-center"><Image alt="Image" src={`${row?.item?.thumb}`} width={22} height={22} /></div>&nbsp;<div className="text-[14px] flex justify-center items-center">{row?.item?.name}</div>
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
                <div className="font-semibold text-[18px]">Trending Coins</div>
                <Carousel className="w-[95%] relative  justify-between mx-[2.5%]">
                                <CarouselContent>
                                    {trend?.map((row, index) => (
                                        <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4 xl:basis-1/5">
                                            <Card className="h-[170px] bg-transparent border-none m-0 p-0" onClick={() => router.push(`../${row?.item?.id.toLowerCase()}`)}>
                                                <CardContent className="flex flex-col m-0 p-[15px] border-[1px] h-full rounded-[8px]">
                                                <div className=" flex flex-row items-center"><div className="flex justify-center h-[22px] w-[22px] items-center"><Image alt="Image" src={`${row?.item?.thumb}`} width={22} height={22} /></div>&nbsp;<div className="text-[14px] flex justify-center items-center">{row?.item?.name}</div>
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
            </div>
                
        </div>
        
    </div>
);
}
