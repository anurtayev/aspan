import React, { useEffect } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";

import { ReactComponent as FolderIcon } from "./Folder.svg";
import { Error } from "components/Error";
import { Loading } from "components/Loading";
import { FOLDER_ENTRIES } from "./queries";
import {
  useUpdateLocalState,
  useLocalState,
  FolderElement,
  ROUTE_REGISTRY,
} from "aspanUtils";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 1em 0 0;
`;

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

export const Folder = () => {
  const { loading: stateLoading, data: stateData } = useLocalState();
  const { id: currentFolderId, scrollY } = stateData;
  const { loading, error, data } = useQuery(FOLDER_ENTRIES, {
    fetchPolicy: "no-cache",
    variables: { id: currentFolderId },
  });
  const updateLocalState = useUpdateLocalState();

  useEffect(() => {
    window.scroll(0, scrollY);
  });

  if (stateLoading) return <Loading />;
  if (loading) return <Loading />;
  if (error) return <Error />;

  const {
    getFolderEntries: entries,
  }: { getFolderEntries: FolderElement[] } = data;

  return entries ? (
    <Container>
      {entries.map((entry: FolderElement) => {
        return entry.__typename === "Folder" ? (
          <FolderFrame
            key={entry.id}
            onClick={() => {
              updateLocalState({
                displayComponent: ROUTE_REGISTRY.folder,
                id: entry.id,
                scrollY: 0,
                prevDisplayComponent: ROUTE_REGISTRY.folder,
                prevId: currentFolderId,
                prevScrollY: window.scrollY,
              });
            }}
          >
            <FolderIcon></FolderIcon>
            <SlimParagraph>{entry.name}</SlimParagraph>
          </FolderFrame>
        ) : (
          <ImageFrame
            key={entry.id}
            onClick={() => {
              updateLocalState({
                displayComponent: ROUTE_REGISTRY.image,
                id: entry.id,
                scrollY: 0,
                prevDisplayComponent: ROUTE_REGISTRY.folder,
                prevId: currentFolderId,
                prevScrollY: window.scrollY,
              });
            }}
          >
            <Image src={entry.thumbImageUrl} alt={currentFolderId}></Image>
          </ImageFrame>
        );
      })}
    </Container>
  ) : null;
};
