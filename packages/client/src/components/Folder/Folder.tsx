import React from "react";
import styled from "styled-components";
import { ReactComponent as FolderIcon } from "./Folder.svg";
import { useQuery } from "@apollo/react-hooks";
import Error from "components/Error";
import Loading from "components/Loading";
import { FOLDER_ENTRIES } from "./queries";
import {
  useNavigateToFolder,
  useNavigateToImage,
  FolderElement,
} from "aspanUtils";

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
  const { loading, error, data } = useQuery(FOLDER_ENTRIES, {
    variables: { id },
  });
  const navigateToFolder = useNavigateToFolder();
  const navigateToImage = useNavigateToImage();

  if (loading) return <Loading />;
  if (error) return <Error />;

  const {
    getFolderEntries: entries,
  }: { getFolderEntries: FolderElement[] } = data;

  return entries ? (
    <Container>
      {entries.map((entry: FolderElement) =>
        entry.__typename === "Folder" ? (
          <FolderFrame
            key={entry.id}
            onClick={() => {
              navigateToFolder({
                id: entry.id,
              });
            }}
          >
            <FolderIcon></FolderIcon>
            <SlimParagraph>
              {entry.name.length > MAX_CHARACTERS
                ? entry.name.slice(0, MAX_CHARACTERS) + "\u2026"
                : entry.name}
            </SlimParagraph>
          </FolderFrame>
        ) : (
          <ImageFrame
            key={entry.id}
            onClick={() => {
              navigateToImage({
                id: entry.id,
              });
            }}
          >
            <Image src={entry.thumbImageUrl} alt={id}></Image>
          </ImageFrame>
        )
      )}
    </Container>
  ) : null;
};
