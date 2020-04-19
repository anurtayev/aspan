import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { APP_STATE } from "./globalQueries";
import NavBar from "./components/NavBar";
import Cards from "./components/Cards";
import Image from "./components/Image";

export default () => {
  const { data } = useQuery(APP_STATE);
  const isImage = data.path.includes(".jpg");

  return (
    <div>
      <NavBar></NavBar>
      {isImage ? <Image></Image> : <Cards></Cards>}
    </div>
  );
};
