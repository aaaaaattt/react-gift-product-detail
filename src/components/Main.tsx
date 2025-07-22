import GlobalStyle from "@/styles/GlobalStyle.tsx";
import ThemeSection from "@/components/ThemeSection";
import SelectFriend from "@/components/SelectFriend.tsx";
import Cheering from "@/components/Cheering.tsx";
import GiftRanking from "@/components/GiftRankingBox.tsx";
import GiftRankingHeader from "@/components/GiftRankingHeader.tsx";
import { useState } from "react";

const Main = () => {
  const [target, setTarget] = useState("ALL");
  const [rankType, setRankType] = useState("MANY_WISH");
  return (
    <>
      <GlobalStyle />
      <SelectFriend />
      <ThemeSection />
      <Cheering />
      <GiftRankingHeader
        target={target}
        setTarget={setTarget}
        rankType={rankType}
        setRankType={setRankType}
      />
      <GiftRanking target={target} rankType={rankType} />
    </>
  );
};

export default Main;
