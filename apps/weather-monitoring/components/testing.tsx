import React from "react";
import { Card, Divider, Subtitle, Text } from "@tremor/react";
import Citypicker from "../components/Citypicker";

const Home = () => {
  return (
    <main>
      <section className="min-h-screen bg-gradient-to-br from-[#394F68] to-[#183B7E] p-4 flex flex-col justify-center items-center w-full space-y-6">
        <Card className="bg-white rounded-xl text-gray-400 max-w-4xl mx-auto">
          <Text className="text-2xl text-black font-bold">Welcome to Weather AI</Text>
          <Subtitle>Track Weather in Mins!</Subtitle>
          <Divider className="border" />
          <Card className="bg-gradient-to-br from-[#394F68] to-[#183B7E] rounded-xl ">
            {/* <Citypicker /> */}
          </Card>
        </Card>
      </section>
    </main>
  );
};

export default Home;
