"use client";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Roles from "@/components/dashboard/roles";
import { Button } from "@/components/ui/button";
import ArtToken from "@/components/dashboard/artToken/index";
import ArtDeFi from "@/components/dashboard/artDefi";
import MarketPlace from "@/components/dashboard/marketPlace"


export default function Dashboard() {

  const [tabsVisible, setTabsVisible] = useState(true);

  const handleTab = async () => {
    setTabsVisible(!tabsVisible);
  };

  return (
    <div className="relative flex w-full h-full bg-black text-white">
      
      <Tabs defaultValue="roles" className="flex w-full h-full">
        {tabsVisible && (
          <div className="w-1/6 h-screen sticky top-0 flex-shrink-0">
            <TabsList className="flex flex-col h-full justify-start">
              <div className="text-center px-4 py-2 h-1/3 border w-full">
                <TabsTrigger value="roles">Roles</TabsTrigger>
              </div>
              <div className="text-center px-4 py-2 h-1/3 border w-full">
                <TabsTrigger value="art">Art Tokenization</TabsTrigger>
              </div>
              <div className="text-center px-4 py-2 h-1/3 border w-full">
                <TabsTrigger value="marketplace">Market-Place</TabsTrigger>
              </div>

              <Button
                onClick={handleTab}
                className="text-left px-4 py-2 mt-auto bg-custom-black text-red-500 hover:bg-gray-400"
              >
                X
              </Button>
            </TabsList>
          </div>
        )}
        <div className="flex-1 p-4 border ml-4 overflow-y-auto h-screen">
          <TabsContent value="roles">
            <Roles />
          </TabsContent>
          <TabsContent value="art">
            <ArtToken />
          </TabsContent>
          <TabsContent value="marketplace">
            <MarketPlace/>
          </TabsContent>
        </div>
      </Tabs>

      {!tabsVisible && (
        <Button
          onClick={handleTab}
          className="fixed top-4 left-4 px-4 py-2 mt-10 bg-blue-500 text-white rounded hover:bg-blue-600 z-50"
        >
          +
        </Button>
      )}
    </div>
  );
}
