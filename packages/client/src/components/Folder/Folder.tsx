import React from "react";
import styled from "styled-components";
import { ReactComponent as FolderIcon } from "./Folder.svg";
import { useQuery } from "@apollo/react-hooks";
import Error from "components/Error";
import Loading from "components/Loading";
import { getFolderEntries } from "./queries";
import {
  useLocalState,
  useNavigateToFolder,
  useNavigateToImage,
  FolderElement,
} from "globalUtil";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 1em 0 0;
`;

const MAX_CHARACTERS = 20;

const Frame = styled.div`
  width: 10em;
  height: 10em;
  border-radius: 0.5em;
  margin: 1em 0 0 1em;
`;

const ImageFrame = styled(Frame)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FolderFrame = styled(Frame)`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background: lightblue;
`;

const Image = styled.img`
  max-height: 100%;
  min-width: 100%;
  object-fit: cover;
  vertical-align: bottom;
`;

const SlimParagraph = styled.div`
  margin: 0;
`;

export default ({ id }: { id: string }) => {
  const { loading, error, data } = useQuery(getFolderEntries(id));
  const navigateToFolder = useNavigateToFolder();
  const navigateToImage = useNavigateToImage();

  const { entries }: { entries: FolderElement[] } = data;

  if (loading) return <Loading />;
  if (error) return <Error />;

  return (
    <Container>
      {data.getFolderEntries.map(
        ({ __typename, id, name, thumbImageUrl }: any) =>
          __typename === "Folder" ? (
            <FolderFrame
              onClick={() => {
                navigateToFolder(id);
              }}
            >
              <FolderIcon></FolderIcon>
              <SlimParagraph>
                {name.length > MAX_CHARACTERS
                  ? name.slice(0, MAX_CHARACTERS) + "\u2026"
                  : name}
              </SlimParagraph>
            </FolderFrame>
          ) : (
            <ImageFrame
              onClick={() => {
                navigateToImage(id, entries);
              }}
            >
              <Image src={thumbImageUrl} alt={id}></Image>
            </ImageFrame>
          )
      )}
    </Container>
  );
};
